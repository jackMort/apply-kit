import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, ProgressBar, ATSTips, MobileProgress, BottomNav } from '../../components';
import { useCVStore } from '../../store';
import { useWizardNavigation } from '../../hooks';

const stepKeys = ['personal', 'education', 'experience', 'skills', 'courses'] as const;

export function WizardLayout() {
  const { t } = useTranslation();
  const { cv } = useCVStore();
  const { currentStep, isFirstStep, isLastStep, nextStep, prevStep, goToStep } = useWizardNavigation();

  const stepNames = stepKeys.map((key) => t(`wizard.steps.${key}`));

  return (
    <div className="pb-20 md:pb-0">
      {/* Mobile Progress */}
      <MobileProgress steps={stepNames} currentStep={currentStep} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Desktop Progress */}
        <Card variant="elevated" className="mb-6 hidden md:block" animated>
          <ProgressBar
            steps={stepNames}
            currentStep={currentStep}
            onStepClick={goToStep}
          />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <Card variant="elevated" key={currentStep} animated className="!p-4 md:!p-6">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                {stepNames[currentStep]}
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 md:mt-3" />
            </div>

            {/* Step content rendered via Outlet */}
            <Outlet />

            {/* Desktop navigation */}
            <div className="hidden md:flex justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-700">
              <Button
                onClick={prevStep}
                variant="secondary"
                disabled={isFirstStep}
              >
                ← {t('wizard.prev')}
              </Button>

              <Button onClick={nextStep}>
                {isLastStep ? t('wizard.finish') : `${t('wizard.next')} →`}
              </Button>
            </div>
          </Card>

          {/* ATS Tips Sidebar - desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ATSTips data={cv} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        onPrev={prevStep}
        onNext={nextStep}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
}
