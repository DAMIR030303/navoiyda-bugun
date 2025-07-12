import { logger } from "./logger";

interface MobileDeviceInfo {
  userAgent: string;
  platform: string;
  screenSize: {
    width: number;
    height: number;
  };
  touchSupport: boolean;
  orientation: string;
  devicePixelRatio: number;
  connection?: any;
}

interface TouchEvent {
  type: string;
  target: string;
  timestamp: number;
  coordinates: {
    x: number;
    y: number;
  };
  pressure?: number;
}

interface ButtonClickEvent {
  buttonId: string;
  buttonText: string;
  page: string;
  success: boolean;
  error?: string;
  responseTime: number;
}

class MobileLogger {
  private static instance: MobileLogger;
  private deviceInfo: MobileDeviceInfo;
  private touchEvents: TouchEvent[] = [];
  private buttonClicks: ButtonClickEvent[] = [];
  private isInitialized: boolean = false;

  private constructor() {
    this.deviceInfo = this.getDeviceInfo();
    this.initializeMobileLogging();
  }

  public static getInstance(): MobileLogger {
    if (!MobileLogger.instance) {
      MobileLogger.instance = new MobileLogger();
    }
    return MobileLogger.instance;
  }

  private getDeviceInfo(): MobileDeviceInfo {
    const info: MobileDeviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenSize: {
        width: window.screen.width,
        height: window.screen.height,
      },
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      orientation: window.screen.orientation?.type || "unknown",
      devicePixelRatio: window.devicePixelRatio || 1,
    };

