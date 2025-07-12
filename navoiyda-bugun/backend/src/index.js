const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");

const app = express();

// Logger setup
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Simple logger
const logger = {
  log: (level, message, data = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data,
    };

    const logLine = JSON.stringify(logEntry) + "\n";

    try {
      fs.appendFileSync(path.join(logDir, "combined.log"), logLine);
      if (level === "error") {
        fs.appendFileSync(path.join(logDir, "error.log"), logLine);
      }

      const consoleMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      if (level === "error") {
        console.error(consoleMessage, data);
      } else if (level === "warn") {
        console.warn(consoleMessage, data);
      } else {
        console.log(consoleMessage, data);
      }
    } catch (error) {
      console.error("Failed to write log:", error);
    }
  },

  info: (message, data) => logger.log("info", message, data),
  error: (message, data) => logger.log("error", message, data),
  warn: (message, data) => logger.log("warn", message, data),
  debug: (message, data) => logger.log("debug", message, data),
};

logger.info("Starting Navoiyda Bugun Backend Server");

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
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip || req.connection.remoteAddress,
    };

    if (res.statusCode >= 400) {
      logger.error("HTTP Request Error", logData);
    } else {
      logger.info("HTTP Request", logData);
    }
  });

  next();
});

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/health", (req, res) => {
  logger.info("Health check requested");
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "navoiyda-bugun-backend",
    version: "1.0.0",
  });
});

// Test users for authentication
const testUsers = [
  {
    id: 1,
    username: "founder",
    password: "123456",
    role: "founder",
    name: "Asoschi",
  },
  {
    id: 2,
    username: "ceo",
    password: "123456",
    role: "ceo",
    name: "Bosh direktor",
  },
  {
    id: 3,
    username: "hr",
    password: "123456",
    role: "hr_manager",
    name: "HR menejer",
  },
  {
    id: 4,
    username: "project",
    password: "123456",
    role: "project_manager",
    name: "Loyiha menejer",
  },
  {
    id: 5,
    username: "marketing",
    password: "123456",
    role: "marketing_manager",
    name: "Marketing menejer",
  },
  {
    id: 6,
    username: "sales",
    password: "123456",
    role: "sales_manager",
    name: "Sotuv menejer",
  },
  {
    id: 7,
    username: "mobilographer",
    password: "123456",
    role: "mobilographer",
    name: "Mobilograf",
  },
  {
    id: 8,
    username: "brandface",
    password: "123456",
    role: "brand_face",
    name: "Brend yuzi",
  },
  {
    id: 9,
    username: "screenwriter",
    password: "123456",
    role: "screenwriter",
    name: "Ssenarist",
  },
  {
    id: 10,
    username: "employee",
    password: "123456",
    role: "employee",
    name: "Xodim",
  },
  {
    id: 11,
    username: "admin",
    password: "123456",
    role: "admin",
    name: "Administrator",
  },
];

