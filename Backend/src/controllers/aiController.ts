import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { askLLM } from '../services/llmService';

export const getRecommendation = async (req: AuthRequest, res: Response) => {
    const { destination } = req.body;
    if (!destination) return res.status(400).json({ message: 'Destination is required' });

    try {
        const prompt = `Provide a top 3-4 bullet point travel recommendation list for a vacation to ${destination}. Include top attractions and a brief tip.`;
        const recommendation = await askLLM(prompt);
        res.json({ recommendation });
    } catch (err: any) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
};