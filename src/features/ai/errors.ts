export type AIErrorType =
  | 'INVALID_API_KEY'
  | 'RATE_LIMITED'
  | 'QUOTA_EXCEEDED'
  | 'NETWORK_ERROR'
  | 'SERVICE_ERROR';

export class AIError extends Error {
  type: AIErrorType;
  retryable: boolean;

  constructor(type: AIErrorType, message?: string) {
    super(message || type);
    this.name = 'AIError';
    this.type = type;
    this.retryable = isRetryable(type);
  }
}

export function isRetryable(type: AIErrorType): boolean {
  return type === 'NETWORK_ERROR' || type === 'SERVICE_ERROR';
}

export function classifyError(err: unknown): AIErrorType {
  // Handle AIError passthrough
  if (err instanceof AIError) {
    return err.type;
  }

  const error = err as Error & {
    status?: number;
    code?: string;
    message?: string;
  };

  // Network errors (fetch failures, timeouts)
  if (error.name === 'TypeError' && error.message?.includes('fetch')) {
    return 'NETWORK_ERROR';
  }
  if (error.name === 'AbortError' || error.code === 'ETIMEDOUT') {
    return 'NETWORK_ERROR';
  }
  if (error.message?.toLowerCase().includes('network')) {
    return 'NETWORK_ERROR';
  }

  // HTTP status-based errors
  const status = error.status;
  if (status === 401) {
    return 'INVALID_API_KEY';
  }
  if (status === 429) {
    const msg = error.message?.toLowerCase() || '';
    if (msg.includes('quota') || msg.includes('billing') || msg.includes('exceeded')) {
      return 'QUOTA_EXCEEDED';
    }
    return 'RATE_LIMITED';
  }
  if (status && status >= 500) {
    return 'SERVICE_ERROR';
  }

  // Default to service error for unknown cases
  return 'SERVICE_ERROR';
}

export const RETRY_CONFIG = {
  maxRetries: 1,
  delayMs: 1000,
};

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
