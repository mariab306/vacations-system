import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODELS = [
    'gemini-3.5-flash-lite',
    'gemini-3.6-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash'
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateWithFallback(contents: string, systemInstruction?: string): Promise<string> {
    for (let i = 0; i < MODELS.length; i++) {
        try {
            const response = await ai.models.generateContent({
                model: MODELS[i],
                contents,
                ...(systemInstruction && { config: { systemInstruction } })
            });
            return response.text ?? '';
        } catch (err: any) {
            const isUnavailable = err?.status === 503 || String(err?.message).includes('503');
            if (!isUnavailable || i === MODELS.length - 1) {
                throw err;
            }
            await sleep(1500);
        }
    }
    return '';
}

export async function askLLM(message: string): Promise<string> {
    return generateWithFallback(message);
}

export async function askLLMWithRole(message: string, role: string): Promise<string> {
    return generateWithFallback(message, role);
}