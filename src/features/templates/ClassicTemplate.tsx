import type { CVData } from '../../types';

interface ClassicTemplateProps {
  data: CVData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none p-12">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-800">
        {data.personal.photo && (
          <img
            src={data.personal.photo}
            alt="Zdjęcie"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-800"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2">
          {data.personal.name || 'Imię i Nazwisko'}
        </h1>
        <div className="text-gray-600 text-sm space-x-4">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.location && <span>• {data.personal.location}</span>}
        </div>
      </header>

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Doświadczenie zawodowe
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-gray-700 italic mb-2">{exp.company}</p>
                {exp.duties.length > 0 && (
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {exp.duties.map((duty, i) => (
                      <li key={i}>{duty}</li>
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
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Wykształcenie
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">{edu.startDate} — {edu.endDate}</span>
                </div>
                <p className="text-gray-700 italic">{edu.school}</p>
                {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(data.skills.hard.length > 0 || data.skills.soft.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Umiejętności
          </h2>
          {data.skills.hard.length > 0 && (
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
              {data.skills.hard.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{skill.name}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={`w-2 h-2 rounded-full ${
                          n <= skill.level ? 'bg-gray-800' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div className="text-sm text-gray-600 italic">
              {data.skills.soft.join(' • ')}
            </div>
          )}
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Języki
          </h2>
          <div className="text-sm text-gray-700">
            {data.languages.map((l) => `${l.name} (${l.level})`).join(' • ')}
          </div>
        </section>
      )}

      {/* Courses */}
      {data.courses.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Kursy i certyfikaty
          </h2>
          <div className="text-sm text-gray-700">
            {data.courses.join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
}
