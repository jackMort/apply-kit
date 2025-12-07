import { useTranslation } from 'react-i18next';
import { Button, Card } from '../../components';
import { useCVStore } from '../../store';
import {
  ModernTemplate,
  ClassicTemplate,
  MinimalTemplate,
  CreativeTemplate,
  ProfessionalTemplate,
} from '../templates';
import type { CVData } from '../../types';

interface PreviewProps {
  onEdit: () => void;
  onCoverLetter: () => void;
}

const templates: Record<string, React.ComponentType<{ data: CVData }>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
};

export function Preview({ onEdit, onCoverLetter }: PreviewProps) {
  const { t } = useTranslation();
  const { cv, selectedTemplate } = useCVStore();

  const handlePrint = () => {
    window.print();
  };

  const TemplateComponent = templates[selectedTemplate] || ModernTemplate;

  return (
    <div>
      {/* Controls - hidden when printing */}
      <div className="print:hidden max-w-6xl mx-auto mb-8 px-4 sm:px-6">
        <Card variant="elevated" className="!p-4">
          <div className="flex justify-between items-center">
            <Button onClick={onEdit} variant="secondary">
              ← {t('preview.edit')}
            </Button>
            <div className="flex gap-3">
              <Button onClick={onCoverLetter} variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('preview.coverLetter')}
              </Button>
              <Button onClick={handlePrint}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                {t('preview.print')}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* CV Preview */}
      <div className="print:m-0">
        <TemplateComponent data={cv} />
      </div>
    </div>
  );
}
