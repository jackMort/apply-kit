import type { CVData } from '../../../types';

export const jobMatchSystemPrompt = (language: string) => `You are an expert recruiter and ATS specialist. Analyze how well a candidate's CV matches a job posting.

Respond in ${language === 'pl' ? 'Polish' : 'English'} with a JSON object in this exact format:
{
  "score": <number 0-100>,
  "matches": [
    {"skill": "<matched skill/qualification>", "context": "<where it appears in CV>"}
  ],
  "gaps": [
    {"requirement": "<missing requirement>", "importance": "high" | "medium" | "low"}
  ],
  "suggestions": [
    {"action": "<specific suggestion>", "section": "skills" | "experience" | "education" | "courses"}
  ]
}

Be specific and actionable. Only return valid JSON, no explanations.`;

export const analyzeJobMatchPrompt = (cv: CVData, jobDescription: string): string => {
  const cvSummary = formatCVForAnalysis(cv);

  return `Analyze how well this CV matches the job posting:

JOB POSTING:
---
${jobDescription}
---

CANDIDATE'S CV:
---
${cvSummary}
---

Provide:
1. Match score (0-100) based on skill alignment, experience relevance, and qualifications
2. Strong matches - skills and experience that align well
3. Gaps - requirements from job posting missing in CV
4. Actionable suggestions to improve the CV for this specific role`;
};

function formatCVForAnalysis(cv: CVData): string {
  const parts: string[] = [];

  // Experience
  if (cv.experience.length > 0) {
    parts.push('EXPERIENCE:');
    cv.experience.forEach(exp => {
      parts.push(`${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})`);
      exp.duties.forEach(duty => parts.push(`- ${duty}`));
    });
  }

  // Education
  if (cv.education.length > 0) {
    parts.push('\nEDUCATION:');
    cv.education.forEach(edu => {
      parts.push(`${edu.degree} - ${edu.school}`);
    });
  }

  // Skills
  parts.push('\nSKILLS:');
  if (cv.skills.hard.length > 0) {
    parts.push(`Technical: ${cv.skills.hard.map(s => s.name).join(', ')}`);
  }
  if (cv.skills.soft.length > 0) {
    parts.push(`Soft: ${cv.skills.soft.join(', ')}`);
  }

  // Languages
  if (cv.languages.length > 0) {
    parts.push(`\nLANGUAGES: ${cv.languages.map(l => `${l.name} (${l.level})`).join(', ')}`);
  }

  // Courses
  if (cv.courses.length > 0) {
    parts.push(`\nCERTIFICATIONS: ${cv.courses.join(', ')}`);
  }

  return parts.join('\n');
}

export interface JobMatchResult {
  score: number;
  matches: Array<{ skill: string; context: string }>;
  gaps: Array<{ requirement: string; importance: 'high' | 'medium' | 'low' }>;
  suggestions: Array<{ action: string; section: 'skills' | 'experience' | 'education' | 'courses' }>;
}

export function parseJobMatchResponse(response: string): JobMatchResult {
  try {
    // Try to extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]) as JobMatchResult;

    // Validate structure
    if (typeof parsed.score !== 'number') parsed.score = 50;
    if (!Array.isArray(parsed.matches)) parsed.matches = [];
    if (!Array.isArray(parsed.gaps)) parsed.gaps = [];
    if (!Array.isArray(parsed.suggestions)) parsed.suggestions = [];

    return parsed;
  } catch {
    return {
      score: 50,
      matches: [],
      gaps: [{ requirement: 'Could not analyze job posting', importance: 'medium' }],
      suggestions: [],
    };
  }
}
