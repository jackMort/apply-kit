import type { CVData } from '../../types';

interface ProfessionalTemplateProps {
  data: CVData;
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none">
      <div className="grid grid-cols-[220px_1fr] min-h-[297mm]">
        {/* Sidebar */}
        <aside className="bg-slate-900 text-white p-6">
          {/* Photo */}
          {data.personal.photo && (
            <div className="mb-6">
              <img
                src={data.personal.photo}
                alt="Zdjęcie"
                className="w-full aspect-square rounded object-cover"
              />
            </div>
          )}

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4 border-b border-slate-700 pb-2">
              Kontakt
            </h2>
            <div className="space-y-3 text-sm">
              {data.personal.email && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="break-all text-slate-300">{data.personal.email}</span>
                </div>
              )}
              {data.personal.phone && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-slate-300">{data.personal.phone}</span>
                </div>
              )}
              {data.personal.location && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-300">{data.personal.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {data.skills.hard.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4 border-b border-slate-700 pb-2">
                Umiejętności
              </h2>
              <div className="space-y-2">
                {data.skills.hard.map((skill) => (
                  <div key={skill} className="text-sm text-slate-300">{skill}</div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4 border-b border-slate-700 pb-2">
                Języki
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="text-slate-300">{lang.name}</span>
                    <span className="text-slate-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Courses */}
          {data.courses.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4 border-b border-slate-700 pb-2">
                Certyfikaty
              </h2>
              <div className="space-y-2 text-sm text-slate-300">
                {data.courses.map((course) => (
                  <div key={course}>{course}</div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="p-8">
          {/* Header */}
          <header className="mb-8 pb-6 border-b-2 border-blue-600">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {data.personal.name || 'Imię i Nazwisko'}
            </h1>
            <p className="text-xl text-blue-600 font-medium">
              {data.experience[0]?.position || 'Stanowisko'}
            </p>
          </header>

          {/* Profile */}
          {data.skills.soft.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-600"></span>
                Profil
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {data.skills.soft.join('. ')}.
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-600"></span>
                Doświadczenie zawodowe
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-sm text-blue-600 font-medium">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-500 mb-2">{exp.company}</p>
                    {exp.duties.length > 0 && (
                      <ul className="text-sm text-slate-600 space-y-1">
                        {exp.duties.map((duty, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1.5">•</span>
                            {duty}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-600"></span>
                Wykształcenie
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-sm text-blue-600 font-medium">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                    <p className="text-slate-500">{edu.school}</p>
                    {edu.description && (
                      <p className="text-sm text-slate-600 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
