import { Document} from 'mongoose';

export interface IUserData extends Document {
  userId: string;
  username: string;
  email: string;
  passcode:string;
  labReports: Array<String>;
  aiReports: Array<String>; 
  createdAt: Date;
  updatedAt: Date;
}

