export function buildPrompt(report: object): string {
  return `
You are a medical AI assistant. Given the following patient health report, assess the potential risk level for each of the following chronic diseases:

["Diabetes", "Heart Disease", "Cancer", "Arthritis", "Asthma", "Chronic Obstructive Pulmonary Disease (COPD)", "Autoimmune Diseases", "Hepatitis C", "Acquired Immunodeficiency Syndrome (AIDS)", "Chronic Fatigue Syndrome"]

Return the result as a JSON array:
[
  {
    "disease": string,
    "risk level": "Low" | "Moderate" | "High",
    "description": string,
    "impact on patient health": string,
    "full explanation": string,
    "mitigation": string
  }
]

Patient Report:
\`\`\`json
${JSON.stringify(report, null, 2)}
\`\`\`
`;
}
