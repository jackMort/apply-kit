interface TagProps {
  children: string;
  onRemove?: () => void;
  variant?: 'default' | 'outline';
}

export function Tag({ children, onRemove, variant = 'default' }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1.5 rounded-full
        text-sm font-medium
        transition-all duration-200
        ${
          variant === 'default'
            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }
      `}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 p-0.5 rounded-full hover:bg-indigo-200/50 dark:hover:bg-indigo-700/50 transition-colors"
          type="button"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}
