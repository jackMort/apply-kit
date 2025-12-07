import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  animated?: boolean;
}

export function Card({ children, className = '', variant = 'default', animated = false }: CardProps) {
  const variants = {
    default: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md',
    elevated: 'bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border-0 hover:shadow-xl',
    glass: 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/20 dark:border-slate-700/20 shadow-lg',
  };

  return (
    <div
      className={`
        rounded-2xl p-6
        transition-all duration-300
        ${variants[variant]}
        ${animated ? 'animate-scale-in' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
}

export function CardHeader({ title, description }: CardHeaderProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
      )}
    </div>
  );
}
