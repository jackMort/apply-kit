export const experienceSystemPrompt = (language: string) => `You are an expert CV writer specializing in job descriptions and duties. Generate professional, impactful bullet points that:
- Start with strong action verbs
- Include quantifiable achievements when possible
- Are concise (one line each)
- Highlight relevant responsibilities and accomplishments
- Use industry-appropriate terminology

Write in ${language === 'pl' ? 'Polish' : 'English'}.
Return only the bullet points, one per line, without numbering or bullet characters.`;

export const generateDutiesPrompt = (
  position: string,
  company: string,
  industry?: string
): string => {
  return `Generate 5-6 professional job duty bullet points for:

Position: ${position}
Company: ${company}
${industry ? `Industry: ${industry}` : ''}

Create realistic, impactful duties that would be typical for this role. Focus on:
- Key responsibilities
- Technical skills applied
- Collaboration and communication
- Results and achievements

Return only the duty descriptions, one per line.`;
};

export const improveDutiesPrompt = (
  position: string,
  company: string,
  existingDuties: string[]
): string => {
  return `Improve the following job duties to make them more professional and impactful:

Position: ${position}
Company: ${company}

Current duties:
${existingDuties.map(d => `- ${d}`).join('\n')}

Improve these duties by:
- Using stronger action verbs
- Adding specificity and measurable outcomes where possible
- Making them more concise and professional
- Maintaining the original meaning

Return only the improved duties, one per line, without bullet characters.`;
};
