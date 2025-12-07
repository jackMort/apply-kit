import { useTranslation } from 'react-i18next';
import { Button, Card, ProgressBar } from '../../components';
import { useCVStore } from '../../store';
import {
  PersonalStep,
  EducationStep,
  ExperienceStep,
  SkillsStep,
  CoursesLanguagesStep,
  TemplateStep,
} from './steps';

const stepKeys = ['personal', 'education', 'experience', 'skills', 'courses', 'template'] as const;
const stepComponents = [PersonalStep, EducationStep, ExperienceStep, SkillsStep, CoursesLanguagesStep, TemplateStep];

interface WizardProps {
  onComplete: () => void;
}

export function Wizard({ onComplete }: WizardProps) {
  const { t } = useTranslation();
  const { currentStep, setStep, nextStep, prevStep } = useCVStore();

  const CurrentStepComponent = stepComponents[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepKeys.length - 1;

  const stepNames = stepKeys.map((key) => t(`wizard.steps.${key}`));

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      nextStep();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <Card variant="elevated" className="mb-6" animated>
        <ProgressBar
          steps={stepNames}
          currentStep={currentStep}
          onStepClick={setStep}
        />
      </Card>

      <Card variant="elevated" key={currentStep} animated>
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {stepNames[currentStep]}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-3" />
        </div>

        <CurrentStepComponent />

        <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
          <Button
            onClick={prevStep}
            variant="secondary"
            disabled={isFirstStep}
          >
            ← {t('wizard.prev')}
          </Button>

          <Button onClick={handleNext}>
            {isLastStep ? t('wizard.finish') : `${t('wizard.next')} →`}
          </Button>
        </div>
      </Card>
    </div>
  );
}
