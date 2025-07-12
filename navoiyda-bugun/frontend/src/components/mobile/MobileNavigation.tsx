import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  User,
  CheckSquare,
  BarChart3,
  Settings,
  QrCode,
  Camera,
  MapPin,
  Wifi,
} from "lucide-react";

interface MobileNavigationProps {
  userRole: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      { icon: Home, label: "Bosh sahifa", path: "/dashboard" },
      { icon: CheckSquare, label: "Vazifalar", path: "/tasks" },
      { icon: BarChart3, label: "Statistika", path: "/analytics" },
      { icon: User, label: "Profil", path: "/profile" },
    ];

    if (userRole === "founder" || userRole === "ceo") {
      baseItems.splice(2, 0, {
        icon: QrCode,
        label: "QR Kod",
        path: "/qr-attendance",
      });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
