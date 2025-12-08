import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import type { CVData } from '../../types';
import { Button, TextArea } from '../../components';
import { hasApiKey } from './useAI';
import { AIError } from './errors';
import {
  jobMatchSystemPrompt,
  analyzeJobMatchPrompt,
  parseJobMatchResponse,
  type JobMatchResult,
} from './prompts/jobMatch';

interface JobMatchModalProps {
  onClose: () => void;
  cv: CVData;
  generate: (systemPrompt: string, userPrompt: string) => Promise<string>;
  isLoading: boolean;
  onNeedApiKey: () => void;
}

export function JobMatchModal({ onClose, cv, generate, isLoading, onNeedApiKey }: JobMatchModalProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    if (!hasApiKey()) {
      onNeedApiKey();
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await generate(
        jobMatchSystemPrompt(i18n.language),
        analyzeJobMatchPrompt(cv, jobDescription)
      );
      const parsed = parseJobMatchResponse(response);
      setResult(parsed);
    } catch (err) {
      if (err instanceof AIError) {
        if (err.type === 'INVALID_API_KEY') {
          onNeedApiKey();
        } else {
          toast.error(t(`ai.errors.${err.type}`, err.message));
        }
      } else {
        toast.error(t('ai.errors.SERVICE_ERROR', 'Analysis failed'));
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSuggestionClick = (section: string) => {
    const routes: Record<string, string> = {
      skills: '/wizard/skills',
      experience: '/wizard/experience',
      education: '/wizard/education',
      courses: '/wizard/courses',
    };
    if (routes[section]) {
      onClose();
      navigate(routes[section]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {t('ai.jobMatch', 'Job Match Analysis')}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('ai.jobMatchDesc', 'See how well your CV matches a job posting')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!result ? (
            <>
              <TextArea
                label={t('ai.pasteJob', 'Paste job description')}
                placeholder={t('ai.pasteJobPlaceholder', 'Paste the job posting text here...')}
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </>
          ) : (
            <div className="space-y-6">
              {/* Score */}
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}%
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {t('ai.matchScore', 'Match Score')}
                </p>
                <div className="mt-3 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getScoreBg(result.score)}`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              {/* Matches */}
              {result.matches.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-medium text-green-700 dark:text-green-300 mb-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t('ai.strongMatches', 'Strong Matches')}
                  </h4>
                  <ul className="space-y-2">
                    {result.matches.map((match, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-green-500 mt-0.5">+</span>
                        <span><strong>{match.skill}</strong> - {match.context}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gaps */}
              {result.gaps.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {t('ai.gaps', 'Gaps to Address')}
                  </h4>
                  <ul className="space-y-2">
                    {result.gaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className={`mt-0.5 ${
                          gap.importance === 'high' ? 'text-red-500' :
                          gap.importance === 'medium' ? 'text-yellow-500' : 'text-slate-400'
                        }`}>!</span>
                        <span>{gap.requirement}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          gap.importance === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                          gap.importance === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {gap.importance}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {t('ai.suggestions', 'Suggestions')}
                  </h4>
                  <ul className="space-y-2">
                    {result.suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion.section)}
                        className="flex items-center justify-between gap-2 text-sm text-slate-600 dark:text-slate-300 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer group"
                      >
                        <span>{suggestion.action}</span>
                        <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50">
                          {suggestion.section} →
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-between flex-shrink-0">
          <div>
            {result && (
              <Button
                variant="ghost"
                onClick={() => {
                  setResult(null);
                  setJobDescription('');
                }}
              >
                {t('ai.newAnalysis', 'New analysis')}
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>
              {t('common.cancel', 'Close')}
            </Button>
            {!result && (
              <Button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || isAnalyzing || isLoading}
              >
                {isAnalyzing ? t('ai.analyzing', 'Analyzing...') : t('ai.analyze', 'Analyze')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
