import { useTranslation } from 'react-i18next';
import { useCVStore } from '../../../store';
import type { TemplateId } from '../../../types';

const templateIds: TemplateId[] = ['modern', 'classic', 'minimal', 'creative', 'professional'];

const templateColors: Record<TemplateId, string> = {
  modern: 'bg-teal-500',
  classic: 'bg-gray-700',
  minimal: 'bg-gray-400',
  creative: 'bg-purple-500',
  professional: 'bg-blue-900',
};

export function TemplateStep() {
  const { t } = useTranslation();
  const { selectedTemplate, setTemplate } = useCVStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templateIds.map((id) => (
          <button
            key={id}
            onClick={() => setTemplate(id)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              text-left
              ${
                selectedTemplate === id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-200 dark:ring-indigo-800'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }
            `}
          >
            <div
              className={`
                w-full h-32 rounded-lg mb-3
                ${templateColors[id]}
                flex items-center justify-center
              `}
            >
              <div className="w-16 h-20 bg-white rounded shadow-lg flex flex-col p-2">
                <div className={`h-4 ${templateColors[id]} rounded mb-1`} />
                <div className="space-y-1 flex-1">
                  <div className="h-1 bg-slate-200 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-3/4" />
                  <div className="h-1 bg-slate-200 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{t(`template.${id}`)}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t(`template.${id}Desc`)}</p>

            {selectedTemplate === id && (
              <div className="mt-2 flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
