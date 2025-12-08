import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { SettingsDropdown } from './SettingsDropdown';
import { Button } from './Button';
import { useCVStore } from '../store';

const WIZARD_RETURN_PATH_KEY = 'wizard-return-path';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { cv } = useCVStore();

  const isWizardPage = location.pathname.startsWith('/wizard');
  const canPreview = cv.personal.name.trim() && cv.personal.email.trim();

  const handlePreviewClick = () => {
    sessionStorage.setItem(WIZARD_RETURN_PATH_KEY, location.pathname);
    navigate('/preview');
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Logo size="sm" className="md:hidden" />
          <Logo size="md" className="hidden md:flex" />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Preview Button - only on wizard pages */}
          {isWizardPage && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviewClick}
              disabled={!canPreview}
              title={!canPreview ? t('preview.fillNameEmail', 'Fill in name and email') : undefined}
            >
              <svg className="w-4 h-4 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="hidden md:inline">{t('preview.preview', 'Preview')}</span>
            </Button>
          )}

          {/* Settings */}
          <SettingsDropdown />
        </div>
      </div>
    </header>
  );
}
