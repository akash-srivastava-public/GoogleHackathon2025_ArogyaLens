import { Request, Response } from 'express';
import { User } from '../../modals/schemas/userData.schema';
import { LabReport } from '../../modals/schemas/labReport.schema';

export const insertLabReport = async (req: Request, res: Response) => {
  try {
    const { userId, data } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log("data", {data});
    const report = new LabReport({ data });
    await report.save();

    user.labReports.push(report._id.toString());
    await user.save();

    res.status(200).json({ message: 'Lab report added', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add lab report', error });
  }
};
