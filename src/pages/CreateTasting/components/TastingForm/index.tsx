import { useState } from 'react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import type { TastingEntryForm } from '../../../../api/tasting/types';
import { tastingEntryFormSchema } from '../../../../api/tasting/schema';
import { tastingEvents, tastingStores } from '../../../../api/tasting/model';
import { TextBlock } from '../../../../shared/components/TextBlock';
import { authStores } from '../../../../shared/model/authModel';
import { PhotoUploader } from '../../../../shared/components/PhotoUploader';
import { Container } from './styles';
import { photoEvents } from '../../../../api/photo/model';

const baseData: TastingEntryForm = {
  name: '',
  date: new Date().toISOString().slice(0, 10),
  context: { enjoyedAt: 'home', enjoyedOther: '' },
  coffee: { origin: '', roaster: '', roastDate: '' }
};

export const TastingForm = () => {
  const { t } = useTranslation();

  const addError = useUnit(tastingStores.$addError);
  const isSubmitting = useUnit(tastingStores.$isSubmitting);
  const addTasting = useUnit(tastingEvents.addTasting);
  const user = useUnit(authStores.$user);
  const addTempPhotos = useUnit(photoEvents.addTempPhotos);

  const [form, setForm] = useState<TastingEntryForm>(baseData);
  const [errors, setErrors] = useState<string[]>([]); // <- validation errors

  const clearForm = () => {
    setForm(baseData);
  };

  const handleChange = (path: string, value: string) => {
    setForm((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clone: any = structuredClone(prev);
      const keys = path.split('.');
      let obj = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return clone;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const parsed = tastingEntryFormSchema.safeParse(form);

    if (!parsed.success) {
      console.error('Errores de validación:', parsed.error);
      const validationErrors: string[] = [];

      // result.error.issues es un array con los detalles de cada error
      for (const issue of parsed.error.issues) {
        // issue.path es un array con la ruta al campo con error
        // issue.message es el mensaje de error
        const field =
          issue.path.length > 0 ? issue.path.join('.') : 'formulario';
        validationErrors.push(`${field}: ${issue.message}`);
      }

      setErrors(validationErrors);

      return;
    }

    console.log('✅ Datos válidos:', parsed.data);

    setErrors([]);
    addTasting({ ...parsed.data, userId: user!.id });
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Fecha</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => handleChange('date', e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <fieldset>
        <legend className="font-semibold">Dónde la disfrutaste</legend>
        <select
          value={form.context.enjoyedAt}
          onChange={(e) => handleChange('context.enjoyedAt', e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="home">Casa</option>
          <option value="coffeeShop">Cafetería</option>
          <option value="other">Otro</option>
        </select>

        {form.context.enjoyedAt === 'other' ||
          (form.context.enjoyedAt === 'coffeeShop' && (
            <input
              value={form.context.enjoyedOther}
              onChange={(e) =>
                handleChange('context.enjoyedOther', e.target.value)
              }
              placeholder="Especifica dónde"
              className="input input-bordered w-full mt-2"
            />
          ))}
      </fieldset>

      <fieldset>
        <legend className="font-semibold">Detalles del café</legend>
        <input
          value={form.coffee.origin}
          onChange={(e) => handleChange('coffee.origin', e.target.value)}
          placeholder="Origen"
          className="input input-bordered w-full mb-2"
        />
        <input
          value={form.coffee.roaster}
          onChange={(e) => handleChange('coffee.roaster', e.target.value)}
          placeholder="Tostador"
          className="input input-bordered w-full mb-2"
        />
        <input
          type="date"
          value={form.coffee.roastDate}
          onChange={(e) => handleChange('coffee.roastDate', e.target.value)}
          className="input input-bordered w-full"
        />
      </fieldset>

      <PhotoUploader onChange={addTempPhotos} />

      <div className="form-control mt-4">
        <button
          type="submit"
          className={`btn btn-primary ${isSubmitting ? 'btn-disabled' : ''}`}
        >
          {isSubmitting ? 'Guardando...' : t('tastingForm.title')}
        </button>
      </div>
    </form>
  );
};
