import { Router, Request, Response } from "express";
import { db } from "../config/database";
import {
  generateToken,
  generateRefreshToken,
  AuthRequest,
  authenticateToken,
} from "../middleware/auth";
import { AppError, asyncHandler } from "../middleware/errorHandler";
import { LoginCredentials, AuthResponse } from "../types";

const router = Router();

// Login
router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password }: LoginCredentials = req.body;

    if (!username || !password) {
      throw new AppError("Username va password talab qilinadi", 400);
    }

    // Mock password check (in real app, use bcrypt)
    const user = db.getUserByUsername(username);
    if (!user || password !== "123456") {
      throw new AppError("Noto'g'ri login yoki parol", 401);
    }

    if (!user.isActive) {
      throw new AppError("Foydalanuvchi faol emas", 401);
    }

    // Update last login
    db.updateUser(user.id, { lastLogin: new Date().toISOString() });

    const tokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const response: AuthResponse = {
      user,
      token,
      refreshToken,
    };

    res.json({
      success: true,
      data: response,
      message: "Muvaffaqiyatli kirildi",
    });
  })
);

// Refresh token
router.post(
  "/refresh",
  asyncHandler(async (req: Request, _res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token talab qilinadi", 400);
    }

    // In real app, verify refresh token and generate new tokens
    throw new AppError("Refresh token funksiyasi hali ishlab chiqilmagan", 501);
  })
);

// Get current user
router.get(
  "/me",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Foydalanuvchi topilmadi", 404);
    }

    const user = db.getUserById(req.user.userId);
    if (!user) {
      throw new AppError("Foydalanuvchi topilmadi", 404);
    }

    res.json({
      success: true,
      data: user,
    });
  })
);

// Update profile
router.put(
  "/profile",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Foydalanuvchi topilmadi", 404);
    }

    const { firstName, lastName, email, phone } = req.body;
    const updatedUser = db.updateUser(req.user.userId, {
      firstName,
      lastName,
      email,
      phone,
    });

    if (!updatedUser) {
      throw new AppError("Foydalanuvchi topilmadi", 404);
    }

    res.json({
      success: true,
      data: updatedUser,
      message: "Profil yangilandi",
    });
  })
);

// Logout
router.post(
  "/logout",
  authenticateToken,
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    // In real app, blacklist the token or remove from database
    res.json({
      success: true,
      message: "Muvaffaqiyatli chiqildi",
    });
  })
);

export default router;
