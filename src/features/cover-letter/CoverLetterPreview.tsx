import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components';
import { useCVStore } from '../../store';

export function CoverLetterPreview() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { cv, coverLetter } = useCVStore();

  const handlePrint = () => {
    window.print();
  };

  if (!coverLetter) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center">
        <p className="text-gray-600">{t('coverLetter.title')}</p>
        <Button className="mt-4" onClick={() => navigate('/cover-letter')}>
          {t('coverLetter.generate')}
        </Button>
      </div>
    );
  }

  const locale = i18n.language === 'pl' ? 'pl-PL' : 'en-US';
  const today = new Date().toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      {/* Controls - hidden when printing */}
      <div className="print:hidden max-w-6xl mx-auto mb-6 flex justify-between items-center px-4">
        <Button onClick={() => navigate('/preview')} variant="secondary">
          ← {t('coverLetter.back')}
        </Button>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/cover-letter')} variant="secondary">
            {t('preview.edit')}
          </Button>
          <Button onClick={handlePrint}>
            {t('preview.print')}
          </Button>
        </div>
      </div>

      {/* Letter Preview */}
      <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none p-16">
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
  );
}