// Auth routes
app.post("/api/auth/login", (req, res) => {
  try {
    const { username, password } = req.body;

    logger.info("Login attempt", { username });

    if (!username || !password) {
      logger.warn("Login failed - missing credentials", { username });
      return res.status(400).json({
        success: false,
        message: "Username va password kiritilishi shart",
      });
    }

    const user = testUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const userResponse = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
      };

      logger.info("Login successful", {
        userId: user.id,
        username: user.username,
        role: user.role,
      });

      res.json({
        success: true,
        user: userResponse,
        token: `token_${user.id}_${Date.now()}`,
        message: "Muvaffaqiyatli kirildi",
      });
    } else {
      logger.warn("Login failed - invalid credentials", { username });
      res.status(401).json({
        success: false,
        message: "Login yoki parol noto'g'ri",
      });
    }
  } catch (error) {
    logger.error("Login error", { error: error.message, stack: error.stack });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

// Get current user
app.get("/api/auth/me", (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token topilmadi",
      });
    }

    // Simple token validation (in real app, use JWT)
    const userId = token.split("_")[1];
    const user = testUsers.find((u) => u.id == userId);

    if (user) {
      const userResponse = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
      };

      res.json({
        success: true,
        user: userResponse,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Noto'g'ri token",
      });
    }
  } catch (error) {
    logger.error("Auth me error", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

// Users routes
app.get("/api/users", (req, res) => {
  try {
    const users = testUsers.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
    }));

    logger.info("Users list requested");

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    logger.error("Users list error", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

// Tasks routes
app.get("/api/tasks", (req, res) => {
  try {
    const tasks = [
      {
        id: 1,
        title: "Loyiha rejasini tayyorlash",
        status: "pending",
        priority: "high",
        assignee: "Loyiha menejer",
      },
      {
        id: 2,
        title: "Marketing strategiya",
        status: "in_progress",
        priority: "medium",
        assignee: "Marketing menejer",
      },
      {
        id: 3,
        title: "Xodimlar ro'yxati",
        status: "completed",
        priority: "low",
        assignee: "HR menejer",
      },
      {
        id: 4,
        title: "Sotuv hisoboti",
        status: "pending",
        priority: "high",
        assignee: "Sotuv menejer",
      },
      {
        id: 5,
        title: "Kontent yaratish",
        status: "in_progress",
        priority: "medium",
        assignee: "Mobilograf",
      },
    ];

    logger.info("Tasks list requested");

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    logger.error("Tasks list error", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

app.post("/api/tasks", (req, res) => {
  try {
    const { title, description, priority, assignee } = req.body;

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority: priority || "medium",
      assignee,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    logger.info("Task created", { taskId: newTask.id, title });

    res.json({
      success: true,
      data: newTask,
      message: "Vazifa muvaffaqiyatli yaratildi",
    });
  } catch (error) {
    logger.error("Task creation error", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

// Notifications routes
app.get("/api/notifications", (req, res) => {
  try {
    const notifications = [
      {
        id: 1,
        title: "Yangi vazifa",
        message: "Sizga yangi vazifa tayinlandi",
        type: "task",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Tizim yangilanishi",
        message: "Tizim muvaffaqiyatli yangilandi",
        type: "system",
        isRead: true,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 3,
        title: "Yig'ilish eslatmasi",
        message: "10 daqiqadan keyin yig'ilish boshlanadi",
        type: "meeting",
        isRead: false,
        createdAt: new Date(Date.now() - 600000).toISOString(),
      },
    ];

    logger.info("Notifications list requested");

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    logger.error("Notifications list error", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

// Logs routes
app.post("/api/logs", (req, res) => {
  try {
    const { level, message, data } = req.body;

    logger.log(level || "info", `Client: ${message}`, {
      source: "frontend",
      ...data,
      serverTimestamp: new Date().toISOString(),
    });

    res.json({
      success: true,
      message: "Log saved successfully",
    });
  } catch (error) {
    logger.error("Log save error", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

app.get("/api/logs", (req, res) => {
  try {
    const { level, limit = 100 } = req.query;

    const logFile = path.join(logDir, "combined.log");
    if (!fs.existsSync(logFile)) {
      return res.json({
        success: true,
        data: { logs: [], pagination: { total: 0 } },
      });
    }

    const content = fs.readFileSync(logFile, "utf8");
    const lines = content.trim().split("\n");

    let logs = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    // Filter by level
    if (level) {
      logs = logs.filter((log) => log.level === level);
    }

    // Limit results
    logs = logs.slice(-parseInt(limit));

    res.json({
      success: true,
      data: {
        logs: logs.reverse(),
        pagination: { total: logs.length },
      },
    });
  } catch (error) {
    logger.error("Logs retrieval error", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

app.get("/api/logs/stats", (req, res) => {
  try {
    const logFiles = fs.readdirSync(logDir);
    const stats = logFiles.map((file) => {
      const filePath = path.join(logDir, file);
      const stat = fs.statSync(filePath);
      return {
        filename: file,
        size: stat.size,
        modified: stat.mtime,
        created: stat.birthtime,
      };
    });

    res.json({
      success: true,
      data: {
        totalFiles: stats.length,
        totalSize: stats.reduce((sum, file) => sum + file.size, 0),
        files: stats,
      },
    });
  } catch (error) {
    logger.error("Log stats error", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server xatoligi",
    });
  }
});

// 404 handler
app.use("*", (req, res) => {
  logger.warn("Route not found", {
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
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error("Unhandled error", {
    error: message,
    stack: err.stack,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" ? "Internal Server Error" : message,
  });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("Process terminated");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully");
  server.close(() => {
    logger.info("Process terminated");
    process.exit(0);
  });
});

// Unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise Rejection", {
    reason: reason,
    promise: promise,
  });
});

// Uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

module.exports = app;
