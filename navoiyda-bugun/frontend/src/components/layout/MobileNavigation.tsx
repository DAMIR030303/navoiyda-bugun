import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, CheckSquare, Calendar, MessageSquare, User } from "lucide-react";

const MobileNavigation: React.FC = () => {
  const location = useLocation();

  const navigationItems = [
    {
      name: "Bosh sahifa",
      path: "/dashboard",
      icon: Home,
      emoji: "🏠",
    },
    {
      name: "Vazifalar",
      path: "/tasks",
      icon: CheckSquare,
      emoji: "📋",
    },
    {
      name: "Kalendar",
      path: "/calendar",
      icon: Calendar,
      emoji: "📅",
    },
    {
      name: "Xabarlar",
      path: "/messages",
      icon: MessageSquare,
      emoji: "💬",
    },
    {
      name: "Profil",
      path: "/profile",
      icon: User,
      emoji: "👤",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16 sm:h-20">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center gap-1 transition-all duration-200
                touch-manipulation min-h-[48px] relative
                ${
                  active
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                }
              `}
            >
              {/* Active indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full" />
              )}

              <div
                className={`
                p-2 rounded-lg transition-all duration-200
                ${active ? "bg-blue-100 scale-110" : ""}
              `}
              >
                <IconComponent
                  className={`
                  w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200
                  ${active ? "text-blue-600" : "text-gray-500"}
                `}
                />
              </div>

              <span
                className={`
                text-xs font-medium transition-colors duration-200 truncate max-w-[60px] text-center
                ${active ? "text-blue-600" : "text-gray-500"}
              `}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
