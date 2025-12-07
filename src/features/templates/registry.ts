import type { CVData } from '../../types';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';

export interface TemplateMeta {
  id: string;
  name: string;
  nameKey: string;
  descKey: string;
  color: string;
  component: React.ComponentType<{ data: CVData }>;
}

export const templates: TemplateMeta[] = [
  {
    id: 'modern',
    name: 'Modern',
    nameKey: 'template.modern',
    descKey: 'template.modernDesc',
    color: 'bg-teal-500',
    component: ModernTemplate,
  },
  {
    id: 'classic',
    name: 'Classic',
    nameKey: 'template.classic',
    descKey: 'template.classicDesc',
    color: 'bg-gray-700',
    component: ClassicTemplate,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    nameKey: 'template.minimal',
    descKey: 'template.minimalDesc',
    color: 'bg-gray-400',
    component: MinimalTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    nameKey: 'template.creative',
    descKey: 'template.creativeDesc',
    color: 'bg-purple-500',
    component: CreativeTemplate,
  },
  {
    id: 'professional',
    name: 'Professional',
    nameKey: 'template.professional',
    descKey: 'template.professionalDesc',
    color: 'bg-blue-900',
    component: ProfessionalTemplate,
  },
];

export const getTemplate = (id: string): TemplateMeta | undefined =>
  templates.find(t => t.id === id);

export const getTemplateComponent = (id: string) =>
  getTemplate(id)?.component ?? ModernTemplate;

export const getTemplateIds = () => templates.map(t => t.id);
