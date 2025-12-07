export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  location: string;
  photo?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  duties: string[];
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface CVData {
  personal: PersonalData;
  education: Education[];
  experience: Experience[];
  skills: {
    hard: Skill[];
    soft: string[];
  };
  courses: string[];
  languages: Language[];
}

export interface CoverLetterData {
  position: string;
  company?: string;
  jobDescription?: string;
  content: string;
}

export interface ExportData {
  version: string;
  exportedAt: string;
  cv: CVData;
  coverLetter?: CoverLetterData;
  selectedTemplate: string;
  language: string;
}

export type TemplateId = 'modern' | 'classic' | 'minimal' | 'creative' | 'professional';

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
}
