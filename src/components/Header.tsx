import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { SettingsDropdown } from './SettingsDropdown';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => navigate('/wizard/personal')} className="focus:outline-none">
          <Logo size="sm" className="md:hidden" />
          <Logo size="md" className="hidden md:flex" />
        </button>

        {/* Settings */}
        <SettingsDropdown />
      </div>
    </header>
  );
}
