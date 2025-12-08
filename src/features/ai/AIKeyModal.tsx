import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../components';
import { validateApiKey, setStoredApiKey, getStoredApiKey, removeStoredApiKey } from './useAI';

interface AIKeyModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function AIKeyModal({ onClose, onSuccess }: AIKeyModalProps) {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasExistingKey = !!getStoredApiKey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    setError(null);

    const isValid = await validateApiKey(apiKey.trim());

    if (isValid) {
      setStoredApiKey(apiKey.trim());
      onSuccess?.();
      onClose();
    } else {
      setError(t('ai.invalidKey', 'Invalid API key. Please check and try again.'));
    }

    setIsValidating(false);
  };

  const handleRemoveKey = () => {
    removeStoredApiKey();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {t('ai.settings', 'AI Settings')}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('ai.settingsDesc', 'Configure your OpenAI API key')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {hasExistingKey ? (
            <div className="flex items-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-green-700 dark:text-green-300">
                {t('ai.connected', 'API key configured')}
              </span>
            </div>
          ) : null}

          <div>
            <Input
              label={hasExistingKey ? t('ai.newKey', 'New API Key') : t('ai.apiKey', 'OpenAI API Key')}
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoComplete="off"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('ai.keyInfo', 'Your API key is stored locally in your browser. We never send it to our servers.')}
            {' '}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {t('ai.getKey', 'Get your API key')}
            </a>
          </p>
        </form>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
          <div>
            {hasExistingKey && (
              <Button variant="ghost" onClick={handleRemoveKey} className="text-red-600 dark:text-red-400">
                {t('ai.removeKey', 'Remove key')}
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button onClick={handleSubmit} disabled={!apiKey.trim() || isValidating}>
              {isValidating ? t('ai.validating', 'Validating...') : t('common.save', 'Save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
