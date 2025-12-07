import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Tag } from '../../../components';
import { useCVStore } from '../../../store';

function SkillLevel({ level, onChange }: { level: number; onChange: (level: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-6 h-6 rounded-full transition-all duration-200 ${
            n <= level
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm'
              : 'bg-slate-200 hover:bg-slate-300'
          }`}
          title={`Level ${n}`}
        />
      ))}
    </div>
  );
}

export function SkillsStep() {
  const { t } = useTranslation();
  const { cv, addHardSkill, updateHardSkill, removeHardSkill, addSoftSkill, removeSoftSkill } = useCVStore();
  const [newHardSkill, setNewHardSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const handleAddHardSkill = () => {
    if (newHardSkill.trim()) {
      addHardSkill(newHardSkill.trim());
      setNewHardSkill('');
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim()) {
      addSoftSkill(newSoftSkill.trim());
      setNewSoftSkill('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">
          {t('skills.hard')}
        </h3>

        <div className="space-y-3 mb-4">
          {cv.skills.hard.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
            >
              <span className="font-medium text-slate-700">{skill.name}</span>
              <div className="flex items-center gap-4">
                <SkillLevel
                  level={skill.level}
                  onChange={(level) => updateHardSkill(skill.id, { level })}
                />
                <button
                  onClick={() => removeHardSkill(skill.id)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  type="button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
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
        <h3 className="text-lg font-medium text-slate-800 mb-4">
          {t('skills.soft')}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {cv.skills.soft.map((skill) => (
            <Tag key={skill} onRemove={() => removeSoftSkill(skill)} variant="outline">
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
