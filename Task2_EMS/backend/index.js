import express from "express";
import { connectDB } from "./config/ConnectDb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import cookieSession from "cookie-session";
import router from "./routes/user.js";


const app= express()

// For handling cookies
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))


// CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your React/Vite URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,                // Allow cookies/headers
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// use express router
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});