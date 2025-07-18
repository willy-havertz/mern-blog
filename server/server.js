import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"; // fix: capitalize "Sentry"

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const app = express();

// 🐞 Sentry Initialization
Sentry.init({
  dsn: process.env.SENTRY_BACKEND_DSN,
  tracesSampleRate: 1.0,
});

// 🐞 Request Handler (must be before routes)
app.use(Sentry.Handlers.requestHandler());

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/upload", uploadRoutes);

// 🐞 Trigger error test route (optional)
app.get("/error", () => {
  throw new Error("Sentry test error");
});

// 🐞 Error Handler (after all routes)
app.use(Sentry.Handlers.errorHandler());

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
