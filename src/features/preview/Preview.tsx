import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '../../components';
import { useCVStore } from '../../store';
import { templates, getTemplateComponent } from '../templates';
import { CoverLetterTab } from './CoverLetterTab';
import type { TemplateId } from '../../types';

const WIZARD_RETURN_PATH_KEY = 'wizard-return-path';

type TabId = 'cv' | 'coverLetter';

export function Preview() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cv, coverLetter, selectedTemplate, setTemplate } = useCVStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('cv');

  const handlePrint = () => {
    window.print();
  };

  const handleTemplateSelect = (id: TemplateId) => {
    setTemplate(id);
    setSidebarOpen(false);
  };

  const handleBackToEdit = () => {
    const returnPath = sessionStorage.getItem(WIZARD_RETURN_PATH_KEY) || '/wizard/personal';
    sessionStorage.removeItem(WIZARD_RETURN_PATH_KEY);
    navigate(returnPath);
  };

  const TemplateComponent = getTemplateComponent(selectedTemplate);

  const tabs: { id: TabId; label: string }[] = [
    { id: 'cv', label: t('preview.tabs.cv', 'CV') },
    { id: 'coverLetter', label: t('preview.tabs.coverLetter', 'Cover Letter') },
  ];

  return (
    <div className="relative">
      {/* Controls - hidden when printing */}
      <div className="print:hidden max-w-6xl mx-auto mb-4 md:mb-6 px-4 sm:px-6">
        <Card variant="elevated" className="!p-3 md:!p-4">
          {/* Mobile controls */}
          <div className="flex md:hidden justify-between items-center">
            <Button onClick={handleBackToEdit} variant="secondary" size="sm">
              ← {t('preview.back', 'Back')}
            </Button>
            <div className="flex gap-2">
              {activeTab === 'cv' && (
                <Button onClick={() => setSidebarOpen(!sidebarOpen)} variant="outline" size="sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </Button>
              )}
              <Button onClick={handlePrint} size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Desktop controls */}
          <div className="hidden md:flex justify-between items-center">
            <Button onClick={handleBackToEdit} variant="secondary">
              ← {t('preview.back', 'Back to edit')}
            </Button>
            <div className="flex gap-3">
              {activeTab === 'cv' && (
                <Button onClick={() => setSidebarOpen(!sidebarOpen)} variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  {t('preview.changeTemplate')}
                </Button>
              )}
              <Button onClick={handlePrint}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                {activeTab === 'cv' ? t('preview.printCV', 'Print CV') : t('preview.printLetter', 'Print letter')}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs - hidden when printing */}
      <div className="print:hidden max-w-6xl mx-auto mb-4 md:mb-6 px-4 sm:px-6">
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }
              `}
            >
              {tab.label}
              {tab.id === 'coverLetter' && coverLetter?.content && (
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'cv' ? (
        <>
          {/* Mobile hint */}
          <div className="md:hidden print:hidden text-center mb-4 px-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              📱 Obróć telefon dla lepszego widoku
            </p>
          </div>

          {/* CV Preview - scaled on mobile */}
          <div className="print:m-0 overflow-x-auto">
            <div className="md:block flex justify-center min-w-fit px-4 md:px-0">
              <div className="transform scale-[0.45] md:scale-100 origin-top">
                <TemplateComponent data={cv} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="print:hidden max-w-6xl mx-auto px-4 sm:px-6">
          <Card variant="elevated" className="!p-4 md:!p-6">
            <CoverLetterTab />
          </Card>
        </div>
      )}

      {/* Template Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 print:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Template Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-800 shadow-2xl z-50 print:hidden
          transform transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t('template.title')}</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {templates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleTemplateSelect(tmpl.id as TemplateId)}
                className={`
                  w-full p-3 rounded-xl border-2 transition-all duration-200 text-left
                  ${
                    selectedTemplate === tmpl.id
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-2 ring-teal-200 dark:ring-teal-800'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }
                `}
              >
                <div
                  className={`
                    w-full h-24 rounded-lg mb-2
                    ${tmpl.color}
                    flex items-center justify-center
                  `}
                >
                  <div className="w-12 h-16 bg-white rounded shadow-lg flex flex-col p-1.5">
                    <div className={`h-3 ${tmpl.color} rounded mb-1`} />
                    <div className="space-y-0.5 flex-1">
                      <div className="h-0.5 bg-gray-200 rounded w-full" />
                      <div className="h-0.5 bg-gray-200 rounded w-3/4" />
                      <div className="h-0.5 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{t(tmpl.nameKey)}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t(tmpl.descKey)}</p>
                  </div>
                  {selectedTemplate === tmpl.id && (
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
