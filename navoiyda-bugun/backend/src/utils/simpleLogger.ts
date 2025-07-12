import fs from "fs";
import path from "path";

// Log directories yaratish
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  data?: any;
  userId?: string;
  userRole?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
}

class SimpleLogger {
  private static instance: SimpleLogger;
  private sessionId: string;

  private constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.logSystem("Logger Initialized", { sessionId: this.sessionId });
  }

  public static getInstance(): SimpleLogger {
    if (!SimpleLogger.instance) {
      SimpleLogger.instance = new SimpleLogger();
    }
    return SimpleLogger.instance;
  }

  private writeToFile(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      data,
      sessionId: this.sessionId,
    };

    const logLine = JSON.stringify(logEntry) + "\n";

    try {
      // Write to combined log
      fs.appendFileSync(path.join(logDir, "combined.log"), logLine);

      // Write to level-specific log
      if (level === "error") {
        fs.appendFileSync(path.join(logDir, "error.log"), logLine);
      }

      // Console output
      const consoleMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      if (level === "error") {
        console.error(consoleMessage, data || "");
      } else if (level === "warn") {
        console.warn(consoleMessage, data || "");
      } else {
        console.log(consoleMessage, data || "");
      }
    } catch (error) {
      console.error("Failed to write log:", error);
    }
  }

  // Basic logging methods
  info(message: string, data?: any) {
    this.writeToFile("info", message, data);
  }

  error(message: string, data?: any) {
    this.writeToFile("error", message, data);
  }

  warn(message: string, data?: any) {
    this.writeToFile("warn", message, data);
  }

  debug(message: string, data?: any) {
    this.writeToFile("debug", message, data);
  }

  // HTTP request logging
  logRequest(req: any, res: any, responseTime: number) {
    const logData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip || req.connection.remoteAddress,
      userId: req.user?.id,
      userRole: req.user?.role,
    };

    if (res.statusCode >= 400) {
      this.error("HTTP Request Error", logData);
    } else {
      this.info("HTTP Request", logData);
    }
  }

  // Authentication logging
  logAuth(action: string, userId?: string, details?: any) {
    this.info(`Auth: ${action}`, {
      userId,
      action,
      ...details,
    });
  }

  // Security events
  logSecurity(event: string, details: any) {
    this.warn(`Security: ${event}`, {
      event,
      ...details,
    });
  }

  // System events
  logSystem(event: string, details?: any) {
    this.info(`System: ${event}`, {
      event,
      ...details,
    });
  }

  // API errors
  logApiError(error: Error, req?: any, additionalInfo?: any) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      url: req?.originalUrl,
      method: req?.method,
      userId: req?.user?.id,
      userRole: req?.user?.role,
      ip: req?.ip,
      userAgent: req?.get("User-Agent"),
      ...additionalInfo,
    };

    this.error("API Error", errorData);
  }

  // Business logic events
  logBusiness(event: string, details: any) {
    this.info(`Business: ${event}`, {
      event,
      ...details,
    });
  }

  // Frontend error logging (from client)
  logClientError(errorData: any) {
    this.error("Client Error", {
      source: "frontend",
      ...errorData,
      serverTimestamp: new Date().toISOString(),
    });
  }

  // Get log stats
  getLogStats(): any {
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

      return {
        totalFiles: stats.length,
        totalSize: stats.reduce((sum, file) => sum + file.size, 0),
        files: stats,
      };
    } catch (error) {
      this.error("Failed to get log stats", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return { totalFiles: 0, totalSize: 0, files: [] };
    }
  }

  // Export logs
  async exportLogs(
    startDate?: string,
    endDate?: string,
    level?: string
  ): Promise<any[]> {
    try {
      const logFile = path.join(logDir, "combined.log");
      if (!fs.existsSync(logFile)) {
        return [];
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

      // Filter by date
      if (startDate) {
        const start = new Date(startDate);
        logs = logs.filter((log) => new Date(log.timestamp) >= start);
      }

      if (endDate) {
        const end = new Date(endDate);
        logs = logs.filter((log) => new Date(log.timestamp) <= end);
      }

      // Filter by level
      if (level) {
        logs = logs.filter((log) => log.level === level);
      }

      return logs;
    } catch (error) {
      this.error("Failed to export logs", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return [];
    }
  }

  // Clean old logs
  cleanOldLogs(daysToKeep = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const logFiles = fs.readdirSync(logDir);
      let cleanedCount = 0;

      logFiles.forEach((file) => {
        const filePath = path.join(logDir, file);
        const stat = fs.statSync(filePath);

        if (stat.mtime < cutoffDate) {
          fs.unlinkSync(filePath);
          cleanedCount++;
          this.info(`Cleaned old log file: ${file}`);
        }
      });

      this.info(`Log cleanup completed. Removed ${cleanedCount} files.`);
      return cleanedCount;
    } catch (error) {
      this.error("Failed to clean old logs", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return 0;
    }
  }
}

// Singleton instance
export const appLogger = SimpleLogger.getInstance();

// Express middleware for request logging
export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    appLogger.logRequest(req, res, responseTime);
  });

  next();
};

// Error handling middleware
export const errorLogger = (err: Error, req: any, res: any, next: any) => {
  appLogger.logApiError(err, req);
  next(err);
};

// Security middleware
export const securityLogger = (event: string) => {
  return (req: any, res: any, next: any) => {
    appLogger.logSecurity(event, {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      url: req.originalUrl,
      method: req.method,
      userId: req.user?.id,
    });
    next();
  };
};

export default appLogger;
