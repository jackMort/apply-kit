import type { CVData } from '../../types';

interface MinimalTemplateProps {
  data: CVData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none p-16">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-6">
          {data.personal.photo && (
            <img
              src={data.personal.photo}
              alt="Zdjęcie"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-1">
              {data.personal.name || 'Imię i Nazwisko'}
            </h1>
            <div className="text-gray-400 text-sm space-x-3">
              {data.personal.email && <span>{data.personal.email}</span>}
              {data.personal.phone && <span>{data.personal.phone}</span>}
              {data.personal.location && <span>{data.personal.location}</span>}
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-10">
        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-6">
              Doświadczenie
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-400">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{exp.company}</p>
                  {exp.duties.length > 0 && (
                    <ul className="text-sm text-gray-600 space-y-1">
                      {exp.duties.map((duty, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-gray-300">—</span>
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
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-6">
              Wykształcenie
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <span className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {(data.skills.hard.length > 0 || data.skills.soft.length > 0) && (
          <section>
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
              Umiejętności
            </h2>
            <div className="flex flex-wrap gap-2">
              {[...data.skills.hard, ...data.skills.soft].map((skill) => (
                <span key={skill} className="text-sm text-gray-600 border border-gray-200 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Courses */}
        <div className="grid grid-cols-2 gap-8">
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
                Języki
              </h2>
              <div className="space-y-1">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-400">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.courses.length > 0 && (
            <section>
              <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
                Kursy
              </h2>
              <div className="space-y-1 text-sm text-gray-600">
                {data.courses.map((course) => (
                  <div key={course}>{course}</div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
