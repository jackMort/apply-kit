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
            ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100'
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
        }
      `}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 p-0.5 rounded-full hover:bg-indigo-200/50 transition-colors"
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
