import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { CVData } from '../types';

interface ATSTipsProps {
  data: CVData;
}

interface Tip {
  id: string;
  type: 'success' | 'warning' | 'error';
  message: string;
  step?: string;
}

export function ATSTips({ data }: ATSTipsProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    error: true,
    warning: true,
    success: false,
  });

  const tips = useMemo(() => {
    const result: Tip[] = [];

    // Personal info
    if (!data.personal.name) {
      result.push({ id: 'name', type: 'error', message: t('ats.noName'), step: '/wizard/personal' });
    }
    if (!data.personal.email) {
      result.push({ id: 'email', type: 'error', message: t('ats.noEmail'), step: '/wizard/personal' });
    }
    if (!data.personal.phone) {
      result.push({ id: 'phone', type: 'warning', message: t('ats.noPhone'), step: '/wizard/personal' });
    }
    if (!data.personal.photo) {
      result.push({ id: 'photo', type: 'warning', message: t('ats.noPhoto'), step: '/wizard/personal' });
    }
    if (!data.personal.location) {
      result.push({ id: 'location', type: 'warning', message: t('ats.noLocation'), step: '/wizard/personal' });
    }

    // Personal success
    if (data.personal.name && data.personal.email && data.personal.phone) {
      result.push({ id: 'nameGood', type: 'success', message: t('ats.goodName') });
    }
    if (data.personal.photo) {
      result.push({ id: 'photoGood', type: 'success', message: t('ats.goodPhoto') });
    }

    // Experience
    if (data.experience.length === 0) {
      result.push({ id: 'exp', type: 'warning', message: t('ats.noExperience'), step: '/wizard/experience' });
    } else {
      const hasDescriptions = data.experience.every(exp => exp.duties.length > 0);
      const hasDates = data.experience.every(exp => exp.startDate && exp.endDate);

      if (!hasDescriptions) {
        result.push({ id: 'duties', type: 'warning', message: t('ats.noDuties'), step: '/wizard/experience' });
      } else {
        result.push({ id: 'dutiesGood', type: 'success', message: t('ats.goodDuties') });
      }

      if (!hasDates) {
        result.push({ id: 'dates', type: 'warning', message: t('ats.noDates'), step: '/wizard/experience' });
      }

      if (data.experience.length >= 2) {
        result.push({ id: 'expGood', type: 'success', message: t('ats.goodExperience') });
      }
    }

    // Education
    if (data.education.length === 0) {
      result.push({ id: 'edu', type: 'warning', message: t('ats.noEducation'), step: '/wizard/education' });
    } else {
      result.push({ id: 'eduGood', type: 'success', message: t('ats.goodEducation') });
    }

    // Skills
    if (data.skills.hard.length < 5) {
      result.push({ id: 'skills', type: 'warning', message: t('ats.fewSkills'), step: '/wizard/skills' });
    } else {
      result.push({ id: 'skillsGood', type: 'success', message: t('ats.goodSkills') });
    }

    if (data.skills.soft.length === 0) {
      result.push({ id: 'softSkills', type: 'warning', message: t('ats.noSoftSkills'), step: '/wizard/skills' });
    } else {
      result.push({ id: 'softSkillsGood', type: 'success', message: t('ats.goodSoftSkills') });
    }

    // Languages
    if (data.languages.length === 0) {
      result.push({ id: 'lang', type: 'warning', message: t('ats.noLanguages'), step: '/wizard/courses' });
    } else {
      result.push({ id: 'langGood', type: 'success', message: t('ats.goodLanguages') });
    }

    // Courses
    if (data.courses.length === 0) {
      result.push({ id: 'courses', type: 'warning', message: t('ats.noCourses'), step: '/wizard/courses' });
    } else {
      result.push({ id: 'coursesGood', type: 'success', message: t('ats.goodCourses') });
    }

    return result;
  }, [data, t]);

  const score = useMemo(() => {
    let score = 100;

    // Errors: -20 each
    if (!data.personal.name) score -= 20;
    if (!data.personal.email) score -= 20;

    // Warnings: -5 to -10 each
    if (!data.personal.phone) score -= 10;
    if (!data.personal.photo) score -= 5;
    if (!data.personal.location) score -= 5;
    if (data.experience.length === 0) score -= 15;
    else {
      const hasDescriptions = data.experience.every(exp => exp.duties.length > 0);
      if (!hasDescriptions) score -= 10;
    }
    if (data.education.length === 0) score -= 10;
    if (data.skills.hard.length < 5) score -= 10;
    if (data.skills.soft.length === 0) score -= 5;
    if (data.languages.length === 0) score -= 5;
    if (data.courses.length === 0) score -= 5;

    return Math.max(0, Math.min(100, score));
  }, [data]);

  const errors = tips.filter(t => t.type === 'error');
  const warnings = tips.filter(t => t.type === 'warning');
  const successes = tips.filter(t => t.type === 'success');

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

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

  const handleTipClick = (tip: Tip) => {
    if (tip.step && tip.type !== 'success') {
      navigate(tip.step);
    }
  };

  const renderTipGroup = (
    tips: Tip[],
    type: 'error' | 'warning' | 'success',
    label: string,
    icon: React.ReactNode,
    bgColor: string,
    textColor: string
  ) => {
    if (tips.length === 0) return null;

    const isExpanded = expandedGroups[type];

    return (
      <div className="overflow-hidden">
        <button
          onClick={() => toggleGroup(type)}
          className={`w-full flex items-center justify-between px-3 py-2 ${bgColor} transition-colors`}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className={`text-sm font-medium ${textColor}`}>
              {label} ({tips.length})
            </span>
          </div>
          <svg
            className={`w-4 h-4 ${textColor} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div className="space-y-1 p-2">
            {tips.map(tip => (
              <div
                key={tip.id}
                onClick={() => handleTipClick(tip)}
                className={`
                  flex items-center justify-between gap-2 text-sm px-3 py-2 rounded-lg
                  ${tip.step && tip.type !== 'success' ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700' : ''}
                  ${textColor}
                `}
              >
                <span>{tip.message}</span>
                {tip.step && tip.type !== 'success' && (
                  <svg className="w-4 h-4 opacity-50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header with score */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t('ats.title')}</h3>
          <div className="flex items-center gap-1">
            <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">/100</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getScoreBg()}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Grouped tips */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {renderTipGroup(
          errors,
          'error',
          t('ats.errors'),
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>,
          'bg-red-50 dark:bg-red-900/20',
          'text-red-700 dark:text-red-300'
        )}

        {renderTipGroup(
          warnings,
          'warning',
          t('ats.warnings'),
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>,
          'bg-yellow-50 dark:bg-yellow-900/20',
          'text-yellow-700 dark:text-yellow-300'
        )}

        {renderTipGroup(
          successes,
          'success',
          t('ats.success'),
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>,
          'bg-green-50 dark:bg-green-900/20',
          'text-green-700 dark:text-green-300'
        )}
      </div>
    </div>
  );
}
