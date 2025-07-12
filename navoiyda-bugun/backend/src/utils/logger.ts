import winston from "winston";
import path from "path";
import fs from "fs";

// Log directories yaratish
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Console format
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: "HH:mm:ss",
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = "";
    if (Object.keys(meta).length > 0) {
      metaStr = JSON.stringify(meta, null, 2);
    }
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Winston logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  defaultMeta: {
    service: "navoiyda-bugun-backend",
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "development",
  },
  transports: [
    // Error logs
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),

    // Combined logs
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    }),

    // Daily rotate logs - temporarily disabled
    // new winston.transports.File({
    //   filename: path.join(logDir, "app-%DATE%.log"),
    //   datePattern: "YYYY-MM-DD",
    //   maxSize: "20m",
    //   maxFiles: "14d",
    // }),

    // HTTP requests log
    new winston.transports.File({
      filename: path.join(logDir, "http.log"),
      level: "http",
      maxsize: 5242880,
      maxFiles: 5,
    }),

    // Security logs
    new winston.transports.File({
      filename: path.join(logDir, "security.log"),
      level: "warn",
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],

  // Exception handling
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log"),
    }),
  ],

  // Rejection handling
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
    }),
  ],
});

// Console transport for development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
      level: "debug",
    })
  );
}

// Custom logging methods
export class AppLogger {
  private static instance: AppLogger;
  private winston: winston.Logger;

  private constructor() {
    this.winston = logger;
  }

  public static getInstance(): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger();
    }
    return AppLogger.instance;
  }

  // Basic logging methods
  info(message: string, meta?: any) {
    this.winston.info(message, meta);
  }

  error(message: string, meta?: any) {
    this.winston.error(message, meta);
  }

  warn(message: string, meta?: any) {
    this.winston.warn(message, meta);
  }

  debug(message: string, meta?: any) {
    this.winston.debug(message, meta);
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
      timestamp: new Date().toISOString(),
    };

    if (res.statusCode >= 400) {
      this.winston.error("HTTP Request Error", logData);
    } else {
      this.winston.http("HTTP Request", logData);
    }
  }

  // Authentication logging
  logAuth(action: string, userId?: string, details?: any) {
    this.winston.info(`Auth: ${action}`, {
      userId,
      action,
      ...details,
      timestamp: new Date().toISOString(),
    });
  }

  // Security events
  logSecurity(event: string, details: any) {
    this.winston.warn(`Security: ${event}`, {
      event,
      ...details,
      timestamp: new Date().toISOString(),
    });
  }

  // Database operations
  logDatabase(operation: string, table?: string, details?: any) {
    this.winston.debug(`Database: ${operation}`, {
      operation,
      table,
      ...details,
      timestamp: new Date().toISOString(),
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
      timestamp: new Date().toISOString(),
      ...additionalInfo,
    };

    this.winston.error("API Error", errorData);
  }

  // Business logic events
  logBusiness(event: string, details: any) {
    this.winston.info(`Business: ${event}`, {
      event,
      ...details,
      timestamp: new Date().toISOString(),
    });
  }

  // Performance monitoring
  logPerformance(metric: string, value: number, details?: any) {
    this.winston.info(`Performance: ${metric}`, {
      metric,
      value,
      unit: details?.unit || "ms",
      ...details,
      timestamp: new Date().toISOString(),
    });
  }

  // System events
  logSystem(event: string, details?: any) {
    this.winston.info(`System: ${event}`, {
      event,
      ...details,
      timestamp: new Date().toISOString(),
    });
  }

  // Frontend error logging (from client)
  logClientError(errorData: any) {
    this.winston.error("Client Error", {
      source: "frontend",
      ...errorData,
      serverTimestamp: new Date().toISOString(),
    });
  }

  // Export logs
  async exportLogs(
    startDate?: string,
    endDate?: string,
    level?: string
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const options: any = {
        from: startDate
          ? new Date(startDate)
          : new Date(Date.now() - 24 * 60 * 60 * 1000),
        until: endDate ? new Date(endDate) : new Date(),
        limit: 1000,
        start: 0,
        order: "desc",
      };

      if (level) {
        options.level = level;
      }

      this.winston.query(options, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.file || []);
        }
      });
    });
  }

  // Get log stats
  getLogStats(): any {
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
  }

  // Clean old logs
  cleanOldLogs(daysToKeep = 30) {
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
  }
}

// Singleton instance
export const appLogger = AppLogger.getInstance();

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
