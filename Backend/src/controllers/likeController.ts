import { Response } from 'express';
import { sql } from '../db';
import { AuthRequest } from '../middleware/authMiddleware';

export const likeVacation = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  const { vacationId } = req.params;
  try {
    await sql`
      INSERT INTO likes (user_id, vacation_id)
      VALUES (${userId}, ${vacationId})
      ON CONFLICT DO NOTHING
    `;
    res.status(201).json({ message: 'Liked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const unlikeVacation = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  const { vacationId } = req.params;
  try {
    await sql`
      DELETE FROM likes
      WHERE user_id = ${userId} AND vacation_id = ${vacationId}
    `;
    res.json({ message: 'Unliked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};