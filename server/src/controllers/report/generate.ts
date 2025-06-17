import { GoogleGenAI } from '@google/genai';
import { buildPrompt } from './promptBuilder';

function getApiKey() {
  return process.env.API_KEY;
}

if (!getApiKey()) throw new Error('API_KEY is missing in .env');
const ai = new GoogleGenAI({ apiKey: getApiKey() });

export async function analyzeChronicDiseaseRisk(report: object, userId: string): Promise<any> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',    
      contents: [{ role: 'user', parts: [{ text: buildPrompt(report) }] }],
    });

    return JSON.parse((response.text+"").replace(/```json|```/g, '').trim());
  } catch (err: any) {
    console.error(`❌ Error for user ${userId}:`, err.message || err);
    throw new Error('Failed to analyze chronic disease risk.');
  }
}
