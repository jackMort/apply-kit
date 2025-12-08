import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import { AIError, classifyError, isRetryable, RETRY_CONFIG, delay } from './errors';

const STORAGE_KEY = 'cv-builder-openai-key';

// Simple obfuscation (not security, just prevents casual viewing)
const obfuscate = (str: string): string => {
  const salt = 'cv-builder-2024';
  return btoa(str.split('').map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ salt.charCodeAt(i % salt.length))
  ).join(''));
};

const deobfuscate = (str: string): string => {
  const salt = 'cv-builder-2024';
  try {
    const decoded = atob(str);
    return decoded.split('').map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ salt.charCodeAt(i % salt.length))
    ).join('');
  } catch {
    return '';
  }
};

export const getStoredApiKey = (): string | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  return deobfuscate(stored);
};

export const setStoredApiKey = (key: string): void => {
  localStorage.setItem(STORAGE_KEY, obfuscate(key));
};

export const removeStoredApiKey = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const hasApiKey = (): boolean => {
  return !!getStoredApiKey();
};

interface UseAIOptions {
  model?: 'gpt-4o' | 'gpt-4o-mini';
}

interface UseAIReturn {
  generate: (systemPrompt: string, userPrompt: string) => Promise<string>;
  isLoading: boolean;
  error: AIError | null;
  clearError: () => void;
}

export function useAI(options: UseAIOptions = {}): UseAIReturn {
  const { model = 'gpt-4o-mini' } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AIError | null>(null);

  const generate = useCallback(async (systemPrompt: string, userPrompt: string): Promise<string> => {
    const apiKey = getStoredApiKey();
    if (!apiKey) {
      const err = new AIError('INVALID_API_KEY', 'No API key configured');
      setError(err);
      throw err;
    }

    setIsLoading(true);
    setError(null);

    let lastError: AIError | null = null;
    let attempts = 0;
    const maxAttempts = RETRY_CONFIG.maxRetries + 1;

    while (attempts < maxAttempts) {
      try {
        const client = new OpenAI({
          apiKey,
          dangerouslyAllowBrowser: true,
          maxRetries: 0,
        });

        const response = await client.chat.completions.create({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new Error('Empty response from AI');
        }

        setIsLoading(false);
        return content;
      } catch (err) {
        const errorType = classifyError(err);
        lastError = new AIError(errorType, (err as Error).message);

        attempts++;

        // Only retry for retryable errors and if we have attempts left
        if (isRetryable(errorType) && attempts < maxAttempts) {
          await delay(RETRY_CONFIG.delayMs);
          continue;
        }

        // No more retries or non-retryable error
        break;
      }
    }

    // All attempts failed
    setIsLoading(false);
    if (lastError) {
      setError(lastError);
      throw lastError;
    }

    // Fallback (shouldn't reach here)
    const fallbackError = new AIError('SERVICE_ERROR', 'Unknown error');
    setError(fallbackError);
    throw fallbackError;
  }, [model]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { generate, isLoading, error, clearError };
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
      maxRetries: 0,
    });

    // Use a minimal completion call to validate - models.list has CORS issues
    await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 1,
    });
    return true;
  } catch {
    return false;
  }
}
