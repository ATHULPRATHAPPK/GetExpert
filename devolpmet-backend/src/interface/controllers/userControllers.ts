import { Request, Response } from 'express';
import { registerUser } from '../../application/services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(400).json({ error: errorMessage });
  }
};
