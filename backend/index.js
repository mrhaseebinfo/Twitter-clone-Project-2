import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import { databaseConnection } from "./config/database.js";
import userRoutes from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
  path:".env"
});

databaseConnection();
const app = express();

// middlwares 
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin:"http://localhost:3000",
  credentials:true
}

app.use(cors(corsOption));

//api
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/tweet",tweetRoute);


 // Set a default port if it's not provided in the environment variables

app.listen(process.env.PORT, () =>{
    console.log(`server listen at port ${process.env.PORT}`);
});