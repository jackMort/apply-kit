import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  WizardLayout,
  PersonalStep,
  EducationStep,
  ExperienceStep,
  SkillsStep,
  CoursesLanguagesStep,
} from './features/wizard';
import { Preview } from './features/preview';
import { CoverLetterForm, CoverLetterPreview } from './features/cover-letter';
import { Playground } from './features/playground';
import { Header } from './components';

const isDev = import.meta.env.DEV;

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 print:bg-white">
        {/* Header - hidden when printing */}
        <Header />

        {/* Main content */}
        <main className="py-4 md:py-10 print:py-0">
          <Routes>
            <Route path="/" element={<Navigate to="/wizard/personal" replace />} />
            <Route path="/wizard" element={<WizardLayout />}>
              <Route index element={<Navigate to="personal" replace />} />
              <Route path="personal" element={<PersonalStep />} />
              <Route path="education" element={<EducationStep />} />
              <Route path="experience" element={<ExperienceStep />} />
              <Route path="skills" element={<SkillsStep />} />
              <Route path="courses" element={<CoursesLanguagesStep />} />
            </Route>
            <Route path="/preview" element={<Preview />} />
            <Route path="/cover-letter" element={<CoverLetterForm />} />
            <Route path="/cover-letter/preview" element={<CoverLetterPreview />} />
            {isDev && <Route path="/playground" element={<Playground />} />}
            <Route path="*" element={<Navigate to="/wizard/personal" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
