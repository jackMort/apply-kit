import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useCVStore } from '../../store';
import { useAI, hasApiKey } from './useAI';
import { AIKeyModal } from './AIKeyModal';
import { JobMatchModal } from './JobMatchModal';
import { AIError } from './errors';
import {
  coverLetterSystemPrompt,
  generateCoverLetterPrompt,
  improveCoverLetterPrompt,
} from './prompts/coverLetter';
import {
  experienceSystemPrompt,
  generateDutiesPrompt,
  improveDutiesPrompt,
} from './prompts/experience';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  disabled?: boolean;
}

export function AIFloatingButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showJobMatchModal, setShowJobMatchModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(null);

  const { cv, coverLetter, updateCoverLetter, updateExperience } = useCVStore();
  const { generate, isLoading } = useAI();
  const { generate: generateGpt4 } = useAI({ model: 'gpt-4o' });

  // Determine which page we're on and what actions are available
  const getMenuItems = useCallback((): MenuItem[] => {
    const path = location.pathname;

    if (path === '/cover-letter') {
      return [
        {
          id: 'generate-letter',
          label: t('ai.generateLetter', 'Generate letter'),
          icon: <SparklesIcon />,
          action: () => handleGenerateCoverLetter(),
        },
        {
          id: 'improve-letter',
          label: t('ai.improveLetter', 'Improve letter'),
          icon: <WandIcon />,
          action: () => handleImproveCoverLetter(),
          disabled: !coverLetter?.content || coverLetter.content.length < 50,
        },
      ];
    }

    if (path === '/wizard/experience') {
      const items: MenuItem[] = [];

      if (cv.experience.length === 0) {
        return []; // No experience entries, hide FAB
      }

      if (activeExperienceId) {
        const exp = cv.experience.find(e => e.id === activeExperienceId);
        if (exp) {
          items.push({
            id: 'generate-duties',
            label: t('ai.generateDuties', 'Generate duties'),
            icon: <SparklesIcon />,
            action: () => handleGenerateDuties(activeExperienceId),
            disabled: !exp.position,
          });
          if (exp.duties.length > 0) {
            items.push({
              id: 'improve-duties',
              label: t('ai.improveDuties', 'Improve duties'),
              icon: <WandIcon />,
              action: () => handleImproveDuties(activeExperienceId),
            });
          }
        }
      } else {
        // Show selector for experiences
        cv.experience.forEach(exp => {
          if (exp.position || exp.company) {
            items.push({
              id: `exp-${exp.id}`,
              label: exp.position || exp.company || t('ai.untitled', 'Untitled'),
              icon: <BriefcaseIcon />,
              action: () => setActiveExperienceId(exp.id),
            });
          }
        });
      }

      return items;
    }

    if (path === '/preview') {
      return [
        {
          id: 'job-match',
          label: t('ai.matchJob', 'Match to job posting'),
          icon: <TargetIcon />,
          action: () => setShowJobMatchModal(true),
        },
      ];
    }

    return [];
  }, [location.pathname, cv.experience, coverLetter, activeExperienceId, t]);

  const menuItems = getMenuItems();

  // Reset active experience when leaving the experience page
  useEffect(() => {
    if (location.pathname !== '/wizard/experience') {
      setActiveExperienceId(null);
    }
  }, [location.pathname]);

  // Listen for focus on experience inputs (only when menu is closed)
  useEffect(() => {
    if (location.pathname !== '/wizard/experience') return;

    const handleFocusIn = (e: FocusEvent) => {
      // Don't change activeExperienceId if menu is open (user is selecting)
      if (isMenuOpen) return;

      const target = e.target as HTMLElement;
      const experienceCard = target.closest('[data-experience-id]');
      if (experienceCard) {
        const id = experienceCard.getAttribute('data-experience-id');
        setActiveExperienceId(id);
      }
    };

    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [location.pathname, isMenuOpen]);

  const executeWithKey = useCallback((action: () => void) => {
    if (!hasApiKey()) {
      setPendingAction(() => action);
      setShowKeyModal(true);
    } else {
      action();
    }
  }, []);

  const handleKeyModalSuccess = useCallback(() => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const handleAIError = useCallback((err: unknown) => {
    if (err instanceof AIError) {
      if (err.type === 'INVALID_API_KEY') {
        setShowKeyModal(true);
      } else {
        toast.error(t(`ai.errors.${err.type}`, err.message));
      }
    } else {
      toast.error(t('ai.errors.SERVICE_ERROR', 'Something went wrong'));
    }
  }, [t]);

  // Cover Letter Actions
  const handleGenerateCoverLetter = async () => {
    setIsMenuOpen(false);

    if (!coverLetter?.position) {
      // Navigate to cover letter page if no position
      navigate('/cover-letter');
      return;
    }

    executeWithKey(async () => {
      try {
        const result = await generate(
          coverLetterSystemPrompt(i18n.language),
          generateCoverLetterPrompt(cv, coverLetter.position, coverLetter.company, coverLetter.jobDescription)
        );
        updateCoverLetter({ content: result });
      } catch (err) {
        handleAIError(err);
      }
    });
  };

  const handleImproveCoverLetter = async () => {
    setIsMenuOpen(false);

    if (!coverLetter?.content) return;

    executeWithKey(async () => {
      try {
        const result = await generate(
          coverLetterSystemPrompt(i18n.language),
          improveCoverLetterPrompt(
            coverLetter.content,
            cv,
            coverLetter.position,
            coverLetter.company,
            coverLetter.jobDescription
          )
        );
        updateCoverLetter({ content: result });
      } catch (err) {
        handleAIError(err);
      }
    });
  };

  // Experience Actions
  const handleGenerateDuties = async (experienceId: string) => {
    setIsMenuOpen(false);
    const exp = cv.experience.find(e => e.id === experienceId);
    if (!exp || !exp.position) return;

    executeWithKey(async () => {
      try {
        const result = await generate(
          experienceSystemPrompt(i18n.language),
          generateDutiesPrompt(exp.position, exp.company)
        );
        const duties = result.split('\n').filter(line => line.trim());
        updateExperience(experienceId, { duties });
      } catch (err) {
        handleAIError(err);
      }
    });
  };

  const handleImproveDuties = async (experienceId: string) => {
    setIsMenuOpen(false);
    const exp = cv.experience.find(e => e.id === experienceId);
    if (!exp || exp.duties.length === 0) return;

    executeWithKey(async () => {
      try {
        const result = await generate(
          experienceSystemPrompt(i18n.language),
          improveDutiesPrompt(exp.position, exp.company, exp.duties)
        );
        const duties = result.split('\n').filter(line => line.trim());
        updateExperience(experienceId, { duties });
      } catch (err) {
        handleAIError(err);
      }
    });
  };

  // Don't render if no menu items or on irrelevant pages
  if (menuItems.length === 0) return null;

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-20 right-4 z-40 print:hidden md:bottom-8 md:right-8">
        {/* Menu */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0"
              onClick={() => {
                setIsMenuOpen(false);
                setActiveExperienceId(null);
              }}
            />
            <div className="absolute bottom-16 right-0 mb-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden min-w-[200px]">
              {activeExperienceId && (
                <button
                  onClick={() => setActiveExperienceId(null)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('ai.back', 'Back')}
                </button>
              )}
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={item.action}
                  disabled={item.disabled || isLoading}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-indigo-500 dark:text-indigo-400">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          disabled={isLoading}
          className={`
            w-14 h-14 rounded-full shadow-lg
            bg-gradient-to-br from-violet-500 to-indigo-600
            hover:from-violet-600 hover:to-indigo-700
            flex items-center justify-center
            transition-all duration-200
            ${isLoading ? 'animate-pulse' : 'hover:scale-105'}
            ${isMenuOpen ? 'rotate-45' : ''}
          `}
        >
          {isLoading ? (
            <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          )}
        </button>
      </div>

      {/* Modals */}
      {showKeyModal && (
        <AIKeyModal
          onClose={() => {
            setShowKeyModal(false);
            setPendingAction(null);
          }}
          onSuccess={handleKeyModalSuccess}
        />
      )}

      {showJobMatchModal && (
        <JobMatchModal
          onClose={() => setShowJobMatchModal(false)}
          cv={cv}
          generate={generateGpt4}
          isLoading={isLoading}
          onNeedApiKey={() => {
            setShowJobMatchModal(false);
            setShowKeyModal(true);
          }}
        />
      )}
    </>
  );
}

// Icons
function SparklesIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function WandIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
