import { useTranslation } from 'react-i18next';
import { Button } from './Button';

interface BottomNavProps {
  onPrev: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function BottomNav({ onPrev, onNext, isFirstStep, isLastStep }: BottomNavProps) {
  const { t } = useTranslation();

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 md:hidden
        bg-white border-t border-slate-200
        px-4 py-3
        pb-[max(0.75rem,env(safe-area-inset-bottom))]
        z-40
      "
    >
      <div className="flex justify-between gap-4">
        <Button
          onClick={onPrev}
          variant="secondary"
          disabled={isFirstStep}
          className="flex-1"
        >
          ← {t('wizard.prev')}
        </Button>

        <Button
          onClick={onNext}
          className="flex-1"
        >
          {isLastStep ? t('wizard.finish') : `${t('wizard.next')} →`}
        </Button>
      </div>
    </div>
  );
}
