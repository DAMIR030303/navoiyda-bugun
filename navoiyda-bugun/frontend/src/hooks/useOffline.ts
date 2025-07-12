import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface OfflineData {
  tasks: any[];
  attendance: any[];
  reports: any[];
  lastSync: string;
}

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData>({
    tasks: [],
    attendance: [],
    reports: [],
    lastSync: new Date().toISOString(),
  });
  const [pendingActions, setPendingActions] = useState<any[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Internetga ulanish tiklandi");
      syncPendingActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Internet ulanishi yo'q. Offline rejimda ishlayapsiz");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Load offline data from localStorage
    loadOfflineData();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const loadOfflineData = () => {
    try {
      const stored = localStorage.getItem("navoiyda-bugun-offline");
      if (stored) {
        const data = JSON.parse(stored);
        setOfflineData(data);
      }

      const storedActions = localStorage.getItem("navoiyda-bugun-pending");
      if (storedActions) {
        const actions = JSON.parse(storedActions);
        setPendingActions(actions);
      }
    } catch (error) {
      console.error("Failed to load offline data:", error);
    }
  };

  const saveOfflineData = (data: Partial<OfflineData>) => {
    try {
      const updated = {
        ...offlineData,
        ...data,
        lastSync: new Date().toISOString(),
      };
      setOfflineData(updated);
      localStorage.setItem("navoiyda-bugun-offline", JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save offline data:", error);
    }
  };

  const addPendingAction = (action: any) => {
    const newActions = [
      ...pendingActions,
      { ...action, id: Date.now(), timestamp: new Date().toISOString() },
    ];
    setPendingActions(newActions);
    localStorage.setItem("navoiyda-bugun-pending", JSON.stringify(newActions));
  };

  const syncPendingActions = async () => {
    if (pendingActions.length === 0) return;

    try {
      for (const action of pendingActions) {
        switch (action.type) {
          case "CREATE_TASK":
            await fetch("/api/tasks", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(action.data),
            });
            break;
          case "UPDATE_TASK":
            await fetch(`/api/tasks/${action.data.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(action.data),
            });
            break;
          case "ATTENDANCE_CHECKIN":
            await fetch("/api/attendance/checkin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(action.data),
            });
            break;
          case "ATTENDANCE_CHECKOUT":
            await fetch("/api/attendance/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(action.data),
            });
            break;
          default:
            console.warn("Unknown action type:", action.type);
        }
      }

      // Clear pending actions after successful sync
      setPendingActions([]);
      localStorage.removeItem("navoiyda-bugun-pending");

      toast.success(`${pendingActions.length} ta o'zgarish sinxronlashtirildi`);
    } catch (error) {
      console.error("Failed to sync pending actions:", error);
      toast.error("Sinxronlashtirishda xatolik yuz berdi");
    }
  };

  const cacheData = (key: keyof OfflineData, data: any[]) => {
    saveOfflineData({ [key]: data });
  };

  const getCachedData = (key: keyof OfflineData) => {
    return offlineData[key] || [];
  };

  const clearOfflineData = () => {
    const emptyData: OfflineData = {
      tasks: [],
      attendance: [],
      reports: [],
      lastSync: new Date().toISOString(),
    };
    setOfflineData(emptyData);
    setPendingActions([]);
    localStorage.removeItem("navoiyda-bugun-offline");
    localStorage.removeItem("navoiyda-bugun-pending");
  };

  return {
    isOnline,
    offlineData,
    pendingActions: pendingActions.length,
    addPendingAction,
    syncPendingActions,
    cacheData,
    getCachedData,
    clearOfflineData,
    lastSync: offlineData.lastSync,
  };
};
