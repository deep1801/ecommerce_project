import mongoose from "mongoose";

// Database Connection Function

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database Connection Error");

    console.log(error.message);

    process.exit(1);
  }
};

export default connectDB;
