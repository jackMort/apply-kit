import type { CVData } from '../../../types';

export const coverLetterSystemPrompt = (language: string) => `You are an expert cover letter writer. Write professional, compelling cover letters that:
- Are tailored to the specific position and company
- Highlight relevant experience and skills from the candidate's CV
- Are concise and impactful (300-400 words)
- Use a professional but engaging tone
- Include a strong opening, body paragraphs showcasing value, and a call to action

Write the letter in ${language === 'pl' ? 'Polish' : 'English'}.
Do not include subject line or headers - just the letter body.
Do not make up information not present in the CV data.`;

export const generateCoverLetterPrompt = (
  cv: CVData,
  position: string,
  company?: string,
  jobDescription?: string
): string => {
  const cvSummary = formatCVForPrompt(cv);

  return `Write a cover letter for the following position:

Position: ${position}
${company ? `Company: ${company}` : ''}
${jobDescription ? `Job Description/Requirements:\n${jobDescription}` : ''}

Candidate's CV:
${cvSummary}

Write a professional cover letter highlighting the candidate's most relevant qualifications for this role.`;
};

export const improveCoverLetterPrompt = (
  currentContent: string,
  cv: CVData,
  position: string,
  company?: string,
  jobDescription?: string
): string => {
  const cvSummary = formatCVForPrompt(cv);

  return `Improve the following cover letter while maintaining its core message:

Current letter:
---
${currentContent}
---

Position: ${position}
${company ? `Company: ${company}` : ''}
${jobDescription ? `Job Description/Requirements:\n${jobDescription}` : ''}

Candidate's CV:
${cvSummary}

Improve this letter by:
- Making it more compelling and professional
- Better highlighting relevant experience
- Improving flow and readability
- Strengthening the call to action

Return only the improved letter, no explanations.`;
};

function formatCVForPrompt(cv: CVData): string {
  const parts: string[] = [];

  // Personal
  parts.push(`Name: ${cv.personal.name}`);
  if (cv.personal.location) parts.push(`Location: ${cv.personal.location}`);

  // Experience
  if (cv.experience.length > 0) {
    parts.push('\nExperience:');
    cv.experience.forEach(exp => {
      parts.push(`- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})`);
      if (exp.duties.length > 0) {
        exp.duties.forEach(duty => parts.push(`  * ${duty}`));
      }
    });
  }

  // Education
  if (cv.education.length > 0) {
    parts.push('\nEducation:');
    cv.education.forEach(edu => {
      parts.push(`- ${edu.degree} at ${edu.school} (${edu.startDate} - ${edu.endDate})`);
    });
  }

  // Skills
  if (cv.skills.hard.length > 0 || cv.skills.soft.length > 0) {
    parts.push('\nSkills:');
    if (cv.skills.hard.length > 0) {
      parts.push(`Technical: ${cv.skills.hard.map(s => s.name).join(', ')}`);
    }
    if (cv.skills.soft.length > 0) {
      parts.push(`Soft skills: ${cv.skills.soft.join(', ')}`);
    }
  }

  // Languages
  if (cv.languages.length > 0) {
    parts.push(`\nLanguages: ${cv.languages.map(l => `${l.name} (${l.level})`).join(', ')}`);
  }

  // Courses
  if (cv.courses.length > 0) {
    parts.push(`\nCertifications: ${cv.courses.join(', ')}`);
  }

  return parts.join('\n');
}
