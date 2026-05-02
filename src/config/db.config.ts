import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.DB_URI) {
      throw new Error("DB_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ DB Connected");
  } catch (error) {
    console.log("❌ DB Error", error);
    process.exit(1);
  }
};
