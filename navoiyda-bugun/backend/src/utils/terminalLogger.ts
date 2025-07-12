import { appLogger } from "./logger";
import { spawn, exec } from "child_process";
import fs from "fs";
import path from "path";

// Terminal session logger
export class TerminalLogger {
  private static instance: TerminalLogger;
  private sessionId: string;
  private logFile: string;
  private isCapturing: boolean = false;

  private constructor() {
    this.sessionId = `terminal_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.logFile = path.join("logs", `terminal_${this.sessionId}.log`);
    this.setupTerminalCapture();
  }

  public static getInstance(): TerminalLogger {
    if (!TerminalLogger.instance) {
      TerminalLogger.instance = new TerminalLogger();
    }
    return TerminalLogger.instance;
  }

  private setupTerminalCapture() {
    // Console.log'ni override qilish
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    console.log = (...args) => {
      this.logTerminalOutput("log", args);
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      this.logTerminalOutput("error", args);
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      this.logTerminalOutput("warn", args);
      originalWarn.apply(console, args);
    };

    console.info = (...args) => {
      this.logTerminalOutput("info", args);
      originalInfo.apply(console, args);
    };

    // Process events
    process.on("exit", (code) => {
      this.logProcessEvent("exit", { code });
    });

    process.on("SIGINT", () => {
      this.logProcessEvent("SIGINT", { signal: "SIGINT" });
    });

    process.on("SIGTERM", () => {
      this.logProcessEvent("SIGTERM", { signal: "SIGTERM" });
    });

    process.on("uncaughtException", (error) => {
      this.logProcessEvent("uncaughtException", {
        error: error.message,
        stack: error.stack,
      });
    });

    process.on("unhandledRejection", (reason, promise) => {
      this.logProcessEvent("unhandledRejection", {
        reason: reason,
        promise: promise,
      });
    });

    appLogger.info("Terminal Logger initialized", {
      sessionId: this.sessionId,
      logFile: this.logFile,
    });
  }

  private logTerminalOutput(level: string, args: any[]) {
    const timestamp = new Date().toISOString();
    const message = args
      .map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg) : String(arg)
      )
      .join(" ");

    const logEntry = {
      timestamp,
      sessionId: this.sessionId,
      level,
      type: "terminal_output",
      message,
      args: args.length > 0 ? args : undefined,
    };

    // File ga yozish
    this.writeToFile(logEntry);

    // Main logger ga yuborish
    appLogger.info("Terminal Output", logEntry);
  }

  private logProcessEvent(event: string, data: any) {
    const timestamp = new Date().toISOString();

    const logEntry = {
      timestamp,
      sessionId: this.sessionId,
      level: "info",
      type: "process_event",
      event,
      data,
    };

    this.writeToFile(logEntry);
    appLogger.info(`Process Event: ${event}`, logEntry);
  }

  private writeToFile(entry: any) {
    try {
      const logLine = JSON.stringify(entry) + "\n";
      fs.appendFileSync(this.logFile, logLine);
    } catch (error) {
      appLogger.error("Failed to write terminal log", { error: error.message });
    }
  }

  // Command execution with logging
  public executeCommand(
    command: string,
    options: any = {}
  ): Promise<{ stdout: string; stderr: string; code: number }> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      this.logCommandStart(command, options);

      exec(command, options, (error, stdout, stderr) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        if (error) {
          this.logCommandError(command, error, duration);
          reject({
            stdout: stdout || "",
            stderr: stderr || error.message,
            code: error.code || 1,
            duration,
          });
        } else {
          this.logCommandSuccess(command, stdout, stderr, duration);
          resolve({
            stdout: stdout || "",
            stderr: stderr || "",
            code: 0,
            duration,
          });
        }
      });
    });
  }

  private logCommandStart(command: string, options: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "command_start",
      command,
      options,
      pid: process.pid,
    };

    this.writeToFile(logEntry);
    appLogger.info(`Command Start: ${command}`, logEntry);
  }

  private logCommandSuccess(
    command: string,
    stdout: string,
    stderr: string,
    duration: number
  ) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "command_success",
      command,
      stdout: stdout.substring(0, 1000), // Limit output
      stderr: stderr.substring(0, 1000),
      duration,
      pid: process.pid,
    };

    this.writeToFile(logEntry);
    appLogger.info(`Command Success: ${command}`, logEntry);
  }

  private logCommandError(command: string, error: any, duration: number) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "command_error",
      command,
      error: error.message,
      code: error.code,
      signal: error.signal,
      duration,
      pid: process.pid,
    };

    this.writeToFile(logEntry);
    appLogger.error(`Command Error: ${command}`, logEntry);
  }

  // HTTP request/response logging
  public logHttpRequest(req: any, res: any, responseTime: number) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "http_request",
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
      userId: req.user?.id,
      userRole: req.user?.role,
      headers: {
        "content-type": req.get("Content-Type"),
        authorization: req.get("Authorization") ? "[REDACTED]" : undefined,
      },
      body:
        req.method === "POST" && req.body
          ? JSON.stringify(req.body).substring(0, 500)
          : undefined,
    };

    this.writeToFile(logEntry);

    if (res.statusCode >= 400) {
      appLogger.error(
        `HTTP ${res.statusCode}: ${req.method} ${req.originalUrl}`,
        logEntry
      );
    } else {
      appLogger.info(
        `HTTP ${res.statusCode}: ${req.method} ${req.originalUrl}`,
        logEntry
      );
    }
  }

  // Database query logging
  public logDatabaseQuery(
    query: string,
    params: any[],
    duration: number,
    error?: Error
  ) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "database_query",
      query: query.substring(0, 200),
      params: params.length > 0 ? params : undefined,
      duration,
      error: error
        ? {
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    };

    this.writeToFile(logEntry);

    if (error) {
      appLogger.error("Database Query Error", logEntry);
    } else {
      appLogger.debug("Database Query", logEntry);
    }
  }

  // User action logging
  public logUserAction(action: string, userId: string, details: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "user_action",
      action,
      userId,
      details,
    };

    this.writeToFile(logEntry);
    appLogger.info(`User Action: ${action}`, logEntry);
  }

  // Button click logging
  public logButtonClick(
    buttonId: string,
    userId: string,
    page: string,
    success: boolean,
    error?: string
  ) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "button_click",
      buttonId,
      userId,
      page,
      success,
      error: error || undefined,
    };

    this.writeToFile(logEntry);

    if (!success) {
      appLogger.error(`Button Click Failed: ${buttonId}`, logEntry);
    } else {
      appLogger.info(`Button Click: ${buttonId}`, logEntry);
    }
  }

  // Mobile testing events
  public logMobileEvent(event: string, deviceInfo: any, details: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "mobile_event",
      event,
      deviceInfo: {
        userAgent: deviceInfo.userAgent,
        platform: deviceInfo.platform,
        screenSize: deviceInfo.screenSize,
        touchSupport: deviceInfo.touchSupport,
      },
      details,
    };

    this.writeToFile(logEntry);
    appLogger.info(`Mobile Event: ${event}`, logEntry);
  }

  // Performance metrics
  public logPerformanceMetric(metric: string, value: number, context: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      type: "performance_metric",
      metric,
      value,
      context,
    };

    this.writeToFile(logEntry);
    appLogger.info(`Performance: ${metric}`, logEntry);
  }

  // Get session logs
  public getSessionLogs(): any[] {
    try {
      if (!fs.existsSync(this.logFile)) {
        return [];
      }

      const content = fs.readFileSync(this.logFile, "utf8");
      const lines = content.trim().split("\n");

      return lines
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
    } catch (error) {
      appLogger.error("Failed to read session logs", { error: error.message });
      return [];
    }
  }

  // Export session logs
  public exportSessionLogs(): string {
    const logs = this.getSessionLogs();
    return JSON.stringify(logs, null, 2);
  }

  // Clean up
  public cleanup() {
    try {
      if (fs.existsSync(this.logFile)) {
        fs.unlinkSync(this.logFile);
      }
    } catch (error) {
      appLogger.error("Failed to cleanup terminal logs", {
        error: error.message,
      });
    }
  }
}

// Export singleton instance
export const terminalLogger = TerminalLogger.getInstance();

// Express middleware for request logging
export const terminalRequestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    terminalLogger.logHttpRequest(req, res, responseTime);
  });

  next();
};

export default terminalLogger;
