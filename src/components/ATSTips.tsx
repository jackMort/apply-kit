import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CVData } from '../types';

interface ATSTipsProps {
  data: CVData;
}

interface Tip {
  id: string;
  type: 'success' | 'warning' | 'error';
  message: string;
}

export function ATSTips({ data }: ATSTipsProps) {
  const { t } = useTranslation();

  const tips = useMemo(() => {
    const result: Tip[] = [];

    // Check personal info
    if (!data.personal.name) {
      result.push({ id: 'name', type: 'error', message: t('ats.noName') });
    }
    if (!data.personal.email) {
      result.push({ id: 'email', type: 'error', message: t('ats.noEmail') });
    }
    if (!data.personal.phone) {
      result.push({ id: 'phone', type: 'warning', message: t('ats.noPhone') });
    }

    // Check experience
    if (data.experience.length === 0) {
      result.push({ id: 'exp', type: 'warning', message: t('ats.noExperience') });
    } else {
      const hasDescriptions = data.experience.every(exp => exp.duties.length > 0);
      if (!hasDescriptions) {
        result.push({ id: 'duties', type: 'warning', message: t('ats.noDuties') });
      }
      if (data.experience.length >= 2) {
        result.push({ id: 'expGood', type: 'success', message: t('ats.goodExperience') });
      }
    }

    // Check education
    if (data.education.length === 0) {
      result.push({ id: 'edu', type: 'warning', message: t('ats.noEducation') });
    } else {
      result.push({ id: 'eduGood', type: 'success', message: t('ats.goodEducation') });
    }

    // Check skills
    if (data.skills.hard.length < 3) {
      result.push({ id: 'skills', type: 'warning', message: t('ats.fewSkills') });
    } else if (data.skills.hard.length >= 5) {
      result.push({ id: 'skillsGood', type: 'success', message: t('ats.goodSkills') });
    }

    // Check if skills have good levels
    const avgLevel = data.skills.hard.length > 0
      ? data.skills.hard.reduce((sum, s) => sum + s.level, 0) / data.skills.hard.length
      : 0;
    if (avgLevel >= 4) {
      result.push({ id: 'skillLevels', type: 'success', message: t('ats.goodSkillLevels') });
    }

    // Check languages
    if (data.languages.length > 0) {
      result.push({ id: 'langGood', type: 'success', message: t('ats.goodLanguages') });
    }

    return result;
  }, [data, t]);

  const score = useMemo(() => {
    const successCount = tips.filter(t => t.type === 'success').length;
    const warningCount = tips.filter(t => t.type === 'warning').length;
    const errorCount = tips.filter(t => t.type === 'error').length;

    const maxScore = 100;
    const deduction = (errorCount * 20) + (warningCount * 10);
    const bonus = successCount * 5;

    return Math.max(0, Math.min(100, maxScore - deduction + bonus));
  }, [tips]);

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t('ats.title')}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">/100</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getScoreBg()}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Tips list */}
      <div className="space-y-2">
        {tips.map(tip => (
          <div
            key={tip.id}
            className={`flex items-start gap-2 text-sm p-2 rounded-lg ${
              tip.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
              tip.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
              'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {tip.type === 'success' && (
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {tip.type === 'warning' && (
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {tip.type === 'error' && (
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{tip.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
