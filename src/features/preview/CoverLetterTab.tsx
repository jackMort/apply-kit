import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, TextArea } from '../../components';
import { useCVStore } from '../../store';

export function CoverLetterTab() {
  const { t, i18n } = useTranslation();
  const { cv, coverLetter, setCoverLetter, updateCoverLetter } = useCVStore();

  const [isEditing, setIsEditing] = useState(!coverLetter?.content);
  const [position, setPosition] = useState(coverLetter?.position || '');
  const [company, setCompany] = useState(coverLetter?.company || '');
  const [jobDescription, setJobDescription] = useState(coverLetter?.jobDescription || '');
  const [content, setContent] = useState(coverLetter?.content || '');

  const generateTemplate = () => {
    const name = cv.personal.name || 'Name';
    const experience = cv.experience[0];
    const skills = [...cv.skills.hard.map(s => s.name), ...cv.skills.soft].slice(0, 5).join(', ');
    const education = cv.education[0];

    const isPL = i18n.language === 'pl';

    const template = isPL
      ? `Szanowni Państwo,

Z dużym zainteresowaniem zapoznałam/em się z ofertą pracy na stanowisko ${position || '[stanowisko]'}${company ? ` w firmie ${company}` : ''}.

${experience ? `Obecnie pracuję jako ${experience.position} w ${experience.company}.` : ''}

${education ? `Moje wykształcenie – ${education.degree} z ${education.school} – stanowi solidną podstawę dla mojej pracy.` : ''}

${skills ? `Do moich kluczowych umiejętności należą: ${skills}.` : ''}

Chętnie przedstawię swoją kandydaturę podczas rozmowy kwalifikacyjnej.

Z poważaniem,
${name}`
      : `Dear Hiring Manager,

I am writing to express my interest in the ${position || '[position]'} position${company ? ` at ${company}` : ''}.

${experience ? `I currently work as ${experience.position} at ${experience.company}.` : ''}

${education ? `My education – ${education.degree} from ${education.school} – provides a solid foundation for my work.` : ''}

${skills ? `My key skills include: ${skills}.` : ''}

I would welcome the opportunity to discuss my candidacy further.

Best regards,
${name}`;

    setContent(template);
  };

  const handleSave = () => {
    const data = { position, company, jobDescription, content };
    if (!coverLetter) {
      setCoverLetter(data);
    } else {
      updateCoverLetter(data);
    }
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const locale = i18n.language === 'pl' ? 'pl-PL' : 'en-US';
  const today = new Date().toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Form View
  if (isEditing || !coverLetter?.content) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
              {t('coverLetter.title')}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t('coverLetter.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t('coverLetter.position')}
              placeholder="..."
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Input
              label={t('coverLetter.company')}
              placeholder="..."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <TextArea
            label={t('coverLetter.jobDescription')}
            placeholder="..."
            rows={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <div className="flex justify-end">
            <Button variant="secondary" onClick={generateTemplate}>
              {t('coverLetter.generate')}
            </Button>
          </div>

          <TextArea
            label={t('coverLetter.content')}
            placeholder="..."
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4">
            {coverLetter?.content && (
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                {t('common.cancel')}
              </Button>
            )}
            <Button onClick={handleSave} disabled={!content.trim()}>
              {t('coverLetter.preview')} →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Preview View
  return (
    <div>
      {/* Action buttons */}
      <div className="flex justify-center gap-3 mb-6">
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {t('preview.edit')}
        </Button>
        <Button onClick={handlePrint}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          {t('preview.printLetter', 'Print letter')}
        </Button>
      </div>

      {/* Letter Preview */}
      <div className="flex justify-center">
        <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg print:shadow-none p-16">
          {/* Sender info */}
          <div className="text-right text-gray-600 text-sm mb-8">
            <p className="font-medium text-gray-900">{cv.personal.name}</p>
            {cv.personal.email && <p>{cv.personal.email}</p>}
            {cv.personal.phone && <p>{cv.personal.phone}</p>}
            {cv.personal.location && <p>{cv.personal.location}</p>}
          </div>

          {/* Date and recipient */}
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-4">{cv.personal.location}, {today}</p>
            {coverLetter.company && (
              <p className="font-medium text-gray-900">{coverLetter.company}</p>
            )}
          </div>

          {/* Subject */}
          <div className="mb-6">
            <p className="text-gray-700">
              <span className="font-medium">{t('coverLetter.regarding')}:</span> {t('coverLetter.application')} {coverLetter.position}
            </p>
          </div>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {coverLetter.content}
          </div>
        </div>
      </div>
    </div>
  );
}
