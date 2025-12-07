interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressBar({ steps, currentStep, onStepClick }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-start">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            {/* Step circle with label */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick}
                className={`
                  flex items-center justify-center
                  w-10 h-10 rounded-xl
                  font-semibold text-sm
                  transition-all duration-300
                  ${
                    index < currentStep
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25'
                      : index === currentStep
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white ring-4 ring-indigo-100 shadow-lg shadow-indigo-500/30 scale-110'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }
                  ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                `}
              >
                {index < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
              <span
                className={`
                  mt-4 text-xs font-medium text-center whitespace-nowrap
                  transition-colors duration-200
                  ${index === currentStep ? 'text-indigo-600' : index < currentStep ? 'text-slate-600' : 'text-slate-400'}
                `}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-3 mt-5 rounded-full bg-slate-100 overflow-hidden self-start">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index < currentStep
                      ? 'w-full bg-gradient-to-r from-indigo-500 to-purple-500'
                      : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
