import { api } from "./apiClient";
import { Notification, ApiResponse, Pagination } from "@/types";

export const notificationService = {
  // Get all notifications
  getNotifications: async (params?: {
    page?: number;
    limit?: number;
    isRead?: boolean;
    type?: string;
  }): Promise<ApiResponse<Notification[]>> => {
    const response = await api.get<ApiResponse<Notification[]>>(
      "/notifications",
      { params }
    );
    return response.data;
  },

  // Get notification by ID
  getNotification: async (id: string): Promise<Notification> => {
    const response = await api.get<Notification>(`/notifications/${id}`);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`/notifications/${id}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    await api.patch("/notifications/read-all");
  },

  // Delete notification
  deleteNotification: async (id: string): Promise<void> => {
    await api.delete(`/notifications/${id}`);
  },

  // Delete all notifications
  deleteAllNotifications: async (): Promise<void> => {
    await api.delete("/notifications");
  },

  // Get unread count
  getUnreadCount: async (): Promise<number> => {
    const response = await api.get<{ count: number }>(
      "/notifications/unread-count"
    );
    return response.data.count;
  },

  // Update notification settings
  updateSettings: async (settings: {
    email: boolean;
    push: boolean;
    telegram: boolean;
  }): Promise<void> => {
    await api.put("/notifications/settings", settings);
  },

  // Get notification settings
  getSettings: async (): Promise<{
    email: boolean;
    push: boolean;
    telegram: boolean;
  }> => {
    const response = await api.get("/notifications/settings");
    return response.data;
  },
};
