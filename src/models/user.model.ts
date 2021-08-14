import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { ROLE } from '../constants/user-role';

// Interface for user database object
export interface IUserDB extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(password: string): Promise<boolean>;
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
    role: {
      type: String,
      enum: [ROLE.AUTHOR, ROLE.READER],
      default: ROLE.READER,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre('save', async function (next) {
  const user = this as IUserDB;
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;
  return next();
});

// Method to compare the user password
UserSchema.methods.comparePassword = async function (password: string) {
  const user = this as IUserDB;
  return bcrypt.compare(password, user.password).catch((e: Error) => false);
};

const UserModel: Model<IUserDB> = model('user', UserSchema);

export default UserModel;
