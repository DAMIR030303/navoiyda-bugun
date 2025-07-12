import express from "express";
import { appLogger } from "../utils/logger";
import { authMiddleware } from "../middleware/auth";
import { body, query, validationResult } from "express-validator";

const router = express.Router();

// Client error logging endpoint
router.post(
  "/",
  [
    body("level").isIn(["info", "warn", "error", "debug"]),
    body("message").notEmpty().trim(),
    body("data").optional(),
    body("userId").optional(),
    body("sessionId").optional(),
    body("url").optional(),
    body("userAgent").optional(),
    body("stack").optional(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      // Frontend dan kelgan xatolikni log qilish
      appLogger.logClientError(req.body);

      res.json({
        success: true,
        message: "Log saved successfully",
      });
    } catch (error) {
      appLogger.error("Error saving client log", { error: error.message });
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Get logs (admin only)
router.get(
  "/",
  authMiddleware,
  [
    query("startDate").optional().isISO8601(),
    query("endDate").optional().isISO8601(),
    query("level").optional().isIn(["info", "warn", "error", "debug", "http"]),
    query("limit").optional().isInt({ min: 1, max: 1000 }),
    query("page").optional().isInt({ min: 1 }),
  ],
  async (req, res) => {
    try {
      // Check if user is admin
      if (req.user?.role !== "admin" && req.user?.role !== "founder") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin privileges required.",
        });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { startDate, endDate, level, limit = 100, page = 1 } = req.query;

      const logs = await appLogger.exportLogs(
        startDate as string,
        endDate as string,
        level as string
      );

      // Pagination
      const startIndex = (Number(page) - 1) * Number(limit);
      const endIndex = startIndex + Number(limit);
      const paginatedLogs = logs.slice(startIndex, endIndex);

      appLogger.logBusiness("Logs Retrieved", {
        userId: req.user?.id,
        filters: { startDate, endDate, level },
        resultCount: paginatedLogs.length,
      });

      res.json({
        success: true,
        data: {
          logs: paginatedLogs,
          pagination: {
            total: logs.length,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(logs.length / Number(limit)),
          },
        },
      });
    } catch (error) {
      appLogger.error("Error retrieving logs", {
        error: error.message,
        userId: req.user?.id,
      });
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Get log statistics (admin only)
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== "admin" && req.user?.role !== "founder") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const stats = appLogger.getLogStats();

    appLogger.logBusiness("Log Stats Retrieved", {
      userId: req.user?.id,
      stats: {
        totalFiles: stats.totalFiles,
        totalSize: stats.totalSize,
      },
    });

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    appLogger.error("Error retrieving log stats", {
      error: error.message,
      userId: req.user?.id,
    });
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Export logs as file (admin only)
router.get(
  "/export",
  authMiddleware,
  [
    query("startDate").optional().isISO8601(),
    query("endDate").optional().isISO8601(),
    query("level").optional().isIn(["info", "warn", "error", "debug", "http"]),
    query("format").optional().isIn(["json", "csv"]),
  ],
  async (req, res) => {
    try {
      // Check if user is admin
      if (req.user?.role !== "admin" && req.user?.role !== "founder") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin privileges required.",
        });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { startDate, endDate, level, format = "json" } = req.query;

      const logs = await appLogger.exportLogs(
        startDate as string,
        endDate as string,
        level as string
      );

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `logs_export_${timestamp}.${format}`;

      if (format === "csv") {
        // Convert to CSV
        const csvHeaders = "Timestamp,Level,Message,UserId,URL,IP,UserAgent\n";
        const csvData = logs
          .map((log) => {
            return [
              log.timestamp,
              log.level,
              `"${log.message.replace(/"/g, '""')}"`,
              log.userId || "",
              log.url || "",
              log.ip || "",
              `"${(log.userAgent || "").replace(/"/g, '""')}"`,
            ].join(",");
          })
          .join("\n");

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${filename}`
        );
        res.send(csvHeaders + csvData);
      } else {
        // JSON format
        res.setHeader("Content-Type", "application/json");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${filename}`
        );
        res.json(logs);
      }

      appLogger.logBusiness("Logs Exported", {
        userId: req.user?.id,
        format,
        filters: { startDate, endDate, level },
        exportCount: logs.length,
      });
    } catch (error) {
      appLogger.error("Error exporting logs", {
        error: error.message,
        userId: req.user?.id,
      });
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Clean old logs (admin only)
router.delete(
  "/cleanup",
  authMiddleware,
  [body("daysToKeep").optional().isInt({ min: 1, max: 365 })],
  async (req, res) => {
    try {
      // Check if user is admin
      if (req.user?.role !== "admin" && req.user?.role !== "founder") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin privileges required.",
        });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { daysToKeep = 30 } = req.body;
      const cleanedCount = appLogger.cleanOldLogs(daysToKeep);

      appLogger.logBusiness("Log Cleanup Performed", {
        userId: req.user?.id,
        daysToKeep,
        cleanedCount,
      });

      res.json({
        success: true,
        message: `Successfully cleaned ${cleanedCount} old log files`,
        data: {
          cleanedCount,
          daysToKeep,
        },
      });
    } catch (error) {
      appLogger.error("Error cleaning logs", {
        error: error.message,
        userId: req.user?.id,
      });
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Get real-time logs (WebSocket endpoint info)
router.get("/realtime-info", authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user?.role !== "admin" && req.user?.role !== "founder") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    res.json({
      success: true,
      message: "Real-time logs available via WebSocket",
      data: {
        websocketUrl: `ws://${req.get("host")}/ws/logs`,
        supportedEvents: ["error", "warn", "security", "auth"],
        authentication: "JWT token required in connection headers",
      },
    });
  } catch (error) {
    appLogger.error("Error getting realtime info", {
      error: error.message,
      userId: req.user?.id,
    });
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// System health check with logs
router.get("/health", async (req, res) => {
  try {
    const stats = appLogger.getLogStats();
    const recentErrors = await appLogger.exportLogs(
      new Date(Date.now() - 60 * 60 * 1000).toISOString(), // Last hour
      undefined,
      "error"
    );

    res.json({
      success: true,
      data: {
        logSystem: {
          status: "healthy",
          totalLogFiles: stats.totalFiles,
          totalLogSize: stats.totalSize,
          recentErrors: recentErrors.length,
        },
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    appLogger.error("Error in logs health check", { error: error.message });
    res.status(500).json({
      success: false,
      message: "Log system health check failed",
    });
  }
});

export default router;
