import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import FounderDashboard from "./FounderDashboard";
import CEODashboard from "./CEODashboard";
import MarketingDashboard from "./MarketingDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import HRManagerDashboard from "./HRManagerDashboard";
import ProjectManagerDashboard from "./ProjectManagerDashboard";
import SalesManagerDashboard from "./SalesManagerDashboard";
import MobilographerDashboard from "./MobilographerDashboard";
import BrandFaceDashboard from "./BrandFaceDashboard";
import ScreenwriterDashboard from "./ScreenwriterDashboard";
import AdminDashboard from "./AdminDashboard";
import MobileDashboard from "../../components/mobile/MobileDashboard";
import AllRolesDashboard from "../../components/mobile/AllRolesDashboard";
import MobileNavigation from "../../components/mobile/MobileNavigation";
import TabletDashboard from "../../components/tablet/TabletDashboard";
import TabletLayout from "../../components/tablet/TabletLayout";
import QuickActions from "../../components/dashboard/QuickActions";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const renderRoleBasedDashboard = () => {
    if (!user) {
      return (
        <div className="bg-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Foydalanuvchi ma'lumotlari yuklanmoqda...
          </h2>
          <p className="text-gray-600">Iltimos kuting...</p>
        </div>
      );
    }

    const userRole = user.role.toLowerCase();
    console.log("User role:", userRole); // Debug uchun

    try {
      switch (userRole) {
        case "founder":
          return <FounderDashboard />;
        case "ceo":
          return <CEODashboard />;
        case "hr_manager":
          return <HRManagerDashboard />;
        case "project_manager":
          return <ProjectManagerDashboard />;
        case "marketing_manager":
        case "marketolog":
          return <MarketingDashboard />;
        case "sales_manager":
          return <SalesManagerDashboard />;
        case "mobilographer":
          return <MobilographerDashboard />;
        case "brand_face":
          return <BrandFaceDashboard />;
        case "screenwriter":
          return <ScreenwriterDashboard />;
        case "admin":
          return <AdminDashboard />;
        case "employee":
        case "user":
          return <EmployeeDashboard />;
        default:
          return (
            <div className="bg-white rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Dashboard
              </h2>
              <p className="text-gray-600">Rol: {user.role}</p>
              <p className="text-gray-600">Foydalanuvchi: {user.username}</p>
            </div>
          );
      }
    } catch (error) {
      console.error("Dashboard render error:", error);
      return (
        <div className="bg-red-50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-red-900 mb-4">
            Xatolik yuz berdi
          </h2>
          <p className="text-red-600">
            Dashboard yuklanishida muammo. Console loglarini tekshiring.
          </p>
        </div>
      );
    }
  };

  if (isMobile) {
    return (
      <>
        <Helmet>
          <title>Dashboard - Navoiyda Bugun</title>
        </Helmet>
        <AllRolesDashboard userRole={user?.role || "employee"} />
        <MobileNavigation userRole={user?.role || "employee"} />
      </>
    );
  }

  if (isTablet) {
    return (
      <>
        <Helmet>
          <title>Dashboard - Navoiyda Bugun</title>
        </Helmet>
        <TabletLayout>
          <TabletDashboard userRole={user?.role || "employee"} />
        </TabletLayout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Xush kelibsiz, {user?.username}!
          </h1>
          <p className="text-blue-100 text-lg">
            {user?.role === "founder"
              ? "Asoschi"
              : user?.role === "ceo"
              ? "Bosh direktor"
              : user?.role === "hr_manager"
              ? "HR menejer"
              : user?.role === "project_manager"
              ? "Loyiha menejer"
              : user?.role === "marketing_manager"
              ? "Marketing menejer"
              : user?.role === "sales_manager"
              ? "Sotuv menejer"
              : user?.role === "mobilographer"
              ? "Mobilograf"
              : user?.role === "brand_face"
              ? "Brend yuzi"
              : user?.role === "screenwriter"
              ? "Ssenarist"
              : user?.role === "admin"
              ? "Tizim administrator"
              : "Xodim"}{" "}
            boshqaruv paneli
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Role-based dashboard content */}
        {renderRoleBasedDashboard()}
      </div>
    </>
  );
};

export default DashboardPage;
