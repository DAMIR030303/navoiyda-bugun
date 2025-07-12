import { Router, Request, Response } from "express";
import { db } from "../config/database";
import {
  authenticateToken,
  authorizeRoles,
  AuthRequest,
} from "../middleware/auth";
import { AppError, asyncHandler } from "../middleware/errorHandler";
import { UserRole, TaskStatus, TaskPriority, PaginatedRequest } from "../types";

const router = Router();

// Get all tasks
router.get(
  "/",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      priority,
      assignedTo,
    }: PaginatedRequest & {
      status?: TaskStatus;
      priority?: TaskPriority;
      assignedTo?: string;
    } = req.query;

    let tasks = db.getTasks();

    // Filter by assigned user if not admin
    if (
      ![UserRole.FOUNDER, UserRole.CEO, UserRole.ADMIN].includes(
        req.user?.role as UserRole
      )
    ) {
      tasks = tasks.filter((task) =>
        task.assignedTo.includes(req.user?.userId || "")
      );
    }

    // Search filter
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Status filter
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // Priority filter
    if (priority) {
      tasks = tasks.filter((task) => task.priority === priority);
    }

    // Assigned to filter
    if (assignedTo) {
      tasks = tasks.filter((task) => task.assignedTo.includes(assignedTo));
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedTasks = tasks.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedTasks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: tasks.length,
        totalPages: Math.ceil(tasks.length / Number(limit)),
        hasNext: endIndex < tasks.length,
        hasPrev: startIndex > 0,
      },
    });
  })
);

// Get task by ID
router.get(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const task = db.getTaskById(id);
    if (!task) {
      throw new AppError("Vazifa topilmadi", 404);
    }

    // Check if user can view this task
    if (
      ![UserRole.FOUNDER, UserRole.CEO, UserRole.ADMIN].includes(
        req.user?.role as UserRole
      ) &&
      !task.assignedTo.includes(req.user?.userId || "") &&
      task.assignedBy !== req.user?.userId
    ) {
      throw new AppError("Bu vazifani ko'rish uchun ruxsat yo'q", 403);
    }

    res.json({
      success: true,
      data: task,
    });
  })
);

// Create new task
router.post(
  "/",
  authenticateToken,
  authorizeRoles(
    UserRole.FOUNDER,
    UserRole.CEO,
    UserRole.PROJECT_MANAGER,
    UserRole.ADMIN
  ),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, description, priority, assignedTo, dueDate, tags } =
      req.body;

    if (!title || !priority || !assignedTo || assignedTo.length === 0) {
      throw new AppError(
        "Sarlavha, muhimlik darajasi va tayinlangan foydalanuvchilar talab qilinadi",
        400
      );
    }

    const newTask = db.createTask({
      title,
      description,
      status: TaskStatus.TODO,
      priority,
      assignedTo,
      assignedBy: req.user?.userId || "",
      dueDate,
      tags,
    });

    res.status(201).json({
      success: true,
      data: newTask,
      message: "Vazifa muvaffaqiyatli yaratildi",
    });
  })
);

// Update task
router.put(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, status, priority, assignedTo, dueDate, tags } =
      req.body;

    const task = db.getTaskById(id);
    if (!task) {
      throw new AppError("Vazifa topilmadi", 404);
    }

    // Check permissions
    const canEdit =
      [
        UserRole.FOUNDER,
        UserRole.CEO,
        UserRole.PROJECT_MANAGER,
        UserRole.ADMIN,
      ].includes(req.user?.role as UserRole) ||
      task.assignedBy === req.user?.userId ||
      task.assignedTo.includes(req.user?.userId || "");

    if (!canEdit) {
      throw new AppError("Bu vazifani tahrirlash uchun ruxsat yo'q", 403);
    }

    const updatedTask = db.updateTask(id, {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      tags,
      ...(status === TaskStatus.COMPLETED && {
        completedAt: new Date().toISOString(),
      }),
    });

    if (!updatedTask) {
      throw new AppError("Vazifa topilmadi", 404);
    }

    res.json({
      success: true,
      data: updatedTask,
      message: "Vazifa yangilandi",
    });
  })
);

// Update task status
router.patch(
  "/:id/status",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !Object.values(TaskStatus).includes(status)) {
      throw new AppError("Noto'g'ri status", 400);
    }

    const task = db.getTaskById(id);
    if (!task) {
      throw new AppError("Vazifa topilmadi", 404);
    }

    // Check permissions
    const canEdit =
      [
        UserRole.FOUNDER,
        UserRole.CEO,
        UserRole.PROJECT_MANAGER,
        UserRole.ADMIN,
      ].includes(req.user?.role as UserRole) ||
      task.assignedBy === req.user?.userId ||
      task.assignedTo.includes(req.user?.userId || "");

    if (!canEdit) {
      throw new AppError("Bu vazifani tahrirlash uchun ruxsat yo'q", 403);
    }

    const updatedTask = db.updateTask(id, {
      status,
      ...(status === TaskStatus.COMPLETED && {
        completedAt: new Date().toISOString(),
      }),
    });

    if (!updatedTask) {
      throw new AppError("Vazifa topilmadi", 404);
    }

    res.json({
      success: true,
      data: updatedTask,
      message: "Vazifa holati yangilandi",
    });
  })
);

// Get my tasks
router.get(
  "/my/tasks",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
      status,
      priority,
    }: { status?: TaskStatus; priority?: TaskPriority } = req.query;

    let tasks = db.getTasksByUserId(req.user?.userId || "");

    // Status filter
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // Priority filter
    if (priority) {
      tasks = tasks.filter((task) => task.priority === priority);
    }

    res.json({
      success: true,
      data: tasks,
    });
  })
);

export default router;
