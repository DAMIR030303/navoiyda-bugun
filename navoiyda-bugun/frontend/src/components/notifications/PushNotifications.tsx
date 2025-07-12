import React, { useState, useEffect } from "react";
import { Bell, X, Check, AlertTriangle, Info, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

interface PushNotification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  actions?: NotificationAction[];
}

interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export const PushNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window && "serviceWorker" in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);
      checkSubscription();
    }

    // Load stored notifications
    loadStoredNotifications();

    // Listen for push messages
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener(
        "message",
        handleServiceWorkerMessage
      );
    }

    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener(
          "message",
          handleServiceWorkerMessage
        );
      }
    };
  }, []);

  const handleServiceWorkerMessage = (event: MessageEvent) => {
    if (event.data && event.data.type === "PUSH_RECEIVED") {
      const notification: PushNotification = {
        id: Date.now().toString(),
        title: event.data.title,
        body: event.data.body,
        icon: event.data.icon,
        timestamp: new Date().toISOString(),
        read: false,
        type: event.data.type || "info",
        data: event.data.data,
      };

      addNotification(notification);
    }
  };

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error("Failed to check subscription:", error);
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      toast.error("Bu brauzer push notifications ni qo'llab-quvvatlamaydi");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === "granted") {
        await subscribeToNotifications();
        toast.success("Push notifications yoqildi");
      } else {
        toast.error("Push notifications uchun ruxsat berilmadi");
      }
    } catch (error) {
      console.error("Failed to request permission:", error);
      toast.error("Ruxsat so'rashda xatolik yuz berdi");
    }
  };

  const subscribeToNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BEl62iUYgUivxIkv69yViEuiBIa40HI6YUKKAOCd4r7wKRrXPRKT4xIHHr6d263dJq3-8sT9hxTxzgvAKgPzKJM"
        ),
      });

      // Send subscription to server
      await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      setIsSubscribed(true);
    } catch (error) {
      console.error("Failed to subscribe:", error);
      toast.error("Obunaga yozilishda xatolik yuz berdi");
    }
  };

  const unsubscribeFromNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        // Notify server
        await fetch("/api/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
      }

      setIsSubscribed(false);
      toast.success("Push notifications o'chirildi");
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
      toast.error("Obunani bekor qilishda xatolik yuz berdi");
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const loadStoredNotifications = () => {
    try {
      const stored = localStorage.getItem("navoiyda-bugun-notifications");
      if (stored) {
        const notifications = JSON.parse(stored);
        setNotifications(notifications);
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  const saveNotifications = (notifications: PushNotification[]) => {
    try {
      localStorage.setItem(
        "navoiyda-bugun-notifications",
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error("Failed to save notifications:", error);
    }
  };

  const addNotification = (notification: PushNotification) => {
    const updated = [notification, ...notifications].slice(0, 50); // Keep only last 50
    setNotifications(updated);
    saveNotifications(updated);

    // Show browser notification if permission is granted
    if (permission === "granted") {
      new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || "/pwa-192x192.png",
        badge: "/pwa-192x192.png",
        tag: notification.tag,
        data: notification.data,
      });
    }

    // Show toast notification
    const toastMessage = `${notification.title}: ${notification.body}`;
    switch (notification.type) {
      case "success":
        toast.success(toastMessage);
        break;
      case "warning":
        toast.error(toastMessage);
        break;
      case "error":
        toast.error(toastMessage);
        break;
      default:
        toast(toastMessage);
    }
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    saveNotifications(updated);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    saveNotifications([]);
  };

  const sendTestNotification = () => {
    const testNotification: PushNotification = {
      id: Date.now().toString(),
      title: "Test Notification",
      body: "Bu test xabarnomasi. Push notifications ishlayapti!",
      timestamp: new Date().toISOString(),
      read: false,
      type: "info",
    };

    addNotification(testNotification);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case "error":
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Xabarnomalar
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-3">
              {permission !== "granted" ? (
                <button
                  onClick={requestPermission}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                >
                  Push notifications yoqish
                </button>
              ) : (
                <>
                  {isSubscribed ? (
                    <button
                      onClick={unsubscribeFromNotifications}
                      className="flex-1 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      O'chirish
                    </button>
                  ) : (
                    <button
                      onClick={subscribeToNotifications}
                      className="flex-1 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                    >
                      Yoqish
                    </button>
                  )}
                  <button
                    onClick={sendTestNotification}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors"
                  >
                    Test
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <>
                <div className="p-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Barchasini o'qilgan deb belgilash
                    </button>
                    <span className="text-gray-300">•</span>
                    <button
                      onClick={clearAllNotifications}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Barchasini o'chirish
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-gray-50 transition-colors ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.body}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.timestamp).toLocaleString(
                              "uz-UZ"
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                              title="O'qilgan deb belgilash"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            title="O'chirish"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Hali xabarnomalar yo'q</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
