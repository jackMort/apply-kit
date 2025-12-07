import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Tag } from '../../../components';
import { useCVStore } from '../../../store';

const languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

export function CoursesLanguagesStep() {
  const { t } = useTranslation();
  const { cv, addCourse, removeCourse, addLanguage, updateLanguage, removeLanguage } = useCVStore();
  const [newCourse, setNewCourse] = useState('');

  const handleAddCourse = () => {
    if (newCourse.trim()) {
      addCourse(newCourse.trim());
      setNewCourse('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
          {t('courses.title')}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {cv.courses.map((course) => (
            <Tag key={course} onRemove={() => removeCourse(course)}>
              {course}
            </Tag>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCourse())}
            placeholder={t('courses.placeholder')}
          />
          <Button onClick={handleAddCourse} variant="secondary">
            +
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
          {t('languages.title')}
        </h3>

        {cv.languages.map((lang) => (
          <div
            key={lang.id}
            className="flex items-center gap-4 mb-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
          >
            <div className="flex-1">
              <Input
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                placeholder={t('languages.name')}
              />
            </div>
            <div className="w-32">
              <select
                value={lang.level}
                onChange={(e) => updateLanguage(lang.id, { level: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="">{t('languages.level')}</option>
                {languageLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => removeLanguage(lang.id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        <Button onClick={addLanguage} variant="outline" className="w-full">
          + {t('languages.add')}
        </Button>
      </div>
    </div>
  );
}
