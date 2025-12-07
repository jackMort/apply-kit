import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wizard } from './features/wizard';
import { Preview } from './features/preview';
import { CoverLetterForm, CoverLetterPreview } from './features/cover-letter';
import { LanguageSwitcher, Logo, Button } from './components';
import { useCVStore } from './store';

type View = 'wizard' | 'preview' | 'cover-letter-form' | 'cover-letter-preview';

function App() {
  const [view, setView] = useState<View>('wizard');
  const { t } = useTranslation();
  const { fillWithDemoData, reset } = useCVStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 print:bg-white">
      {/* Header - hidden when printing */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            {view === 'wizard' && (
              <>
                <Button onClick={fillWithDemoData} variant="ghost" size="sm">
                  {t('common.fillDemo')}
                </Button>
                <Button onClick={reset} variant="ghost" size="sm">
                  {t('common.reset')}
                </Button>
                <div className="w-px h-6 bg-slate-200" />
              </>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-10 print:py-0">
        {view === 'wizard' && (
          <Wizard onComplete={() => setView('preview')} />
        )}
        {view === 'preview' && (
          <Preview
            onEdit={() => setView('wizard')}
            onCoverLetter={() => setView('cover-letter-form')}
          />
        )}
        {view === 'cover-letter-form' && (
          <CoverLetterForm
            onPreview={() => setView('cover-letter-preview')}
            onBack={() => setView('preview')}
          />
        )}
        {view === 'cover-letter-preview' && (
          <CoverLetterPreview
            onEdit={() => setView('cover-letter-form')}
            onBack={() => setView('preview')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
