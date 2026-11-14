import { apiFetch } from '../config';

export const fetchRecommendation = async (destination: string): Promise<string> =>
  (await (await apiFetch('/ai/recommendation', { method: 'POST', body: JSON.stringify({ destination }) })).json()).recommendation;