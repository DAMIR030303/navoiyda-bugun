import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";

import "./assets/styles/index.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// PWA Service Worker Registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("SW registered: ", registration);

      // Check for updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New content available, show update notification
              if (
                confirm("Yangi versiya mavjud. Sahifani yangilamoqchimisiz?")
              ) {
                window.location.reload();
              }
            }
          });
        }
      });
    })
    .catch((registrationError) => {
      console.log("SW registration failed: ", registrationError);
    });
}

// Push Notifications Setup
async function setupPushNotifications() {
  if ("Notification" in window && "serviceWorker" in navigator) {
    // Request notification permission
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted");

      // Subscribe to push notifications
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BEl62iUYgUivxIkv69yViEuiBIa40HI6YUKKAOCd4r7wKRrXPRKT4xIHHr6d263dJq3-8sT9hxTxzgvAKgPzKJM"
          ), // Replace with your VAPID public key
        });

        console.log("Push subscription:", subscription);

        // Send subscription to server
        await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        });
      } catch (error) {
        console.error("Failed to subscribe to push notifications:", error);
      }
    }
  }
}

// Convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Initialize PWA features
setupPushNotifications();

// Check if app is running in standalone mode (installed as PWA)
if (window.matchMedia("(display-mode: standalone)").matches) {
  console.log("App is running in standalone mode (PWA)");
  // Add any PWA-specific functionality here
}

// Handle online/offline status
window.addEventListener("online", () => {
  console.log("App is online");
  // Show online notification
  const event = new CustomEvent("app-online");
  window.dispatchEvent(event);
});

window.addEventListener("offline", () => {
  console.log("App is offline");
  // Show offline notification
  const event = new CustomEvent("app-offline");
  window.dispatchEvent(event);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ThemeProvider>
            <AuthProvider>
              <NotificationProvider>
                <App />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                    },
                    success: {
                      duration: 3000,
                      style: {
                        background: "#10b981",
                      },
                    },
                    error: {
                      duration: 5000,
                      style: {
                        background: "#ef4444",
                      },
                    },
                  }}
                />
                {false && <ReactQueryDevtools initialIsOpen={false} />}
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
