import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sql } from '../db';
import { User } from '../types/User';

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 4) {
    return res.status(400).json({ message: 'Password must be at least 4 characters long' });
  }

  try {
    const existing = await sql`SELECT user_id FROM users WHERE email = ${email}`;
    if (existing.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const users = (await sql`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword})
      RETURNING user_id, first_name, last_name, email, role
    `) as User[];

    const user = users[0];
    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET || 'secret');
    res.status(201).json({ token, user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const users = (await sql`SELECT * FROM users WHERE email = ${email}`) as User[];
    if (users.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password || '');
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET || 'secret');
    delete user.password;
    res.json({ token, user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};