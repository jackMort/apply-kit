import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../components';
import { useCVStore } from '../../../store';

export function PersonalStep() {
  const { t } = useTranslation();
  const { cv, updatePersonal } = useCVStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors overflow-hidden"
          >
            {cv.personal.photo ? (
              <img
                src={cv.personal.photo}
                alt={t('personal.photo')}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-slate-400 dark:text-slate-500">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs">{t('personal.uploadPhoto')}</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          {cv.personal.photo && (
            <button
              onClick={() => updatePersonal({ photo: undefined })}
              className="mt-2 text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 w-full text-center"
            >
              {t('common.remove')}
            </button>
          )}
        </div>

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
