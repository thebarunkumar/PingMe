import express from "express";
import dotenv from "dotenv"; // Added import
dotenv.config(); // MUST be first

import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./config/socket.js"; // Make sure socket.js exports both app and server

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


// Root route for health check
app.get("/", (req, res) => {
  res.send("PingMe App is running successfully");
});

// Start Server
connectDB()
  .then(() => {
    server.listen(PORT, () => { // Use server, not app, to enable socket.io
      console.log(`Server is running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
