import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useRef, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

// 📌 estructura básica de sabores
const flavors = {
  Frutal: ['Cítrico', 'Frutas rojas', 'Tropical'],
  Floral: ['Jazmín', 'Rosa'],
  Dulce: ['Caramelo', 'Miel', 'Chocolate']
};

// 🔹 Colores por categoría
const categoryColors: Record<string, string> = {
  Frutal: 'rgba(255, 99, 132, 0.6)',
  Floral: 'rgba(54, 162, 235, 0.6)',
  Dulce: 'rgba(255, 206, 86, 0.6)'
};

export type FlavorSelection = {
  category: string;
  note: string;
  intensity: number;
};

interface FlavorWheelProps {
  value: FlavorSelection[];
  onChange: (val: FlavorSelection[]) => void;
}

export const FlavorWheel = ({ value, onChange }: FlavorWheelProps) => {
  const chartRef = useRef<any>(null);
  const [selected, setSelected] = useState<FlavorSelection[]>(value || []);

  // 🔹 flatten categorías → subnotas
  const allNotes = Object.entries(flavors).flatMap(([category, notes]) =>
    notes.map((n) => ({ category, note: n }))
  );

  // 🔹 datos para doughnut
  const data = {
    labels: allNotes.map((f) => `${f.category} - ${f.note}`),
    datasets: [
      {
        data: allNotes.map((f) => {
          const match = selected.find(
            (s) => s.category === f.category && s.note === f.note
          );
          return match ? match.intensity : 1; // intensidad o mínimo 1
        }),
        backgroundColor: allNotes.map((f) => {
          const match = selected.find(
            (s) => s.category === f.category && s.note === f.note
          );
          return match
            ? categoryColors[f.category].replace('0.6', '1') // resaltado
            : categoryColors[f.category];
        }),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    onClick: (_evt: any, elements: any[]) => {
      if (!elements.length) return;
      const index = elements[0].index;
      const flavor = allNotes[index];

      let updated: FlavorSelection[];
      const existing = selected.find(
        (s) => s.category === flavor.category && s.note === flavor.note
      );

      if (existing) {
        // quitar
        updated = selected.filter(
          (s) => !(s.category === flavor.category && s.note === flavor.note)
        );
      } else {
        // añadir con intensidad 3 por defecto
        updated = [...selected, { ...flavor, intensity: 3 }];
      }

      setSelected(updated);
      onChange(updated);
    }
  };

  const handleIntensityChange = (note: FlavorSelection, newVal: number) => {
    const updated = selected.map((s) =>
      s.category === note.category && s.note === note.note
        ? { ...s, intensity: newVal }
        : s
    );
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-80 h-80">
        <Doughnut ref={chartRef} data={data} options={options} />
      </div>

      {/* Lista de seleccionados con sliders */}
      {selected.length > 0 && (
        <ul className="w-full space-y-2">
          {selected.map((s, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-2 bg-base-200 p-2 rounded-lg"
            >
              <span className="text-sm">
                ✅ {s.category} → {s.note}
              </span>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={s.intensity}
                onChange={(e) =>
                  handleIntensityChange(s, parseInt(e.target.value))
                }
                className="range range-xs w-32"
              />
              <span className="text-xs">{s.intensity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
