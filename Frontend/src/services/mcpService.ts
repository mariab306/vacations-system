import { apiFetch } from '../config';

export type McpResponse = { answer: string; query?: string; rawData?: any };

export const askMcpQuestion = async (question: string): Promise<McpResponse> =>
  (await apiFetch('/mcp/query', { method: 'POST', body: JSON.stringify({ question }) })).json();