import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  name?: string;
  userIds: mongoose.Types.ObjectId[];
  meta: {
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    deletedBy?: mongoose.Types.ObjectId;
  };
}

const taskSchema = new Schema<ITask>(
  {
    name: { type: String, trim: true },
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
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

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
