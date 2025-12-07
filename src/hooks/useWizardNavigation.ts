import { useNavigate, useLocation } from 'react-router-dom';

const stepPaths = ['personal', 'education', 'experience', 'skills', 'courses'] as const;

export function useWizardNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentStep = stepPaths.findIndex((step) => pathname.includes(step));
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepPaths.length - 1;

  const nextStep = () => {
    if (currentStep < stepPaths.length - 1) {
      navigate(`/wizard/${stepPaths[currentStep + 1]}`);
    } else {
      navigate('/preview');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      navigate(`/wizard/${stepPaths[currentStep - 1]}`);
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < stepPaths.length) {
      navigate(`/wizard/${stepPaths[index]}`);
    }
  };

  return {
    currentStep: Math.max(0, currentStep),
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    stepPaths,
  };
}
