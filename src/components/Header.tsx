import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { useCVStore } from '../store';

const isDev = import.meta.env.DEV;

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { fillWithDemoData, reset } = useCVStore();

  const isWizard = location.pathname.startsWith('/wizard');
  const isPlayground = location.pathname === '/playground';

  const handleReset = () => {
    reset();
    navigate('/wizard/personal');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Logo - smaller on mobile */}
        <button onClick={() => navigate('/wizard/personal')} className="focus:outline-none">
          <Logo size="sm" className="md:hidden" />
          <Logo size="md" className="hidden md:flex" />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          {isWizard && (
            <>
              <Button onClick={fillWithDemoData} variant="ghost" size="sm">
                {t('common.fillDemo')}
              </Button>
              <Button onClick={handleReset} variant="ghost" size="sm">
                {t('common.reset')}
              </Button>
              <div className="w-px h-6 bg-slate-200" />
            </>
          )}
          {isDev && (
            <>
              <Button
                onClick={() => navigate('/playground')}
                variant="ghost"
                size="sm"
                className={isPlayground ? 'bg-amber-100 text-amber-700' : ''}
              >
                Playground
              </Button>
              <div className="w-px h-6 bg-slate-200" />
            </>
          )}
          <LanguageSwitcher />
        </div>

        {/* Mobile nav */}
        {isWizard && (
          <MobileNav
            onFillDemo={fillWithDemoData}
            onReset={handleReset}
            onPlayground={() => navigate('/playground')}
            showPlayground={isDev}
          />
        )}
      </div>
    </header>
  );
}
