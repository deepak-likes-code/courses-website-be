import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL; // Replace with your MongoDB connection URL
const dbName = process.env.MONGO_DB; // Replace with your database name

export async function connectToMongoDB() {
  try {
    mongoose
      .connect(`${url}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected..."))
      .catch((err) => console.log(err));
    // Additional logic or function calls after successful connection
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
