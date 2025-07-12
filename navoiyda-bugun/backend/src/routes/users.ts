import { Router, Request, Response } from "express";
import { db } from "../config/database";
import {
  authenticateToken,
  authorizeRoles,
  AuthRequest,
} from "../middleware/auth";
import { AppError, asyncHandler } from "../middleware/errorHandler";
import { UserRole, PaginatedRequest } from "../types";

const router = Router();

// Get all users (admin only)
router.get(
  "/",
  authenticateToken,
  authorizeRoles(UserRole.FOUNDER, UserRole.CEO, UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "firstName",
      sortOrder = "asc",
    }: PaginatedRequest = req.query;

    let users = db.getUsers();

    // Search filter
    if (search) {
      users = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    users.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a] || "";
      const bValue = b[sortBy as keyof typeof b] || "";

      if (sortOrder === "desc") {
        return bValue.toString().localeCompare(aValue.toString());
      }
      return aValue.toString().localeCompare(bValue.toString());
    });

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedUsers = users.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: users.length,
        totalPages: Math.ceil(users.length / Number(limit)),
        hasNext: endIndex < users.length,
        hasPrev: startIndex > 0,
      },
    });
  })
);

// Get user by ID
router.get(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    // Users can only view their own profile unless they are admin
    if (
      req.user?.userId !== id &&
      ![UserRole.FOUNDER, UserRole.CEO, UserRole.ADMIN].includes(
        req.user?.role as UserRole
      )
    ) {
      throw new AppError("Bu ma'lumotlarni ko'rish uchun ruxsat yo'q", 403);
    }

    const user = db.getUserById(id);
    if (!user) {
      throw new AppError("Foydalanuvchi topilmadi", 404);
    }

    res.json({
      success: true,
      data: user,
    });
  })
);

// Create new user (admin only)
router.post(
  "/",
  authenticateToken,
  authorizeRoles(UserRole.FOUNDER, UserRole.CEO, UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    const {
      username,
      email,
      firstName,
      lastName,
      role,
      department,
      position,
      phone,
    } = req.body;

    if (!username || !email || !firstName || !lastName || !role) {
      throw new AppError("Barcha majburiy maydonlar to'ldirilishi kerak", 400);
    }

    // Check if username already exists
    const existingUser = db.getUserByUsername(username);
    if (existingUser) {
      throw new AppError("Bu username allaqachon mavjud", 409);
    }

    const newUser = db.createUser({
      username,
      email,
      firstName,
      lastName,
      role,
      department,
      position,
      phone,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      data: newUser,
      message: "Foydalanuvchi muvaffaqiyatli yaratildi",
    });
  })
);

// Update user
router.put(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, department, position } =
      req.body;

    // Users can only update their own profile unless they are admin
    if (
      req.user?.userId !== id &&
      ![UserRole.FOUNDER, UserRole.CEO, UserRole.ADMIN].includes(
        req.user?.role as UserRole
      )
    ) {
      throw new AppError(
        "Bu ma'lumotlarni o'zgartirish uchun ruxsat yo'q",
        403
      );
    }

    const updatedUser = db.updateUser(id, {
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
    });

    if (!updatedUser) {
      throw new AppError("Foydalanuvchi topilmadi", 404);
    }

    res.json({
      success: true,
      data: updatedUser,
      message: "Foydalanuvchi ma'lumotlari yangilandi",
    });
  })
);

// Deactivate user (admin only)
router.patch(
  "/:id/deactivate",
  authenticateToken,
  authorizeRoles(UserRole.FOUNDER, UserRole.CEO, UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedUser = db.updateUser(id, { isActive: false });

    if (!updatedUser) {
      throw new AppError("Foydalanuvchi topilmadi", 404);
    }

    res.json({
      success: true,
      data: updatedUser,
      message: "Foydalanuvchi faolsizlashtirildi",
    });
  })
);

// Activate user (admin only)
router.patch(
  "/:id/activate",
  authenticateToken,
  authorizeRoles(UserRole.FOUNDER, UserRole.CEO, UserRole.ADMIN),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedUser = db.updateUser(id, { isActive: true });

    if (!updatedUser) {
      throw new AppError("Foydalanuvchi topilmadi", 404);
    }

    res.json({
      success: true,
      data: updatedUser,
      message: "Foydalanuvchi faollashtirildi",
    });
  })
);

export default router;
