import { useTranslation } from 'react-i18next';
import { Button, Input, TextArea } from '../../../components';
import { useCVStore } from '../../../store';

export function EducationStep() {
  const { t } = useTranslation();
  const { cv, addEducation, updateEducation, removeEducation } = useCVStore();

  return (
    <div className="space-y-6">
      {cv.education.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <p>{t('education.title')}</p>
          <p className="text-sm">{t('education.add')}</p>
        </div>
      )}

      {cv.education.map((edu, index) => (
        <div
          key={edu.id}
          className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4 relative"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              #{index + 1}
            </span>
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
            >
              {t('common.remove')}
            </button>
          </div>

          <Input
            label={t('education.school')}
            value={edu.school}
            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
            placeholder="Uniwersytet Warszawski"
          />

          <Input
            label={t('education.degree')}
            value={edu.degree}
            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
            placeholder="Informatyka"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('education.startDate')}
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
              placeholder="2020"
            />
            <Input
              label={t('education.endDate')}
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
              placeholder="2024"
            />
          </div>

          <TextArea
            label={t('education.description')}
            value={edu.description || ''}
            onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
            placeholder="..."
            rows={2}
          />
        </div>
      ))}

      <Button onClick={addEducation} variant="outline" className="w-full">
        + {t('education.add')}
      </Button>
    </div>
  );
}
