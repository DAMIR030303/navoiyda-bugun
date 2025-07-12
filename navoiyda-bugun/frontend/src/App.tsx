import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Layout from "@/components/layout/Layout";
// import { PushNotifications } from "@/components/notifications/PushNotifications";
import { useOffline } from "@/hooks/useOffline";
import { logger, logPageLoad, logNetworkStatus } from "@/utils/logger";
import { mobileLogger } from "@/utils/mobileLogger";
import { Wifi, WifiOff, Smartphone, Download, X } from "lucide-react";

// Lazy load pages
const LoginPage = React.lazy(() => import("@/pages/auth/LoginPage"));
const DashboardPage = React.lazy(
  () => import("@/pages/dashboard/DashboardPage")
);

// Asosiy sahifalar
const AttendancePage = React.lazy(
  () => import("@/pages/attendance/AttendancePage")
);
const TasksPage = React.lazy(() => import("@/pages/tasks/TasksPage"));
const KPIPage = React.lazy(() => import("@/pages/kpi/KPIPage"));
const ReportsPage = React.lazy(() => import("@/pages/reports/ReportsPage"));
const MarketingPage = React.lazy(
  () => import("@/pages/marketing/MarketingPage")
);
const SalesPage = React.lazy(() => import("@/pages/sales/SalesPage"));
const ContentPage = React.lazy(() => import("@/pages/content/ContentPage"));
const ProfilePage = React.lazy(() => import("@/pages/profile/ProfilePage"));
const AdminPage = React.lazy(() => import("@/pages/admin/AdminPage"));
const APIIntegrationPage = React.lazy(
  () => import("@/pages/api/APIIntegrationPage")
);
const TestPage = React.lazy(() => import("@/pages/test/TestPage"));
const ButtonTestPage = React.lazy(() => import("@/pages/test/ButtonTestPage"));
const CalendarPage = React.lazy(() => import("@/pages/calendar/CalendarPage"));
const MessagesPage = React.lazy(() => import("@/pages/messages/MessagesPage"));

// Rolga xos sahifalar
const StatisticsPage = React.lazy(
  () => import("@/pages/statistics/StatisticsPage")
);
const StrategyPage = React.lazy(() => import("@/pages/strategy/StrategyPage"));
const FinancePage = React.lazy(() => import("@/pages/finance/FinancePage"));
const EmployeesPage = React.lazy(
  () => import("@/pages/employees/EmployeesPage")
);
const OperationsPage = React.lazy(
  () => import("@/pages/operations/OperationsPage")
);
const ProjectsPage = React.lazy(() => import("@/pages/projects/ProjectsPage"));
const DevelopmentPage = React.lazy(
  () => import("@/pages/development/DevelopmentPage")
);
const SettingsPage = React.lazy(() => import("@/pages/settings/SettingsPage"));
const DatabasePage = React.lazy(() => import("@/pages/database/DatabasePage"));
const AdvancedAnalyticsPage = React.lazy(
  () => import("@/pages/analytics/AdvancedAnalyticsPage")
);

// Common sahifalar
const NotFoundPage = React.lazy(() => import("@/pages/common/NotFoundPage"));

// Mobil sahifalar
const QRAttendancePage = React.lazy(() => import("@/pages/QRAttendancePage"));

// Planshet sahifalar
const TabletViewPage = React.lazy(
  () => import("@/components/tablet/TabletDashboard")
);

// PWA Install Banner Component
const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        toast.success("Dastur muvaffaqiyatli o'rnatildi!");
      }

      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  // Don't show if already dismissed or if running in standalone mode
  if (
    !showBanner ||
    localStorage.getItem("pwa-banner-dismissed") === "true" ||
    window.matchMedia("(display-mode: standalone)").matches
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="flex items-center gap-3">
        <Smartphone className="w-8 h-8 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">Dasturni o'rnating</h4>
          <p className="text-xs opacity-90">
            Tezkor kirish uchun telefonda o'rnating
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1 px-3 py-1 bg-white text-blue-600 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            O'rnatish
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Offline Status Banner Component
const OfflineStatusBanner: React.FC<{
  isOnline: boolean;
  pendingActions: number;
}> = ({ isOnline, pendingActions }) => {
  if (isOnline && pendingActions === 0) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 p-2 text-center text-sm font-medium ${
        isOnline ? "bg-orange-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>
              {pendingActions > 0
                ? `${pendingActions} ta o'zgarish sinxronlanishni kutmoqda`
                : "Online"}
            </span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Offline rejim - O'zgarishlar saqlanmoqda</span>
          </>
        )}
      </div>
    </div>
  );
};

// Route tracking hook
function useRouteTracking() {
  const location = useLocation();
  const [previousPath, setPreviousPath] = React.useState<string>("");

  useEffect(() => {
    if (previousPath && previousPath !== location.pathname) {
      logger.logRouteChange(previousPath, location.pathname);
    }
    setPreviousPath(location.pathname);
  }, [location.pathname, previousPath]);
}

