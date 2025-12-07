import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Tag } from '../../../components';
import { useCVStore } from '../../../store';

export function ExperienceStep() {
  const { t } = useTranslation();
  const { cv, addExperience, updateExperience, removeExperience, addDuty, removeDuty } = useCVStore();
  const [newDuties, setNewDuties] = useState<Record<string, string>>({});

  const handleAddDuty = (experienceId: string) => {
    const duty = newDuties[experienceId]?.trim();
    if (duty) {
      addDuty(experienceId, duty);
      setNewDuties({ ...newDuties, [experienceId]: '' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, experienceId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDuty(experienceId);
    }
  };

  return (
    <div className="space-y-6">
      {cv.experience.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>{t('experience.title')}</p>
          <p className="text-sm">{t('experience.add')}</p>
        </div>
      )}

      {cv.experience.map((exp, index) => (
        <div
          key={exp.id}
          className="p-4 border border-gray-200 rounded-lg space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              #{index + 1}
            </span>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              {t('common.remove')}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('experience.company')}
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
              placeholder="Company name"
            />
            <Input
              label={t('experience.position')}
              value={exp.position}
              onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
              placeholder="Junior Developer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('experience.startDate')}
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              placeholder="01.2023"
            />
            <Input
              label={t('experience.endDate')}
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
              placeholder="present"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('experience.duties')}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {exp.duties.map((duty, dutyIndex) => (
                <Tag key={dutyIndex} onRemove={() => removeDuty(exp.id, dutyIndex)}>
                  {duty}
                </Tag>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newDuties[exp.id] || ''}
                onChange={(e) => setNewDuties({ ...newDuties, [exp.id]: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, exp.id)}
                placeholder={t('experience.addDuty')}
              />
              <Button
                onClick={() => handleAddDuty(exp.id)}
                variant="secondary"
                size="md"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addExperience} variant="outline" className="w-full">
        + {t('experience.add')}
      </Button>
    </div>
  );
}
