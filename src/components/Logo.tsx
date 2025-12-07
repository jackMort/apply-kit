interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { icon: 'w-8 h-8', text: 'text-lg' },
  md: { icon: 'w-10 h-10', text: 'text-xl' },
  lg: { icon: 'w-12 h-12', text: 'text-2xl' },
};

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${icon} relative`}>
        {/* Background gradient circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl rotate-6 opacity-80" />
        {/* Foreground with icon */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`${text} font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
          Apply Kit
        </span>
        <span className="text-xs text-slate-500 font-medium -mt-0.5">
          CV & Cover Letter Creator
        </span>
      </div>
    </div>
  );
}
