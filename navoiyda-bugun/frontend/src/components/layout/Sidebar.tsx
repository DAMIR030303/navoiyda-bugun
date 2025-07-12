import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Home,
  Users,
  CheckSquare,
  TrendingUp,
  BookOpen,
  DollarSign,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  Building,
  Target,
  FileText,
  User,
  Shield,
  Database,
  Globe,
  Activity,
  TestTube,
  ChevronLeft,
  ChevronRight,
  Brain,
  MessageSquare,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  isMobile = false,
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    {
      category: "Asosiy",
      items: [
        { name: "Bosh sahifa", path: "/dashboard", icon: Home },
        { name: "Vazifalar", path: "/tasks", icon: CheckSquare },
        { name: "KPI", path: "/kpi", icon: TrendingUp },
        { name: "Analitika", path: "/analytics", icon: Brain },
        { name: "Hisobotlar", path: "/reports", icon: FileText },
        { name: "Kalendar", path: "/calendar", icon: Calendar },
        { name: "Xabarlar", path: "/messages", icon: MessageSquare },
      ],
    },
    {
      category: "Xodimlar",
      items: [
        { name: "Xodimlar", path: "/employees", icon: Users },
        { name: "Davomat", path: "/attendance", icon: Calendar },
        { name: "Rivojlanish", path: "/development", icon: BookOpen },
      ],
    },
    {
      category: "Biznes",
      items: [
        { name: "Marketing", path: "/marketing", icon: Target },
        { name: "Sotuv", path: "/sales", icon: DollarSign },
        { name: "Moliya", path: "/finance", icon: BarChart3 },
        { name: "Operatsiyalar", path: "/operations", icon: Building },
      ],
    },
    {
      category: "Tizim",
      items: [
        { name: "Statistika", path: "/statistics", icon: Activity },
        { name: "Ma'lumotlar", path: "/database", icon: Database },
        { name: "Sozlamalar", path: "/settings", icon: Settings },
      ],
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-in-out
        ${isMobile ? (isOpen ? "w-80" : "w-0") : isOpen ? "w-72" : "w-20"}
        ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }
        shadow-xl overflow-hidden
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 min-h-[4rem]">
          {(isOpen || !isMobile) && (
            <div className={`${!isOpen && !isMobile ? "hidden" : ""}`}>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Navoiyda Bugun
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Boshqaruv tizimi
              </p>
            </div>
          )}

          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* User Info */}
        {(isOpen || !isMobile) && user && (
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              {(isOpen || !isMobile) && (
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {user.username}
                  </p>
                  <p className="text-sm text-gray-500 capitalize truncate">
                    {user.role}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 sm:py-6">
          <nav className="space-y-4 sm:space-y-6">
            {navigationItems.map((category) => (
              <div key={category.category}>
                {(isOpen || !isMobile) && (
                  <h3 className="px-4 sm:px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {category.category}
                  </h3>
                )}

                <div className="space-y-1 px-2 sm:px-3">
                  {category.items.map((item) => {
                    const IconComponent = item.icon;
                    const active = isActive(item.path);

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={isMobile ? onToggle : undefined}
                        className={`
                          flex items-center gap-3 px-3 py-3 sm:py-4 rounded-xl transition-all duration-200 group
                          touch-manipulation min-h-[48px]
                          ${
                            active
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200"
                          }
                          ${!isOpen && !isMobile ? "justify-center" : ""}
                        `}
                        title={!isOpen && !isMobile ? item.name : undefined}
                      >
                        <IconComponent
                          className={`
                          w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 flex-shrink-0
                          ${
                            active
                              ? "text-white"
                              : "text-gray-500 group-hover:text-gray-700"
                          }
                        `}
                        />

                        {(isOpen || !isMobile) && (
                          <span className="font-medium text-sm sm:text-base truncate">
                            {item.name}
                          </span>
                        )}

                        {active && (isOpen || !isMobile) && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full flex-shrink-0" />
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-2 sm:p-3">
          <div className="space-y-1">
            <NavLink
              to="/profile"
              onClick={isMobile ? onToggle : undefined}
              className={`
                flex items-center gap-3 px-3 py-3 sm:py-4 rounded-xl transition-all duration-200 group
                touch-manipulation min-h-[48px]
                ${
                  isActive("/profile")
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200"
                }
                ${!isOpen && !isMobile ? "justify-center" : ""}
              `}
              title={!isOpen && !isMobile ? "Profil" : undefined}
            >
              <User
                className={`
                w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 flex-shrink-0
                ${
                  isActive("/profile")
                    ? "text-white"
                    : "text-gray-500 group-hover:text-gray-700"
                }
              `}
              />
              {(isOpen || !isMobile) && (
                <span className="font-medium text-sm sm:text-base truncate">
                  Profil
                </span>
              )}
            </NavLink>

            <button
              onClick={logout}
              className={`
                w-full flex items-center gap-3 px-3 py-3 sm:py-4 rounded-xl transition-all duration-200 group
                text-red-600 hover:bg-red-50 hover:text-red-700 active:bg-red-100
                touch-manipulation min-h-[48px]
                ${!isOpen && !isMobile ? "justify-center" : ""}
              `}
              title={!isOpen && !isMobile ? "Chiqish" : undefined}
            >
              <LogOut className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 flex-shrink-0" />
              {(isOpen || !isMobile) && (
                <span className="font-medium text-sm sm:text-base truncate">
                  Chiqish
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
