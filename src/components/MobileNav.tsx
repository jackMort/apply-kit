import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileNavProps {
  onFillDemo: () => void;
  onReset: () => void;
  onPlayground?: () => void;
  showPlayground?: boolean;
}

export function MobileNav({ onFillDemo, onReset, onPlayground, showPlayground }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Menu"
      >
        <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Portal for overlay and menu - escapes header's stacking context */}
      {createPortal(
        <>
          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/20 z-[55]"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Slide-in menu */}
          <div
            className={`
              fixed top-0 right-0 h-full w-64 z-[60]
              bg-white dark:bg-slate-900 shadow-2xl
              transform transition-transform duration-300 ease-out
              ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="p-4">
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu items */}
              <div className="space-y-2">
                <Button
                  onClick={() => { onFillDemo(); setIsOpen(false); }}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {t('common.fillDemo')}
                </Button>

                <Button
                  onClick={() => { onReset(); setIsOpen(false); }}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {t('common.reset')}
                </Button>

                {showPlayground && onPlayground && (
                  <Button
                    onClick={() => { onPlayground(); setIsOpen(false); }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    Playground
                  </Button>
                )}

                <div className="border-t border-slate-200 dark:border-slate-700 my-4" />

                <div className="px-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Jezik / Language</p>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
