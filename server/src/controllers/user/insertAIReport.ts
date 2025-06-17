import { Request, Response } from 'express';
import { User } from '../../modals/schemas/userData.schema';
import { AIReport } from '../../modals/schemas/aiReport.schema';
import { analyzeChronicDiseaseRisk } from '../report/generate';

const processMedGemma: any = async (reports: any, usrId:string) => {
  const report = await analyzeChronicDiseaseRisk(reports, usrId);
  return {key:"aiReport", userId: usrId, value: report};
}

export const insertAiReport = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ userId })
      .populate('labReports');
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    const reports = user.labReports;

    // Generate the new AI report
    const aiReportData = await processMedGemma(reports, userId);
    const report = new AIReport({data: aiReportData});

    // Save the new report
    await report.save();

    // Remove all existing AI reports for the user
    user.aiReports = [];

    // Push the latest report ID to the aiReports array
    user.aiReports.push(report._id.toString());

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'AI report added', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add AI report', error });
  }
};
