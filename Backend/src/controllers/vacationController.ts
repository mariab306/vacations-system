import { Response } from 'express';
import { sql } from '../db';
import { AuthRequest } from '../middleware/authMiddleware';

export const getAllVacations = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  try {
    const vacations = await sql`
      SELECT 
        v.*,
        COUNT(l.user_id)::INT AS likes_count,
        EXISTS(SELECT 1 FROM likes WHERE user_id = ${userId} AND vacation_id = v.vacation_id) AS is_liked
      FROM vacations v
      LEFT JOIN likes l ON v.vacation_id = l.vacation_id
      GROUP BY v.vacation_id
      ORDER BY v.start_date ASC
    `;
    res.json(vacations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getVacationById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const result = await sql`SELECT * FROM vacations WHERE vacation_id = ${id}`;
    if (result.length === 0) return res.status(404).json({ message: 'Vacation not found' });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addVacation = async (req: AuthRequest, res: Response) => {
  const { destination, description, start_date, end_date, price } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'Image file is required' });

  const numPrice = parseFloat(price);
  if (isNaN(numPrice) || numPrice < 0 || numPrice > 10000) {
    return res.status(400).json({ message: 'Price must be between 0 and 10,000' });
  }

  const startDateObj = new Date(start_date);
  const endDateObj = new Date(end_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (startDateObj < today) {
    return res.status(400).json({ message: 'Start date cannot be in the past' });
  }

  if (endDateObj < startDateObj) {
    return res.status(400).json({ message: 'End date cannot be earlier than start date' });
  }

  try {
    const result = await sql`
      INSERT INTO vacations (destination, description, start_date, end_date, price, image_filename)
      VALUES (${destination}, ${description}, ${start_date}, ${end_date}, ${numPrice}, ${file.filename})
      RETURNING *
    `;
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateVacation = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { destination, description, start_date, end_date, price } = req.body;
  const file = req.file;

  if (!destination || !description || !start_date || !end_date || price === undefined) {
    return res.status(400).json({ message: 'All fields except image are required' });
  }

  const numPrice = parseFloat(price);
  if (isNaN(numPrice) || numPrice < 0 || numPrice > 10000) {
    return res.status(400).json({ message: 'Price must be between 0 and 10,000' });
  }

  if (new Date(end_date) < new Date(start_date)) {
    return res.status(400).json({ message: 'End date cannot be earlier than start date' });
  }

  try {
    let result;
    if (file) {
      result = await sql`
        UPDATE vacations
        SET destination=${destination}, description=${description}, start_date=${start_date},
            end_date=${end_date}, price=${numPrice}, image_filename=${file.filename}
        WHERE vacation_id = ${id}
        RETURNING *
      `;
    } else {
      result = await sql`
        UPDATE vacations
        SET destination=${destination}, description=${description}, start_date=${start_date},
            end_date=${end_date}, price=${numPrice}
        WHERE vacation_id = ${id}
        RETURNING *
      `;
    }

    if (result.length === 0) return res.status(404).json({ message: 'Vacation not found' });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteVacation = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const result = await sql`DELETE FROM vacations WHERE vacation_id = ${id} RETURNING *`;
    if (result.length === 0) return res.status(404).json({ message: 'Vacation not found' });
    res.json({ message: 'Vacation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getVacationReports = async (req: AuthRequest, res: Response) => {
  try {
    const report = await sql`
      SELECT v.destination, COUNT(l.user_id)::INT AS likes_count
      FROM vacations v
      LEFT JOIN likes l ON v.vacation_id = l.vacation_id
      GROUP BY v.vacation_id, v.destination
      ORDER BY likes_count DESC
    `;
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const exportVacationsCsv = async (req: AuthRequest, res: Response) => {
  try {
    const report = await sql`
      SELECT v.destination, COUNT(l.user_id)::INT AS likes_count
      FROM vacations v
      LEFT JOIN likes l ON v.vacation_id = l.vacation_id
      GROUP BY v.vacation_id, v.destination
      ORDER BY likes_count DESC
    `;

    const header = 'Destination,Likes';
    const rows = report.map((row: any) => `"${String(row.destination).replace(/"/g, '""')}",${row.likes_count}`);
    const csvContent = [header, ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="vacations_likes_report.csv"');
    res.status(200).send(csvContent);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};