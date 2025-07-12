interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  data?: any;
  userId?: string;
  userRole?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  stack?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupGlobalErrorHandlers();
  }

  private generateSessionId(): string {
    return (
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  private setupGlobalErrorHandlers() {
    // JavaScript xatolarini tutish
    window.addEventListener("error", (event) => {
      this.error("JavaScript Error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });

    // Promise rejection xatolarini tutish
    window.addEventListener("unhandledrejection", (event) => {
      this.error("Unhandled Promise Rejection", {
        reason: event.reason,
        stack: event.reason?.stack,
      });
    });

    // React error boundary uchun
    window.addEventListener("react-error", (event: any) => {
      this.error("React Error", {
        componentStack: event.detail?.componentStack,
        errorBoundary: event.detail?.errorBoundary,
        stack: event.detail?.error?.stack,
      });
    });
  }

  private createLogEntry(
    level: LogEntry["level"],
    message: string,
    data?: any
  ): LogEntry {
    const user = this.getCurrentUser();

    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userId: user?.id,
      userRole: user?.role,
      sessionId: this.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      stack: level === "error" ? new Error().stack : undefined,
    };
  }

  private getCurrentUser() {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);

    // Maksimal log soni
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console ga chiqarish
    this.logToConsole(entry);

    // LocalStorage ga saqlash
    this.saveToStorage();

    // Server ga yuborish (critical xatolar uchun)
    if (entry.level === "error") {
      this.sendToServer(entry);
    }
  }

  private logToConsole(entry: LogEntry) {
    const style = this.getConsoleStyle(entry.level);
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${
      entry.sessionId
    }]`;

    switch (entry.level) {
      case "error":
        console.error(`${prefix} ${entry.message}`, entry.data);
        break;
      case "warn":
        console.warn(`${prefix} ${entry.message}`, entry.data);
        break;
      case "info":
        console.info(`${prefix} ${entry.message}`, entry.data);
        break;
      case "debug":
        console.debug(`${prefix} ${entry.message}`, entry.data);
        break;
    }
  }

  private getConsoleStyle(level: string): string {
    const styles = {
      error: "color: #ff4444; font-weight: bold;",
      warn: "color: #ffaa00; font-weight: bold;",
      info: "color: #0088ff; font-weight: bold;",
      debug: "color: #888888;",
    };
    return styles[level as keyof typeof styles] || "";
  }

  private saveToStorage() {
    try {
      const recentLogs = this.logs.slice(-100); // Oxirgi 100 ta log
      localStorage.setItem("app_logs", JSON.stringify(recentLogs));
    } catch (error) {
      console.error("Log saqlashda xatolik:", error);
    }
  }

  private async sendToServer(entry: LogEntry) {
    try {
      const response = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        console.error("Server ga log yuborishda xatolik:", response.status);
      }
    } catch (error) {
      console.error("Server ga log yuborishda xatolik:", error);
    }
  }

  // Public methods
  info(message: string, data?: any) {
    this.addLog(this.createLogEntry("info", message, data));
  }

  warn(message: string, data?: any) {
    this.addLog(this.createLogEntry("warn", message, data));
  }

  error(message: string, data?: any) {
    this.addLog(this.createLogEntry("error", message, data));
  }

  debug(message: string, data?: any) {
    this.addLog(this.createLogEntry("debug", message, data));
  }

  // User actions logging
  logUserAction(action: string, data?: any) {
    this.info(`User Action: ${action}`, data);
  }

  // API calls logging
  logApiCall(
    method: string,
    url: string,
    status: number,
    responseTime: number,
    data?: any
  ) {
    const level = status >= 400 ? "error" : "info";
    this.addLog(
      this.createLogEntry(level, `API Call: ${method} ${url}`, {
        status,
        responseTime,
        ...data,
      })
    );
  }

  // Performance logging
  logPerformance(metric: string, value: number, data?: any) {
    this.info(`Performance: ${metric}`, { value, ...data });
  }

  // Route changes
  logRouteChange(from: string, to: string) {
    this.info("Route Change", { from, to });
  }

  // Login/Logout
  logAuth(action: "login" | "logout", data?: any) {
    this.info(`Auth: ${action}`, data);
  }

  // Get logs
  getLogs(level?: LogEntry["level"]): LogEntry[] {
    if (level) {
      return this.logs.filter((log) => log.level === level);
    }
    return [...this.logs];
  }

  // Export logs
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
    localStorage.removeItem("app_logs");
    this.info("Logs cleared");
  }

  // Get logs from storage
  loadLogsFromStorage(): LogEntry[] {
    try {
      const stored = localStorage.getItem("app_logs");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Get system info
  getSystemInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
      },
      window: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      },
      location: {
        href: window.location.href,
        origin: window.location.origin,
        pathname: window.location.pathname,
      },
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
    };
  }
}

// Singleton instance
export const logger = new Logger();

// React Error Boundary uchun helper
export const logReactError = (error: Error, errorInfo: any) => {
  logger.error("React Error Boundary", {
    error: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
  });
};

// Performance monitoring
export const logPageLoad = () => {
  if (typeof window !== "undefined" && window.performance) {
    const perfData = window.performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    logger.logPerformance(
      "Page Load",
      perfData.loadEventEnd - perfData.fetchStart,
      {
        domContentLoaded:
          perfData.domContentLoadedEventEnd - perfData.fetchStart,
        domInteractive: perfData.domInteractive - perfData.fetchStart,
        firstPaint: perfData.responseEnd - perfData.fetchStart,
      }
    );
  }
};

// Network monitoring
export const logNetworkStatus = () => {
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    logger.info("Network Status", {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    });
  }
};

export default logger;
