import { api } from "./apiClient";
import { LoginCredentials, AuthResponse, User } from "@/types";

export const authService = {
  // Login with username/password
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Mock login for testing with role-based users
    const mockUsers = [
      {
        id: "1",
        username: "founder",
        email: "founder@navoiyda.uz",
        firstName: "Asoschi",
        lastName: "Rahbar",
        role: "founder",
        department: "Boshqaruv",
        position: "Asoschi",
        avatar: null,
        phone: "+998901234567",
        employeeId: "EMP001",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        username: "ceo",
        email: "ceo@navoiyda.uz",
        firstName: "Boshqaruv",
        lastName: "Direktori",
        role: "ceo",
        department: "Boshqaruv",
        position: "Bosh direktor",
        avatar: null,
        phone: "+998901234568",
        employeeId: "EMP002",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        username: "hr_manager",
        email: "hr@navoiyda.uz",
        firstName: "HR",
        lastName: "Menejer",
        role: "hr_manager",
        department: "Kadrlar",
        position: "HR menejer",
        avatar: null,
        phone: "+998901234569",
        employeeId: "EMP003",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "4",
        username: "project_manager",
        email: "project@navoiyda.uz",
        firstName: "Loyiha",
        lastName: "Menejer",
        role: "project_manager",
        department: "Loyihalar",
        position: "Loyiha menejer",
        avatar: null,
        phone: "+998901234570",
        employeeId: "EMP004",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "5",
        username: "marketing_manager",
        email: "marketing@navoiyda.uz",
        firstName: "Marketing",
        lastName: "Menejer",
        role: "marketing_manager",
        department: "Marketing",
        position: "Marketing menejer",
        avatar: null,
        phone: "+998901234571",
        employeeId: "EMP005",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "6",
        username: "sales_manager",
        email: "sales@navoiyda.uz",
        firstName: "Sotuv",
        lastName: "Menejer",
        role: "sales_manager",
        department: "Sotuv",
        position: "Sotuv menejer",
        avatar: null,
        phone: "+998901234572",
        employeeId: "EMP006",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "7",
        username: "mobilographer",
        email: "mobilographer@navoiyda.uz",
        firstName: "Mobil",
        lastName: "Mutaxassis",
        role: "mobilographer",
        department: "Media",
        position: "Mobilograf",
        avatar: null,
        phone: "+998901234573",
        employeeId: "EMP007",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "8",
        username: "brand_face",
        email: "brand@navoiyda.uz",
        firstName: "Brend",
        lastName: "Yuzi",
        role: "brand_face",
        department: "Media",
        position: "Brend yuzi",
        avatar: null,
        phone: "+998901234574",
        employeeId: "EMP008",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "9",
        username: "screenwriter",
        email: "screenwriter@navoiyda.uz",
        firstName: "Ssenarist",
        lastName: "Mutaxassis",
        role: "screenwriter",
        department: "Media",
        position: "Ssenarist",
        avatar: null,
        phone: "+998901234575",
        employeeId: "EMP009",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "10",
        username: "admin",
        email: "admin@navoiyda.uz",
        firstName: "Tizim",
        lastName: "Administrator",
        role: "admin",
        department: "IT",
        position: "Tizim administrator",
        avatar: null,
        phone: "+998901234576",
        employeeId: "EMP010",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "11",
        username: "employee",
        email: "employee@navoiyda.uz",
        firstName: "Oddiy",
        lastName: "Xodim",
        role: "employee",
        department: "Umumiy",
        position: "Xodim",
        avatar: null,
        phone: "+998901234577",
        employeeId: "EMP011",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // Qo'shimcha test foydalanuvchilar
      {
        id: "12",
        username: "marketing",
        email: "marketing2@navoiyda.uz",
        firstName: "Marketing",
        lastName: "Mutaxassisi",
        role: "marketing_manager",
        department: "Marketing",
        position: "Marketing mutaxassisi",
        avatar: null,
        phone: "+998901234578",
        employeeId: "EMP012",
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // Login credentials ni tekshirish
    const user = mockUsers.find((u) => u.username === credentials.username);

    if (!user) {
      throw new Error("Foydalanuvchi topilmadi");
    }

    if (credentials.password !== "123456") {
      throw new Error("Noto'g'ri parol");
    }

    if (!user.isActive) {
      throw new Error("Foydalanuvchi hisobi faol emas");
    }

    // Successful login
    return {
      user: user as User,
      token: "mock-jwt-token-" + user.id,
      refreshToken: "mock-refresh-token-" + user.id,
    };

    // Real API call (commented out for testing)
    // const response = await api.post<AuthResponse>("/auth/login", credentials);
    // return response.data;
  },

  // Login with Telegram
  loginWithTelegram: async (telegramData: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/auth/telegram",
      telegramData
    );
    return response.data;
  },

  // Login with employee ID
  loginWithEmployeeId: async (employeeId: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/employee", {
      employeeId,
    });
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // Change password
  changePassword: async (
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    await api.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });
  },

  // Reset password
  resetPassword: async (email: string): Promise<void> => {
    await api.post("/auth/reset-password", { email });
  },

  // Verify email
  verifyEmail: async (token: string): Promise<void> => {
    await api.post("/auth/verify-email", { token });
  },
};
