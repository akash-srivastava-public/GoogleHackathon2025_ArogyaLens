import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserData } from '../types/userData.types';
const UserDataSchema = new Schema<IUserData>({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passcode: { type: String, required: true },
    labReports: [{ type: Schema.Types.ObjectId, ref: 'LabReport' }],
    aiReports:[{ type: Schema.Types.ObjectId, ref: 'AIReport' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    }, {
    timestamps: true
});

UserDataSchema.pre('save', async function (next) {
    if (!this.isModified('passcode')) return next();
    const salt = await bcrypt.genSalt(10);
    this.passcode = await bcrypt.hash(this.passcode, salt);
    next();
  });

export const User = mongoose.model<IUserData>('User', UserDataSchema);