import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.error(error);
    await mongoose.connection.close();
  }
}
