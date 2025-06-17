import { Request, Response } from 'express';
import { User } from '../../modals/schemas/userData.schema';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, passcode } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userId = uuidv4();
    const user = new User({ userId, email, passcode });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.userId, // ✅ returning userId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};
