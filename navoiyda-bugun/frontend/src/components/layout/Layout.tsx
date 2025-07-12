import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNavigation from "./MobileNavigation";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobil uchun default false
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      // Desktop da sidebar avtomatik ochiq, mobil da yopiq
      if (width >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main content */}
      <div
        className={`
        transition-all duration-300 ease-in-out min-h-screen
        ${
          !isMobile && sidebarOpen
            ? "lg:ml-72"
            : !isMobile
            ? "lg:ml-20"
            : "ml-0"
        }
      `}
      >
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page content */}
        <main
          className={`
          p-3 sm:p-4 lg:p-6 
          ${isMobile ? "pb-20" : "pb-6"}
          min-h-[calc(100vh-4rem)]
        `}
        >
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobile && <MobileNavigation />}
    </div>
  );
};

export default Layout;
