import { useState } from 'react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import type { TastingEntry } from '../../../../api/tasting/types';
import { TastingEntrySchema } from '../../../../api/tasting/schema';
import { tastingEvents, tastingStores } from '../../../../api/tasting/model';
import { TextBlock } from '../../../../shared/components/TextBlock';
import { Container } from './styles';

export const TastingForm = () => {
  const { t } = useTranslation();

  const addError = useUnit(tastingStores.$addError);
  const isSubmitting = useUnit(tastingStores.$isSubmitting);
  const addTasting = useUnit(tastingEvents.addTasting);

  const [date, setDate] = useState<Date>(new Date());
  const [coffeeName, setCoffeeName] = useState('');
  const [origin, setOrigin] = useState('');
  const [roaster, setRoaster] = useState('');
  const [method, setMethod] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  const [errors, setErrors] = useState<string[]>([]); // <- errores de validación

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const clearForm = () => {
    setDate(new Date());
    setCoffeeName('');
    setOrigin('');
    setRoaster('');
    setMethod('');
    setScore(null);
    setNotes('');
    setPhotos([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const dataToValidate: TastingEntry = {
      date,
      coffeeName,
      origin,
      roaster,
      method,
      score,
      notes,
      photos
    };

    const result = TastingEntrySchema.safeParse(dataToValidate);

    if (!result.success) {
      console.error('Errores de validación:', result.error);
      const validationErrors: string[] = [];

      // result.error.issues es un array con los detalles de cada error
      for (const issue of result.error.issues) {
        // issue.path es un array con la ruta al campo con error
        // issue.message es el mensaje de error
        const field =
          issue.path.length > 0 ? issue.path.join('.') : 'formulario';
        validationErrors.push(`${field}: ${issue.message}`);
      }

      setErrors(validationErrors);

      return;
    }

    console.log('✅ Datos válidos:', result.data);

    setErrors([]);
    addTasting(result.data);
    clearForm();
  };

  if (isSubmitting) {
    return (
      <Container>
        <div>spinner loading</div>
      </Container>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <TextBlock bold size="large" color="primary">
          {t('tastingForm.title')}
        </TextBlock>

        {(errors.length > 0 || addError) && (
          <div className="alert alert-error shadow-sm">
            <ul className="list-disc list-inside text-sm">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('tastingForm.date')}</span>
          </label>
          <input
            type="date"
            value={date.toISOString().substring(0, 10)}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="input input-bordered"
          />
        </div>

        {[
          { label: 'name', value: coffeeName, setter: setCoffeeName },
          { label: 'origin', value: origin, setter: setOrigin },
          { label: 'roaster', value: roaster, setter: setRoaster },
          { label: 'method', value: method, setter: setMethod }
        ].map(({ label, value, setter }) => (
          <div className="form-control" key={label}>
            <label className="label">
              <span className="label-text">{t(`tastingForm.${label}`)}</span>
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="input input-bordered"
            />
          </div>
        ))}

        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('tastingForm.score')}</span>
          </label>
          <input
            type="number"
            min={0}
            max={10}
            value={score !== null ? score : ''}
            onChange={(e) =>
              setScore(e.target.value === '' ? null : Number(e.target.value))
            }
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('tastingForm.notes')}</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="textarea textarea-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('tastingForm.photos')}</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="file-input file-input-bordered"
          />
          {photos.length > 0 && (
            <img
              src={URL.createObjectURL(photos[0])}
              alt="Preview"
              className="mt-2 rounded shadow max-h-48 object-cover"
            />
          )}
        </div>

        <div className="form-control mt-4">
          <button
            type="submit"
            className={`btn btn-primary ${isSubmitting ? 'btn-disabled' : ''}`}
          >
            {isSubmitting ? 'Guardando...' : t('tastingForm.title')}
          </button>
        </div>
      </Container>
    </form>
  );
};
