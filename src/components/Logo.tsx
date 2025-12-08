import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  clickable?: boolean;
}

const sizes = {
  sm: { icon: 'w-8 h-8', iconInner: 'w-4 h-4', text: 'text-lg', subtitle: 'text-[10px]' },
  md: { icon: 'w-10 h-10', iconInner: 'w-5 h-5', text: 'text-xl', subtitle: 'text-xs' },
  lg: { icon: 'w-12 h-12', iconInner: 'w-6 h-6', text: 'text-2xl', subtitle: 'text-sm' },
};

export function Logo({ size = 'md', className = '', clickable = true }: LogoProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { icon, iconInner, text, subtitle } = sizes[size];

  const handleClick = () => {
    if (clickable) {
      navigate('/wizard/personal');
    }
  };

  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Modern icon with layered effect */}
      <div className={`${icon} relative group`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
        {/* Background layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-600/20 rounded-xl rotate-6" />
        {/* Main icon container */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          {/* Document icon with modern design */}
          <svg
            className={`${iconInner} text-white`}
            fill="none"
            viewBox="0 0 24 24"
          >
            {/* Document base */}
            <path
              fill="currentColor"
              fillOpacity="0.3"
              d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
            />
            {/* Document outline */}
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 2v5a1 1 0 001 1h5M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
            />
            {/* Sparkle/magic element */}
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              d="M9 13h6M9 17h4"
            />
            {/* Check mark accent */}
            <circle cx="17" cy="17" r="4" fill="white" fillOpacity="0.9" />
            <path
              stroke="rgb(124 58 237)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.5 17l1 1 2-2"
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-start">
        <span className={`${text} font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 dark:from-violet-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent`}>
          {t('app.title', 'Apply Kit')}
        </span>
        <span className={`${subtitle} text-slate-500 dark:text-slate-400 font-medium -mt-0.5 text-left`}>
          {t('app.subtitle', 'CV & Cover Letter Creator')}
        </span>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <button
        onClick={handleClick}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {content}
      </button>
    );
  }

  return content;
}
