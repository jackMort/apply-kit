import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '../../components';
import { useCVStore } from '../../store';
import {
  ModernTemplate,
  ClassicTemplate,
  MinimalTemplate,
  CreativeTemplate,
  ProfessionalTemplate,
} from '../templates';
import type { CVData, TemplateId } from '../../types';

interface PreviewProps {
  onEdit: () => void;
  onCoverLetter: () => void;
}

const templates: Record<string, React.ComponentType<{ data: CVData }>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
};

const templateIds: TemplateId[] = ['modern', 'classic', 'minimal', 'creative', 'professional'];

const templateColors: Record<TemplateId, string> = {
  modern: 'bg-teal-500',
  classic: 'bg-gray-700',
  minimal: 'bg-gray-400',
  creative: 'bg-purple-500',
  professional: 'bg-blue-900',
};

export function Preview({ onEdit, onCoverLetter }: PreviewProps) {
  const { t } = useTranslation();
  const { cv, selectedTemplate, setTemplate } = useCVStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleTemplateSelect = (id: TemplateId) => {
    setTemplate(id);
    setSidebarOpen(false);
  };

  const TemplateComponent = templates[selectedTemplate] || ModernTemplate;

  return (
    <div className="relative">
      {/* Controls - hidden when printing */}
      <div className="print:hidden max-w-6xl mx-auto mb-8 px-4 sm:px-6">
        <Card variant="elevated" className="!p-4">
          <div className="flex justify-between items-center">
            <Button onClick={onEdit} variant="secondary">
              ← {t('preview.edit')}
            </Button>
            <div className="flex gap-3">
              <Button onClick={() => setSidebarOpen(!sidebarOpen)} variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                {t('preview.changeTemplate')}
              </Button>
              <Button onClick={onCoverLetter} variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('preview.coverLetter')}
              </Button>
              <Button onClick={handlePrint}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                {t('preview.print')}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* CV Preview */}
      <div className="print:m-0">
        <TemplateComponent data={cv} />
      </div>

      {/* Template Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 print:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Template Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 print:hidden
          transform transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">{t('template.title')}</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {templateIds.map((id) => (
              <button
                key={id}
                onClick={() => handleTemplateSelect(id)}
                className={`
                  w-full p-3 rounded-xl border-2 transition-all duration-200 text-left
                  ${
                    selectedTemplate === id
                      ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div
                  className={`
                    w-full h-24 rounded-lg mb-2
                    ${templateColors[id]}
                    flex items-center justify-center
                  `}
                >
                  <div className="w-12 h-16 bg-white rounded shadow-lg flex flex-col p-1.5">
                    <div className={`h-3 ${templateColors[id]} rounded mb-1`} />
                    <div className="space-y-0.5 flex-1">
                      <div className="h-0.5 bg-gray-200 rounded w-full" />
                      <div className="h-0.5 bg-gray-200 rounded w-3/4" />
                      <div className="h-0.5 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{t(`template.${id}`)}</h3>
                    <p className="text-xs text-gray-500">{t(`template.${id}Desc`)}</p>
                  </div>
                  {selectedTemplate === id && (
                    <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