    // Network information
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      info.connection = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      };
    }

    return info;
  }

  private initializeMobileLogging() {
    if (this.isInitialized) return;

    // Device info logging
    logger.info("Mobile Device Detected", this.deviceInfo);

    // Touch events
    this.setupTouchEventLogging();

    // Button click monitoring
    this.setupButtonClickMonitoring();

    // Orientation change
    this.setupOrientationLogging();

    // Network status
    this.setupNetworkLogging();

    // Performance monitoring
    this.setupPerformanceMonitoring();

    // Error monitoring
    this.setupErrorMonitoring();

    this.isInitialized = true;
    logger.info("Mobile Logger initialized");
  }

  private setupTouchEventLogging() {
    ["touchstart", "touchmove", "touchend", "touchcancel"].forEach(
      (eventType) => {
        document.addEventListener(
          eventType,
          (event) => {
            this.logTouchEvent(event as any);
          },
          { passive: true }
        );
      }
    );

    // Click events for non-touch devices
    document.addEventListener("click", (event) => {
      this.logClickEvent(event);
    });
  }

  private logTouchEvent(event: any) {
    const touch = event.touches[0] || event.changedTouches[0];
    if (!touch) return;

    const touchEvent: TouchEvent = {
      type: event.type,
      target: this.getElementSelector(event.target),
      timestamp: Date.now(),
      coordinates: {
        x: touch.clientX,
        y: touch.clientY,
      },
      pressure: touch.force,
    };

    this.touchEvents.push(touchEvent);

    // Keep only last 100 touch events
    if (this.touchEvents.length > 100) {
      this.touchEvents = this.touchEvents.slice(-100);
    }

    logger.debug("Touch Event", touchEvent);
  }

  private logClickEvent(event: MouseEvent) {
    const clickEvent = {
      type: "click",
      target: this.getElementSelector(event.target as Element),
      timestamp: Date.now(),
      coordinates: {
        x: event.clientX,
        y: event.clientY,
      },
      button: event.button,
    };

    logger.debug("Click Event", clickEvent);
  }

  private setupButtonClickMonitoring() {
    // Monitor all button clicks
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      // Check if clicked element is a button or has button-like behavior
      if (this.isButtonElement(target)) {
        this.logButtonClick(target, event);
      }
    });
  }

  private isButtonElement(element: HTMLElement): boolean {
    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute("role");
    const type = element.getAttribute("type");

    return (
      tagName === "button" ||
      (tagName === "input" && type === "button") ||
      (tagName === "input" && type === "submit") ||
      role === "button" ||
      element.classList.contains("btn") ||
      element.classList.contains("button") ||
      element.onclick !== null
    );
  }

  private async logButtonClick(button: HTMLElement, event: MouseEvent) {
    const startTime = Date.now();
    const buttonInfo = {
      id: button.id || "unknown",
      text: button.textContent?.trim() || "unknown",
      className: button.className,
      page: window.location.pathname,
    };

    try {
      // Log button click start
      logger.info("Button Click Start", {
        ...buttonInfo,
        coordinates: { x: event.clientX, y: event.clientY },
        deviceInfo: this.deviceInfo,
      });

      // Wait for potential state changes
      await new Promise((resolve) => setTimeout(resolve, 100));

      const responseTime = Date.now() - startTime;
      const success = !this.hasRecentErrors();

      const clickEvent: ButtonClickEvent = {
        buttonId: buttonInfo.id,
        buttonText: buttonInfo.text,
        page: buttonInfo.page,
        success,
        responseTime,
      };

      if (!success) {
        clickEvent.error = "Button click may have caused an error";
      }

      this.buttonClicks.push(clickEvent);

      // Keep only last 50 button clicks
      if (this.buttonClicks.length > 50) {
        this.buttonClicks = this.buttonClicks.slice(-50);
      }

      // Log to server
      logger.info("Button Click Complete", {
        ...clickEvent,
        deviceInfo: this.deviceInfo,
      });

      // Send to backend
      this.sendButtonClickToServer(clickEvent);
    } catch (error) {
      const responseTime = Date.now() - startTime;

      const clickEvent: ButtonClickEvent = {
        buttonId: buttonInfo.id,
        buttonText: buttonInfo.text,
        page: buttonInfo.page,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        responseTime,
      };

      this.buttonClicks.push(clickEvent);

      logger.error("Button Click Error", {
        ...clickEvent,
        deviceInfo: this.deviceInfo,
        stack: error instanceof Error ? error.stack : undefined,
      });

      this.sendButtonClickToServer(clickEvent);
    }
  }

  private async sendButtonClickToServer(clickEvent: ButtonClickEvent) {
    try {
      await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          level: clickEvent.success ? "info" : "error",
          message: `Mobile Button Click: ${clickEvent.buttonId}`,
          data: {
            type: "mobile_button_click",
            ...clickEvent,
            deviceInfo: this.deviceInfo,
          },
          userId: this.getCurrentUserId(),
          sessionId: logger.getSystemInfo().sessionId,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      logger.error("Failed to send button click to server", { error });
    }
  }

  private hasRecentErrors(): boolean {
    const recentLogs = logger.getLogs("error");
    const fiveSecondsAgo = Date.now() - 5000;

    return recentLogs.some((log) => {
      const logTime = new Date(log.timestamp).getTime();
      return logTime > fiveSecondsAgo;
    });
  }

  private setupOrientationLogging() {
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        const newOrientation = window.screen.orientation?.type || "unknown";
        logger.info("Orientation Changed", {
          orientation: newOrientation,
          screenSize: {
            width: window.screen.width,
            height: window.screen.height,
          },
          deviceInfo: this.deviceInfo,
        });
      }, 100);
    });
  }

  private setupNetworkLogging() {
    // Online/offline events
    window.addEventListener("online", () => {
      logger.info("Network Status: Online", { deviceInfo: this.deviceInfo });
    });

    window.addEventListener("offline", () => {
      logger.warn("Network Status: Offline", { deviceInfo: this.deviceInfo });
    });

    // Connection change
    if ("connection" in navigator) {
      (navigator as any).connection.addEventListener("change", () => {
        const connection = (navigator as any).connection;
        logger.info("Connection Changed", {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
          deviceInfo: this.deviceInfo,
        });
      });
    }
  }

  private setupPerformanceMonitoring() {
    // Page load performance
    window.addEventListener("load", () => {
      setTimeout(() => {
        if (window.performance && window.performance.navigation) {
          const perfData = window.performance.getEntriesByType(
            "navigation"
          )[0] as PerformanceNavigationTiming;

          logger.info("Mobile Page Load Performance", {
            loadTime: perfData.loadEventEnd - perfData.fetchStart,
            domContentLoaded:
              perfData.domContentLoadedEventEnd - perfData.fetchStart,
            firstPaint: perfData.responseEnd - perfData.fetchStart,
            deviceInfo: this.deviceInfo,
          });
        }
      }, 1000);
    });

    // Memory usage (if available)
    if ("memory" in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        logger.debug("Memory Usage", {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          deviceInfo: this.deviceInfo,
        });
      }, 30000); // Every 30 seconds
    }
  }

  private setupErrorMonitoring() {
    // Mobile-specific error handling
    window.addEventListener("error", (event) => {
      logger.error("Mobile JavaScript Error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        deviceInfo: this.deviceInfo,
      });
    });

    // Unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      logger.error("Mobile Unhandled Promise Rejection", {
        reason: event.reason,
        stack: event.reason?.stack,
        deviceInfo: this.deviceInfo,
      });
    });
  }

  private getElementSelector(element: Element | null): string {
    if (!element) return "unknown";

    let selector = element.tagName.toLowerCase();

    if (element.id) {
      selector += `#${element.id}`;
    }

    if (element.className) {
      // Handle both string and DOMTokenList
      const classNames =
        typeof element.className === "string"
          ? element.className
          : element.className.toString();

      const classes = classNames.split(" ").filter((c) => c.trim());
      if (classes.length > 0) {
        selector += `.${classes.join(".")}`;
      }
    }

    return selector;
  }

  private getCurrentUserId(): string | undefined {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.id;
    } catch {
      return undefined;
    }
  }

  // Public methods
  public logMobileEvent(event: string, data: any) {
    logger.info(`Mobile Event: ${event}`, {
      ...data,
      deviceInfo: this.deviceInfo,
    });
  }

  public logFormSubmission(formId: string, success: boolean, error?: string) {
    logger.info("Mobile Form Submission", {
      formId,
      success,
      error,
      deviceInfo: this.deviceInfo,
    });
  }

  public logNavigationEvent(from: string, to: string) {
    logger.info("Mobile Navigation", {
      from,
      to,
      deviceInfo: this.deviceInfo,
    });
  }

  public getTouchEvents(): TouchEvent[] {
    return [...this.touchEvents];
  }

  public getButtonClicks(): ButtonClickEvent[] {
    return [...this.buttonClicks];
  }

  public exportMobileLogs(): string {
    return JSON.stringify(
      {
        deviceInfo: this.deviceInfo,
        touchEvents: this.touchEvents,
        buttonClicks: this.buttonClicks,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    );
  }

  // Test specific buttons
  public testButton(buttonSelector: string): Promise<boolean> {
    return new Promise((resolve) => {
      const button = document.querySelector(buttonSelector) as HTMLElement;
      if (!button) {
        logger.error("Button not found for testing", {
          selector: buttonSelector,
        });
        resolve(false);
        return;
      }

      const startTime = Date.now();
      logger.info("Testing Button", {
        selector: buttonSelector,
        deviceInfo: this.deviceInfo,
      });

      // Simulate click
      button.click();

      // Wait and check for errors
      setTimeout(() => {
        const success = !this.hasRecentErrors();
        const responseTime = Date.now() - startTime;

        logger.info("Button Test Complete", {
          selector: buttonSelector,
          success,
          responseTime,
          deviceInfo: this.deviceInfo,
        });

        resolve(success);
      }, 1000);
    });
  }
}

// Export singleton instance
export const mobileLogger = MobileLogger.getInstance();

// Auto-initialize on mobile devices
if (typeof window !== "undefined") {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isMobile || isTouch) {
    mobileLogger; // Initialize singleton
  }
}

export default mobileLogger;
