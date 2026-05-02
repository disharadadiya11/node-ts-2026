import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  role?: string;
  file?: string;
  meta: {
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    deletedBy?: mongoose.Types.ObjectId;
  };
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String },
    mobile: { type: String },
    role: { type: String },
    file: { type: String },
    meta: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date },
      deletedAt: { type: Date },
      createdBy: { type: Schema.Types.ObjectId, ref: "User" },
      updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
      deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
