import { Response } from 'express';
import { sql } from '../db';
import { AuthRequest } from '../middleware/authMiddleware';
import { askLLM, askLLMWithRole } from '../services/llmService';

export const handleMcpQuery = async (req: AuthRequest, res: Response) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: 'Question is required' });

    try {
        const schemaContext = `
        Database Schema:
        1. vacations (vacation_id INT, destination VARCHAR, description TEXT, start_date DATE, end_date DATE, price DECIMAL)
        2. likes (user_id INT, vacation_id INT)
        Today's date is: ${new Date().toISOString().split('T')[0]}`;

        const role = `You are a database assistant. ${schemaContext}. Convert the user's question into a single, valid, read-only PostgreSQL SELECT query. Return ONLY the raw SQL string without any formatting or markdown blocks.`;

        let generatedQuery = await askLLMWithRole(question, role);
        generatedQuery = generatedQuery.replace(/```sql|```/g, '').trim();

        if (!generatedQuery.toLowerCase().startsWith('select')) {
            return res.status(400).json({ message: 'Only read-only queries are permitted.' });
        }

        const queryResult = await sql.query(generatedQuery);

        const summaryPrompt = `
        User asked: "${question}"
        Query Executed: ${generatedQuery}
        Query Results: ${JSON.stringify(queryResult)}
        Summarize the answer clearly and concisely based strictly on the query results.`;

        const answer = await askLLM(summaryPrompt);

        res.json({ answer, query: generatedQuery, rawData: queryResult });
    } catch (err: any) {
        res.status(500).json({ message: err.message || 'Error processing MCP query' });
    }
};