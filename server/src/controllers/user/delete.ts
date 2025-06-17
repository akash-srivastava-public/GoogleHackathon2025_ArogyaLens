import { Request, Response } from 'express';
import { User } from '../../modals/schemas/userData.schema';
import { LabReport } from '../../modals/schemas/labReport.schema';
import { AIReport } from '../../modals/schemas/aiReport.schema';

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await LabReport.deleteMany({ _id: { $in: user.labReports } });
    await AIReport.deleteMany({ _id: { $in: user.aiReports } });
    await user.deleteOne();

    res.status(200).json({ message: 'User and related reports deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
