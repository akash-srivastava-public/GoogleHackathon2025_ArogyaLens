import mongoose, { Schema } from 'mongoose';

const LabReportSchema = new Schema({
  data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export const LabReport = mongoose.model('LabReport', LabReportSchema);