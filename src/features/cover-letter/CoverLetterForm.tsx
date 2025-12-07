import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, TextArea, Card } from '../../components';
import { useCVStore } from '../../store';

interface CoverLetterFormProps {
  onPreview: () => void;
  onBack: () => void;
}

export function CoverLetterForm({ onPreview, onBack }: CoverLetterFormProps) {
  const { t, i18n } = useTranslation();
  const { cv, coverLetter, setCoverLetter, updateCoverLetter } = useCVStore();
  const [position, setPosition] = useState(coverLetter?.position || '');
  const [company, setCompany] = useState(coverLetter?.company || '');
  const [jobDescription, setJobDescription] = useState(coverLetter?.jobDescription || '');
  const [content, setContent] = useState(coverLetter?.content || '');

  const generateTemplate = () => {
    const name = cv.personal.name || 'Name';
    const experience = cv.experience[0];
    const skills = [...cv.skills.hard, ...cv.skills.soft].slice(0, 5).join(', ');
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
    if (!coverLetter) {
      setCoverLetter({
        position,
        company,
        jobDescription,
        content,
      });
    } else {
      updateCoverLetter({
        position,
        company,
        jobDescription,
        content,
      });
    }
    onPreview();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t('coverLetter.title')}
            </h2>
            <p className="text-gray-600 text-sm">
              {t('coverLetter.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            rows={4}
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
            rows={16}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={onBack}>
              ← {t('coverLetter.back')}
            </Button>
            <Button onClick={handleSave} disabled={!content.trim()}>
              {t('coverLetter.preview')} →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
