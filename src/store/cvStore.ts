import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { CVData, CoverLetterData, TemplateId, Education, Experience, Language, Skill } from '../types';

interface CVStore {
  // Data
  cv: CVData;
  coverLetter: CoverLetterData | null;
  selectedTemplate: TemplateId;

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
  addHardSkill: (name: string) => void;
  updateHardSkill: (id: string, data: Partial<Skill>) => void;
  removeHardSkill: (id: string) => void;
  addSoftSkill: (skill: string) => void;
  removeSoftSkill: (skill: string) => void;

  // Courses
  addCourse: (course: string) => void;
  removeCourse: (course: string) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Template
  setTemplate: (template: TemplateId) => void;

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
    hard: [
      { id: uuidv4(), name: 'React', level: 5 },
      { id: uuidv4(), name: 'TypeScript', level: 4 },
      { id: uuidv4(), name: 'JavaScript', level: 5 },
      { id: uuidv4(), name: 'HTML/CSS', level: 5 },
      { id: uuidv4(), name: 'Git', level: 4 },
      { id: uuidv4(), name: 'REST API', level: 4 },
      { id: uuidv4(), name: 'Node.js', level: 3 },
    ],
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
      addHardSkill: (name) =>
        set((state) => ({
          cv: {
            ...state.cv,
            skills: {
              ...state.cv.skills,
              hard: [...state.cv.skills.hard, { id: uuidv4(), name, level: 3 }],
            },
          },
        })),
      updateHardSkill: (id, data) =>
        set((state) => ({
          cv: {
            ...state.cv,
            skills: {
              ...state.cv.skills,
              hard: state.cv.skills.hard.map((s) =>
                s.id === id ? { ...s, ...data } : s
              ),
            },
          },
        })),
      removeHardSkill: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            skills: {
              ...state.cv.skills,
              hard: state.cv.skills.hard.filter((s) => s.id !== id),
            },
          },
        })),
      addSoftSkill: (skill) =>
        set((state) => ({
          cv: {
            ...state.cv,
            skills: {
              ...state.cv.skills,
              soft: [...state.cv.skills.soft, skill],
            },
          },
        })),
      removeSoftSkill: (skill) =>
        set((state) => ({
          cv: {
            ...state.cv,
            skills: {
              ...state.cv.skills,
              soft: state.cv.skills.soft.filter((s) => s !== skill),
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

      // Cover Letter
      setCoverLetter: (data) => set({ coverLetter: data }),
      updateCoverLetter: (data) =>
        set((state) => ({
          coverLetter: state.coverLetter ? { ...state.coverLetter, ...data } : null,
        })),

      // Reset & Demo
      reset: () => set({ cv: initialCV, coverLetter: null }),
      fillWithDemoData: () => set({
        cv: {
          ...demoCV,
          education: demoCV.education.map(e => ({ ...e, id: uuidv4() })),
          experience: demoCV.experience.map(e => ({ ...e, id: uuidv4() })),
          skills: {
            hard: demoCV.skills.hard.map(s => ({ ...s, id: uuidv4() })),
            soft: [...demoCV.skills.soft],
          },
          languages: demoCV.languages.map(l => ({ ...l, id: uuidv4() })),
        }
      }),
    }),
    {
      name: 'cv-builder-data',
    }
  )
);
