import type { CVData } from '../../types';

interface CreativeTemplateProps {
  data: CVData;
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-400 text-white p-8">
        <div className="flex items-center gap-6">
          {data.personal.photo && (
            <img
              src={data.personal.photo}
              alt="Zdjęcie"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {data.personal.name || 'Imię i Nazwisko'}
            </h1>
            <p className="text-purple-100 text-lg">
              {data.experience[0]?.position || 'Stanowisko'}
            </p>
            <div className="flex gap-4 mt-3 text-sm text-purple-100">
              {data.personal.email && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {data.personal.email}
                </span>
              )}
              {data.personal.phone && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {data.personal.phone}
                </span>
              )}
              {data.personal.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {data.personal.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 grid grid-cols-[1fr_200px] gap-8">
        <main className="space-y-6">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-lg font-bold text-purple-600 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Doświadczenie
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-purple-600 text-sm">{exp.company}</p>
                      </div>
                      <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    {exp.duties.length > 0 && (
                      <ul className="text-sm text-gray-600 space-y-1">
                        {exp.duties.map((duty, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-purple-400">▸</span>
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
              <h2 className="flex items-center gap-2 text-lg font-bold text-purple-600 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                </svg>
                Wykształcenie
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                        <p className="text-purple-600 text-sm">{edu.school}</p>
                      </div>
                      <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="space-y-6">
          {/* Skills */}
          {(data.skills.hard.length > 0 || data.skills.soft.length > 0) && (
            <section>
              <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-3">
                Umiejętności
              </h2>
              {data.skills.hard.length > 0 && (
                <div className="space-y-2 mb-3">
                  {data.skills.hard.map((skill) => (
                    <div key={skill.id} className="text-xs">
                      <div className="flex justify-between text-purple-700 mb-1">
                        <span>{skill.name}</span>
                      </div>
                      <div className="h-1.5 bg-purple-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {data.skills.soft.map((skill) => (
                    <span key={skill} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-3">
                Języki
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span>{lang.name}</span>
                    <span className="text-purple-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Courses */}
          {data.courses.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-3">
                Kursy
              </h2>
              <div className="space-y-1 text-sm text-gray-600">
                {data.courses.map((course) => (
                  <div key={course}>• {course}</div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
