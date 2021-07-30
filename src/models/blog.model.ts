import { model, Schema, Model, Document, PopulatedDoc } from 'mongoose';
import { IUserDB } from './user.model';

// Interface for blog database object
export interface IBlogDB extends Document {
  title: string;
  content: string;
  author: PopulatedDoc<IUserDB & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}

// Blog database schema
const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BlogModel: Model<IBlogDB> = model('blog', BlogSchema);

export default BlogModel;
