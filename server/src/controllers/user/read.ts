import { Request, Response } from 'express';
import { User } from '../../modals/schemas/userData.schema';

export const readUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId })
      .populate('labReports')
      .populate('aiReports');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};