function App() {
  useRouteTracking();
  const { isOnline, pendingActions } = useOffline();
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    // System initialization logging
    logger.info("Application Started", logger.getSystemInfo());

    // Mobile device detection and logging
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      mobileLogger.logMobileEvent("App Started", {
        timestamp: new Date().toISOString(),
      });
    }

    // Page load performance
    logPageLoad();

    // Network status
    logNetworkStatus();

    // Online/offline status tracking
    const handleOnline = () => {
      logger.info("Network Status: Online");
      toast.success("Internet ulanishi tiklandi");
    };
    const handleOffline = () => {
      logger.warn("Network Status: Offline");
      toast.error("Internet ulanishi yo'q");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // PWA update detection
    const handleAppInstalled = () => {
      toast.success("Dastur muvaffaqiyatli o'rnatildi!");
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // Service Worker update detection
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setShowUpdateNotification(true);
      });
    }

    // Performance observer
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming;
            logger.logPerformance("Navigation", navEntry.duration, {
              type: entry.entryType,
              name: entry.name,
            });
          }
        });
      });

      observer.observe({ entryTypes: ["navigation"] });

      return () => {
        observer.disconnect();
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("appinstalled", handleAppInstalled);
      };
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleUpdateApp = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary>
      <Helmet>
        <title>Navoiyda Bugun - Boshqaruv Tizimi</title>
        <meta
          name="description"
          content="Navoiy viloyati korxonalari uchun boshqaruv tizimi"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Navoiyda Bugun" />
        <link rel="apple-touch-icon" href="/pwa-192x192.png" />
      </Helmet>

      {/* PWA Install Banner */}
      <PWAInstallBanner />

      {/* Offline Status Banner */}
      <OfflineStatusBanner
        isOnline={isOnline}
        pendingActions={pendingActions}
      />

      {/* App Update Notification */}
      {showUpdateNotification && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm">Yangi versiya mavjud</h4>
              <p className="text-xs opacity-90">
                Dasturni yangilash uchun sahifani qayta yuklang
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateApp}
                className="px-3 py-1 bg-white text-blue-600 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Yangilash
              </button>
              <button
                onClick={() => setShowUpdateNotification(false)}
                className="p-1 hover:bg-blue-700 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes with layout */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ErrorBoundary>
                    <Routes>
                      {/* Main routes */}
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/attendance" element={<AttendancePage />} />
                      <Route path="/tasks" element={<TasksPage />} />
                      <Route path="/kpi" element={<KPIPage />} />
                      <Route path="/reports" element={<ReportsPage />} />
                      <Route path="/marketing" element={<MarketingPage />} />
                      <Route path="/sales" element={<SalesPage />} />
                      <Route path="/content" element={<ContentPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route
                        path="/analytics"
                        element={<AdvancedAnalyticsPage />}
                      />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/messages" element={<MessagesPage />} />

                      {/* Role-specific routes */}
                      <Route
                        path="/statistics"
                        element={
                          <ProtectedRoute requiredRoles={["founder", "ceo"]}>
                            <StatisticsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/strategy"
                        element={
                          <ProtectedRoute requiredRoles={["founder", "ceo"]}>
                            <StrategyPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/finance"
                        element={
                          <ProtectedRoute requiredRoles={["founder", "ceo"]}>
                            <FinancePage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/employees"
                        element={
                          <ProtectedRoute
                            requiredRoles={["founder", "ceo", "hr_manager"]}
                          >
                            <EmployeesPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/operations"
                        element={
                          <ProtectedRoute requiredRoles={["founder", "ceo"]}>
                            <OperationsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/projects"
                        element={
                          <ProtectedRoute
                            requiredRoles={[
                              "founder",
                              "ceo",
                              "project_manager",
                            ]}
                          >
                            <ProjectsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/development"
                        element={
                          <ProtectedRoute
                            requiredRoles={["founder", "ceo", "hr_manager"]}
                          >
                            <DevelopmentPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute requiredRoles={["admin", "founder"]}>
                            <AdminPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/api-integration"
                        element={
                          <ProtectedRoute
                            requiredRoles={["admin", "founder", "developer"]}
                          >
                            <APIIntegrationPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/test"
                        element={
                          <ProtectedRoute
                            requiredRoles={["admin", "founder", "developer"]}
                          >
                            <TestPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/button-test" element={<ButtonTestPage />} />
                      <Route
                        path="/settings"
                        element={
                          <ProtectedRoute requiredRoles={["admin", "founder"]}>
                            <SettingsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/database"
                        element={
                          <ProtectedRoute requiredRoles={["admin", "founder"]}>
                            <DatabasePage />
                          </ProtectedRoute>
                        }
                      />

                      {/* Mobile specific routes */}
                      <Route
                        path="/qr-attendance"
                        element={<QRAttendancePage />}
                      />

                      {/* Tablet specific routes */}
                      <Route path="/tablet-view" element={<TabletViewPage />} />

                      {/* Default redirect */}
                      <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                      />

                      {/* 404 route */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </ErrorBoundary>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
