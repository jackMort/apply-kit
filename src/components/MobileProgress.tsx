interface MobileProgressProps {
  steps: string[];
  currentStep: number;
}

export function MobileProgress({ steps, currentStep }: MobileProgressProps) {
  return (
    <div className="md:hidden py-3 px-4 bg-white border-b border-slate-200">
      {/* Dots */}
      <div className="flex justify-center gap-2 mb-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index <= currentStep
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                : 'bg-slate-300'
              }
              ${index === currentStep ? 'w-4' : ''}
            `}
          />
        ))}
      </div>

      {/* Step name */}
      <p className="text-sm text-center text-slate-600 font-medium">
        {steps[currentStep]}
        <span className="text-slate-400 ml-2">
          {currentStep + 1}/{steps.length}
        </span>
      </p>
    </div>
  );
}
