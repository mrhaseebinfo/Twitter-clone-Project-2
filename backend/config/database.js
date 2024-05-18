import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "../config/.env"
});

export const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};

