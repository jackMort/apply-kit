import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { CVData, CoverLetterData, TemplateId, Education, Experience, Language } from '../types';

interface CVStore {
  // Data
  cv: CVData;
  coverLetter: CoverLetterData | null;
  selectedTemplate: TemplateId;
  currentStep: number;

  // Personal
  updatePersonal: (data: Partial<CVData['personal']>) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addDuty: (experienceId: string, duty: string) => void;
  removeDuty: (experienceId: string, index: number) => void;

  // Skills
  addSkill: (type: 'hard' | 'soft', skill: string) => void;
  removeSkill: (type: 'hard' | 'soft', skill: string) => void;

  // Courses
  addCourse: (course: string) => void;
  removeCourse: (course: string) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Template
  setTemplate: (template: TemplateId) => void;

  // Navigation
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Cover Letter
  setCoverLetter: (data: CoverLetterData | null) => void;
  updateCoverLetter: (data: Partial<CoverLetterData>) => void;

  // Reset & Demo
  reset: () => void;
  fillWithDemoData: () => void;
}

const initialCV: CVData = {
  personal: {
    name: '',
    email: '',
    phone: '',
    location: '',
    photo: undefined,
  },
  education: [],
  experience: [],
  skills: {
    hard: [],
    soft: [],
  },
  courses: [],
  languages: [],
};

const demoCV: CVData = {
  personal: {
    name: 'Anna Kowalska',
    email: 'anna.kowalska@email.pl',
    phone: '+48 123 456 789',
    location: 'Warszawa',
    photo: undefined,
  },
  education: [
    {
      id: uuidv4(),
      school: 'Uniwersytet Warszawski',
      degree: 'Informatyka, magister',
      startDate: '2018',
      endDate: '2023',
      description: 'Specjalizacja: Inżynieria oprogramowania',
    },
    {
      id: uuidv4(),
      school: 'XIV LO im. S. Staszica',
      degree: 'Profil matematyczno-fizyczny',
      startDate: '2015',
      endDate: '2018',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'Tech Solutions Sp. z o.o.',
      position: 'Frontend Developer',
      startDate: '03.2023',
      endDate: 'obecnie',
      duties: [
        'Tworzenie aplikacji webowych w React i TypeScript',
        'Współpraca z zespołem UX/UI',
        'Code review i mentoring juniorów',
      ],
    },
    {
      id: uuidv4(),
      company: 'StartUp ABC',
      position: 'Junior Developer',
      startDate: '06.2021',
      endDate: '02.2023',
      duties: [
        'Rozwój funkcjonalności e-commerce',
        'Integracja z systemami płatności',
        'Pisanie testów jednostkowych',
      ],
    },
  ],
  skills: {
    hard: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Git', 'REST API', 'Node.js'],
    soft: ['Komunikatywność', 'Praca w zespole', 'Rozwiązywanie problemów', 'Kreatywność'],
  },
  courses: [
    'AWS Cloud Practitioner',
    'Scrum Master Certification',
    'Advanced React Patterns',
  ],
  languages: [
    { id: uuidv4(), name: 'Polski', level: 'Native' },
    { id: uuidv4(), name: 'Angielski', level: 'C1' },
    { id: uuidv4(), name: 'Niemiecki', level: 'B1' },
  ],
};

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cv: initialCV,
      coverLetter: null,
      selectedTemplate: 'modern',
      currentStep: 0,

      // Personal
      updatePersonal: (data) =>
        set((state) => ({
          cv: { ...state.cv, personal: { ...state.cv.personal, ...data } },
        })),

      // Education
      addEducation: () =>
        set((state) => ({
          cv: {
            ...state.cv,
            education: [
              ...state.cv.education,
              { id: uuidv4(), school: '', degree: '', startDate: '', endDate: '', description: '' },
            ],
          },
        })),
      updateEducation: (id, data) =>
        set((state) => ({
          cv: {
            ...state.cv,
            education: state.cv.education.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            education: state.cv.education.filter((e) => e.id !== id),
          },
        })),

      // Experience
      addExperience: () =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: [
              ...state.cv.experience,
              { id: uuidv4(), company: '', position: '', startDate: '', endDate: '', duties: [] },
            ],
          },
        })),
      updateExperience: (id, data) =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: state.cv.experience.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: state.cv.experience.filter((e) => e.id !== id),
          },
        })),
      addDuty: (experienceId, duty) =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: state.cv.experience.map((e) =>
              e.id === experienceId ? { ...e, duties: [...e.duties, duty] } : e
            ),
          },
        })),
      removeDuty: (experienceId, index) =>
        set((state) => ({
          cv: {
            ...state.cv,
            experience: state.cv.experience.map((e) =>
              e.id === experienceId
                ? { ...e, duties: e.duties.filter((_, i) => i !== index) }
                : e
            ),
          },
        })),

      // Skills
      addSkill: (type, skill) =>
        set((state) => ({
          cv: {
            ...state.cv,
            skills: {
              ...state.cv.skills,
              [type]: [...state.cv.skills[type], skill],
            },
          },
        })),
      removeSkill: (type, skill) =>
        set((state) => ({
          cv: {
            ...state.cv,
            skills: {
              ...state.cv.skills,
              [type]: state.cv.skills[type].filter((s) => s !== skill),
            },
          },
        })),

      // Courses
      addCourse: (course) =>
        set((state) => ({
          cv: { ...state.cv, courses: [...state.cv.courses, course] },
        })),
      removeCourse: (course) =>
        set((state) => ({
          cv: { ...state.cv, courses: state.cv.courses.filter((c) => c !== course) },
        })),

      // Languages
      addLanguage: () =>
        set((state) => ({
          cv: {
            ...state.cv,
            languages: [...state.cv.languages, { id: uuidv4(), name: '', level: '' }],
          },
        })),
      updateLanguage: (id, data) =>
        set((state) => ({
          cv: {
            ...state.cv,
            languages: state.cv.languages.map((l) =>
              l.id === id ? { ...l, ...data } : l
            ),
          },
        })),
      removeLanguage: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            languages: state.cv.languages.filter((l) => l.id !== id),
          },
        })),

      // Template
      setTemplate: (template) => set({ selectedTemplate: template }),

      // Navigation
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

      // Cover Letter
      setCoverLetter: (data) => set({ coverLetter: data }),
      updateCoverLetter: (data) =>
        set((state) => ({
          coverLetter: state.coverLetter ? { ...state.coverLetter, ...data } : null,
        })),

      // Reset & Demo
      reset: () => set({ cv: initialCV, coverLetter: null, currentStep: 0 }),
      fillWithDemoData: () => set({
        cv: {
          ...demoCV,
          education: demoCV.education.map(e => ({ ...e, id: uuidv4() })),
          experience: demoCV.experience.map(e => ({ ...e, id: uuidv4() })),
          languages: demoCV.languages.map(l => ({ ...l, id: uuidv4() })),
        }
      }),
    }),
    {
      name: 'cv-builder-data',
    }
  )
);
