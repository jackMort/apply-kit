import type { CVData } from '../../types';

interface ModernTemplateProps {
  data: CVData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none">
      <div className="grid grid-cols-[1fr_65mm] min-h-[297mm]">
        {/* Main Content */}
        <main className="p-8">
          {/* Header */}
          <header className="mb-6 pb-4 border-b-2 border-teal-500">
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              {data.personal.name || 'Imię i Nazwisko'}
            </h1>
            <p className="text-teal-600 font-medium">
              {data.experience[0]?.position || 'Stanowisko'}
            </p>
          </header>

          {/* Profile */}
          {data.skills.soft.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-600 mb-3 flex items-center gap-2">
                Profil
                <span className="flex-1 h-px bg-gray-200" />
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {data.skills.soft.join(', ')}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-600 mb-3 flex items-center gap-2">
                Doświadczenie
                <span className="flex-1 h-px bg-gray-200" />
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-teal-500 rounded-full" />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p className="text-teal-700 text-sm mb-2">{exp.company}</p>
                    {exp.duties.length > 0 && (
                      <ul className="text-sm text-gray-600 space-y-1">
                        {exp.duties.map((duty, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-teal-500 mt-1">•</span>
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
            <section className="mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-600 mb-3 flex items-center gap-2">
                Wykształcenie
                <span className="flex-1 h-px bg-gray-200" />
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l-2 border-gray-200">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-teal-500 rounded-full" />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                    <p className="text-teal-700 text-sm">{edu.school}</p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="bg-gray-800 text-white p-6">
          {/* Photo */}
          {data.personal.photo && (
            <div className="mb-6">
              <img
                src={data.personal.photo}
                alt="Zdjęcie"
                className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-teal-500"
              />
            </div>
          )}

          {/* Contact */}
          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-3">
              Kontakt
            </h2>
            <div className="space-y-2 text-sm">
              {data.personal.email && (
                <p className="break-all">{data.personal.email}</p>
              )}
              {data.personal.phone && <p>{data.personal.phone}</p>}
              {data.personal.location && <p>{data.personal.location}</p>}
            </div>
          </section>

          {/* Skills */}
          {data.skills.hard.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-3">
                Umiejętności
              </h2>
              <div className="space-y-2">
                {data.skills.hard.map((skill) => (
                  <div key={skill} className="text-sm">{skill}</div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-3">
                Języki
              </h2>
              <div className="space-y-1 text-sm">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-gray-400">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Courses */}
          {data.courses.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-3">
                Kursy
              </h2>
              <div className="space-y-1 text-sm">
                {data.courses.map((course) => (
                  <div key={course}>{course}</div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
