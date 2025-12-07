import { useTranslation } from 'react-i18next';
import { Input, PhotoUpload } from '../../../components';
import { useCVStore } from '../../../store';

export function PersonalStep() {
  const { t } = useTranslation();
  const { cv, updatePersonal } = useCVStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <PhotoUpload
          value={cv.personal.photo}
          onChange={(photo) => updatePersonal({ photo })}
        />

        <div className="flex-1 space-y-4">
          <Input
            label={t('personal.name')}
            value={cv.personal.name}
            onChange={(e) => updatePersonal({ name: e.target.value })}
            placeholder="Jan Kowalski"
          />
          <Input
            label={t('personal.email')}
            type="email"
            value={cv.personal.email}
            onChange={(e) => updatePersonal({ email: e.target.value })}
            placeholder="jan.kowalski@email.pl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('personal.phone')}
          type="tel"
          value={cv.personal.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          placeholder="+48 123 456 789"
        />
        <Input
          label={t('personal.location')}
          value={cv.personal.location}
          onChange={(e) => updatePersonal({ location: e.target.value })}
          placeholder="Warszawa"
        />
      </div>
    </div>
  );
}
