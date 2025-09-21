import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export type FlavorNote = {
  category: string;
  subcategory?: string;
  note?: string;
  intensity: number; // 1–5
};

interface FlavorWheelProps {
  flavors: FlavorNote[];
  onChange: (flavors: FlavorNote[]) => void;
}

// Datos jerárquicos
const DATA = [
  {
    category: 'Frutal',
    subcategories: [
      { name: 'Cítrico', notes: ['Limón', 'Naranja', 'Pomelo'] },
      { name: 'Tropical', notes: ['Mango', 'Piña', 'Maracuyá'] }
    ]
  },
  {
    category: 'Floral',
    subcategories: [
      { name: 'Jazmín', notes: ['Jazmín', 'Lavanda'] },
      { name: 'Rosas', notes: ['Rosa', 'Geranio'] }
    ]
  },
  {
    category: 'Dulce',
    subcategories: [
      { name: 'Caramelo', notes: ['Caramelo', 'Miel'] },
      { name: 'Chocolate', notes: ['Chocolate', 'Cacao'] }
    ]
  }
];

// Colores por categoría
const CATEGORY_COLORS: Record<string, string> = {
  Frutal: '#FFB3B3',
  Floral: '#B3D9FF',
  Dulce: '#FFF2B3'
};

export const FlavorWheel = ({ flavors = [], onChange }: FlavorWheelProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<FlavorNote | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Convertir notes string a objetos para D3
    const dataHierarchical = DATA.map((c) => ({
      category: c.category,
      children: c.subcategories.map((sc) => ({
        name: sc.name,
        children: sc.notes.map((n) => ({ name: n }))
      }))
    }));

    const width = 450;
    const height = 450;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // limpiar

    const root = d3
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .hierarchy({ name: 'root', children: dataHierarchical } as any)
      .sum(() => 1)
      .sort((a, b) => (a.data.name || '').localeCompare(b.data.name || ''));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    d3.partition<any>().size([2 * Math.PI, radius])(root as any);

    const arc = d3
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .arc<any>()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1);

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'display:block')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const nodes = root.descendants().filter((d) => d.depth > 0);

    g.selectAll('path')
      .data(nodes)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d) => {
        if (d.depth === 1) return CATEGORY_COLORS[d.data.category];
        if (d.depth === 2)
          return CATEGORY_COLORS[d.parent?.data.category ?? ''] ?? '#ccc';
        if (d.depth === 3)
          return (
            CATEGORY_COLORS[d.parent?.parent?.data.category ?? ''] ?? '#ccc'
          );
        return '#ccc';
      })
      .attr('stroke', '#fff')
      .attr('opacity', (d) => {
        const f: FlavorNote = {
          category: d.depth === 1 ? d.data.category : d.parent?.data.category,
          subcategory:
            d.depth === 2
              ? d.data.name
              : d.depth === 3
                ? d.parent?.data.name
                : undefined,
          note: d.depth === 3 ? d.data.name : undefined,
          intensity: 3
        };
        const match = flavors.find(
          (s) =>
            s.category === f.category &&
            (!f.subcategory || s.subcategory === f.subcategory) &&
            (!f.note || s.note === f.note)
        );
        return match ? 0.9 : 0.3;
      })
      .on('click', (_event, d) => {
        const f: FlavorNote = {
          category: d.depth === 1 ? d.data.category : d.parent?.data.category,
          subcategory:
            d.depth === 2
              ? d.data.name
              : d.depth === 3
                ? d.parent?.data.name
                : undefined,
          note: d.depth === 3 ? d.data.name : undefined,
          intensity: 3
        };
        setSelected(f);
      });
  }, [flavors]);

  const handleIntensityChange = (intensity: number) => {
    if (!selected) return;
    const updated = flavors.filter(
      (f) =>
        !(
          f.category === selected.category &&
          f.subcategory === selected.subcategory &&
          f.note === selected.note
        )
    );
    onChange([...updated, { ...selected, intensity }]);
    setSelected(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <svg ref={ref} className="flex-1"></svg>

      {/* Panel lateral fijo */}
      <div className="card bg-base-200 p-4 shadow-md w-full md:w-64 flex-shrink-0">
        {selected ? (
          <>
            <p className="font-semibold">
              {selected.note || selected.subcategory || selected.category}
            </p>
            <p className="text-sm text-gray-500">
              {selected.category}
              {selected.subcategory ? ` → ${selected.subcategory}` : ''}
              {selected.note ? ` → ${selected.note}` : ''}
            </p>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleIntensityChange(lvl)}
                  className={`btn btn-sm ${lvl === selected.intensity ? 'btn-primary' : 'btn-outline'}`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Selecciona una nota en la rueda</p>
        )}
      </div>
    </div>
  );
};
