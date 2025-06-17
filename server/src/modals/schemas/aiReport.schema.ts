import mongoose, { Schema } from 'mongoose';

const AIReportSchema = new Schema({
  data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export const AIReport = mongoose.model('AIReport', AIReportSchema);
