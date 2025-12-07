import { v4 as uuidv4 } from 'uuid';
import type { CVData } from '../../types';

export interface DataPreset {
  id: string;
  name: string;
  description: string;
  data: CVData;
}

const emptyCV: CVData = {
  personal: {
    name: '',
    email: '',
    phone: '',
    location: '',
    photo: undefined,
  },
  education: [],
  experience: [],
  skills: { hard: [], soft: [] },
  courses: [],
  languages: [],
};

const minimalCV: CVData = {
  personal: {
    name: 'Jan Kowalski',
    email: 'jan@email.pl',
    phone: '',
    location: '',
    photo: undefined,
  },
  education: [],
  experience: [
    {
      id: uuidv4(),
      company: 'Firma ABC',
      position: 'Developer',
      startDate: '2023',
      endDate: 'obecnie',
      duties: ['Programowanie'],
    },
  ],
  skills: {
    hard: [{ id: uuidv4(), name: 'JavaScript', level: 4 }],
    soft: [],
  },
  courses: [],
  languages: [],
};

const fullCV: CVData = {
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
  courses: ['AWS Cloud Practitioner', 'Scrum Master Certification', 'Advanced React Patterns'],
  languages: [
    { id: uuidv4(), name: 'Polski', level: 'Native' },
    { id: uuidv4(), name: 'Angielski', level: 'C1' },
    { id: uuidv4(), name: 'Niemiecki', level: 'B1' },
  ],
};

const longTextsCV: CVData = {
  personal: {
    name: 'María José García-Hernández Rodriguez de la Cruz',
    email: 'very.long.email.address.for.testing@subdomain.company.corporation.co.uk',
    phone: '+48 123 456 789 ext. 12345',
    location: 'Konstantynopolitańczykowianeczka, województwo małopolskie',
    photo: undefined,
  },
  education: [
    {
      id: uuidv4(),
      school: 'Uniwersytet Jagielloński w Krakowie, Wydział Matematyki i Informatyki',
      degree: 'Informatyka stosowana z elementami sztucznej inteligencji i uczenia maszynowego',
      startDate: '2015',
      endDate: '2020',
      description: 'Praca magisterska na temat zastosowania sieci neuronowych w rozpoznawaniu obrazów medycznych z wykorzystaniem transfer learning',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'International Technology Solutions and Consulting Services Sp. z o.o.',
      position: 'Senior Full-Stack Software Development Engineer',
      startDate: '01.2020',
      endDate: 'obecnie',
      duties: [
        'Projektowanie i implementacja skalowalnych rozwiązań backendowych z wykorzystaniem mikrousług i architektury event-driven',
        'Optymalizacja wydajności aplikacji frontendowych poprzez implementację lazy loading, code splitting i memoizacji',
        'Prowadzenie code review i mentoring młodszych członków zespołu w zakresie najlepszych praktyk programistycznych',
        'Współpraca z zespołem DevOps w zakresie CI/CD, konteneryzacji i orkiestracji z użyciem Kubernetes',
        'Udział w spotkaniach z klientem i zbieranie wymagań biznesowych do specyfikacji technicznej',
      ],
    },
  ],
  skills: {
    hard: Array.from({ length: 15 }, (_, i) => ({
      id: uuidv4(),
      name: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'REST API', 'WebSockets', 'Jest', 'Cypress', 'Tailwind CSS'][i],
      level: Math.floor(Math.random() * 3) + 3,
    })),
    soft: [
      'Komunikatywność i umiejętność prezentacji',
      'Praca zespołowa w środowisku międzynarodowym',
      'Rozwiązywanie złożonych problemów technicznych',
      'Zarządzanie czasem i priorytetyzacja zadań',
      'Adaptacja do zmieniających się wymagań',
    ],
  },
  courses: [
    'AWS Certified Solutions Architect - Professional',
    'Google Cloud Professional Data Engineer',
    'Certified Kubernetes Administrator (CKA)',
    'MongoDB Certified Developer Associate',
    'HashiCorp Certified Terraform Associate',
  ],
  languages: [
    { id: uuidv4(), name: 'Polski', level: 'Native (ojczysty)' },
    { id: uuidv4(), name: 'Angielski', level: 'C2 (biegły)' },
    { id: uuidv4(), name: 'Niemiecki', level: 'B2 (średniozaawansowany)' },
    { id: uuidv4(), name: 'Hiszpański', level: 'A2 (podstawowy)' },
  ],
};

const edgeCasesCV: CVData = {
  personal: {
    name: 'Test <script>alert("XSS")</script> User',
    email: 'test+special@domain.co.uk',
    phone: '☎️ +48 123-456-789',
    location: '🏠 Llanfairpwllgwyngyll',
    photo: undefined,
  },
  education: [
    {
      id: uuidv4(),
      school: 'MIT',
      degree: 'CS',
      startDate: '2020',
      endDate: '2024',
      description: '',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'A',
      position: 'B',
      startDate: '2024',
      endDate: '2024',
      duties: ['x'],
    },
  ],
  skills: {
    hard: [
      { id: uuidv4(), name: 'C++', level: 5 },
      { id: uuidv4(), name: 'C#', level: 5 },
      { id: uuidv4(), name: 'F#', level: 3 },
      { id: uuidv4(), name: '<HTML>', level: 4 },
    ],
    soft: ['Problem-solving 🧩', 'Team work 🤝'],
  },
  courses: ['Course with "quotes"', "Course with 'apostrophe'"],
  languages: [
    { id: uuidv4(), name: '日本語', level: 'N3' },
    { id: uuidv4(), name: '中文', level: 'HSK4' },
  ],
};

export const presets: DataPreset[] = [
  {
    id: 'empty',
    name: 'Empty',
    description: 'Puste CV - test pustych stanów',
    data: emptyCV,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Minimalne dane - tylko wymagane pola',
    data: minimalCV,
  },
  {
    id: 'full',
    name: 'Full',
    description: 'Kompletne CV - wszystkie sekcje',
    data: fullCV,
  },
  {
    id: 'long',
    name: 'Long Texts',
    description: 'Długie teksty - test overflow',
    data: longTextsCV,
  },
  {
    id: 'edge',
    name: 'Edge Cases',
    description: 'Przypadki graniczne - emoji, specjalne znaki',
    data: edgeCasesCV,
  },
];

export const getPreset = (id: string) => presets.find(p => p.id === id);
