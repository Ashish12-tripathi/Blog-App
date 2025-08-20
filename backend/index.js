import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";

import { v2 as cloudinary } from "cloudinary";
import blogRoute from "./routes/blog.route.js";

import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT ;
const MONGO_URL = process.env.MONOG_URI;

// Middleware
app.use(express.json());



app.use(
  cors({
    origin: "https://blog-app-three-pi-42.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());


app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  // Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);


// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
