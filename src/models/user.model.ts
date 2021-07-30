import { model, Schema, Model, Document } from 'mongoose';

// Interface for user database object
export interface IUserDB extends Document {
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// User database schema
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel: Model<IUserDB> = model('user', UserSchema);

export default UserModel;
