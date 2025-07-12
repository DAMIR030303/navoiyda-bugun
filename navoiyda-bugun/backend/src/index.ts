import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { appLogger, requestLogger, errorLogger } from "./utils/simpleLogger";

// Routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import taskRoutes from "./routes/tasks";
import logRoutes from "./routes/logs";

const app = express();

// Logger setup
appLogger.info("Starting Navoiyda Bugun Backend Server");
appLogger.logSystem("Server Startup", {
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5001,
});

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Request logging middleware
app.use(requestLogger);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/health", (_, res) => {
  appLogger.info("Health check requested");
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "navoiyda-bugun-backend",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);

// 404 handler
app.use("*", (req, res) => {
  appLogger.warn("Route not found", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorLogger);
app.use((err: any, req: any, res: any, next: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  appLogger.error("Unhandled error", {
    error: message,
    stack: err.stack,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    userId: req.user?.id,
    ip: req.ip,
  });

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" ? "Internal Server Error" : message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  appLogger.info(`Server running on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  appLogger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    appLogger.info("Process terminated");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  appLogger.info("SIGINT received, shutting down gracefully");
  server.close(() => {
    appLogger.info("Process terminated");
    process.exit(0);
  });
});

// Unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  appLogger.error("Unhandled Promise Rejection", {
    reason: reason,
    promise: promise,
  });
});

// Uncaught exceptions
process.on("uncaughtException", (error) => {
  appLogger.error("Uncaught Exception", {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

export default app;
