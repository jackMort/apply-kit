import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Tag } from '../../../components';
import { useCVStore } from '../../../store';

export function SkillsStep() {
  const { t } = useTranslation();
  const { cv, addSkill, removeSkill } = useCVStore();
  const [newHardSkill, setNewHardSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const handleAddHardSkill = () => {
    if (newHardSkill.trim()) {
      addSkill('hard', newHardSkill.trim());
      setNewHardSkill('');
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim()) {
      addSkill('soft', newSoftSkill.trim());
      setNewSoftSkill('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('skills.hard')}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {cv.skills.hard.map((skill) => (
            <Tag key={skill} onRemove={() => removeSkill('hard', skill)}>
              {skill}
            </Tag>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newHardSkill}
            onChange={(e) => setNewHardSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHardSkill())}
            placeholder={t('skills.hardPlaceholder')}
          />
          <Button onClick={handleAddHardSkill} variant="secondary">
            +
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('skills.soft')}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {cv.skills.soft.map((skill) => (
            <Tag key={skill} onRemove={() => removeSkill('soft', skill)} variant="outline">
              {skill}
            </Tag>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSoftSkill())}
            placeholder={t('skills.softPlaceholder')}
          />
          <Button onClick={handleAddSoftSkill} variant="secondary">
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
