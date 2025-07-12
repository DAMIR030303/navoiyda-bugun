import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Search,
  Menu,
  Monitor,
  Grid3X3,
} from "lucide-react";

interface TabletLayoutProps {
  children: React.ReactNode;
}

const TabletLayout: React.FC<TabletLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Xodimlar", path: "/employees" },
    { icon: BarChart3, label: "Statistika", path: "/statistics" },
    { icon: FileText, label: "Vazifalar", path: "/tasks" },
    { icon: Calendar, label: "Kalendar", path: "/calendar" },
    { icon: MessageSquare, label: "Xabarlar", path: "/messages" },
    { icon: Settings, label: "Sozlamalar", path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Vertical Navigation */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Navoiyda Bugun</h1>
          <p className="text-sm text-gray-600">Planshet Ko'rinish</p>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <div className="font-medium text-gray-900">{user?.username}</div>
              <div className="text-sm text-gray-600">{user?.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Breadcrumb */}
            <div className="flex items-center space-x-4">
              <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <Menu size={20} />
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Home size={16} />
                <span>/</span>
                <span>Dashboard</span>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Search size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell size={20} className="text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <Monitor size={20} className="text-gray-600" />
                <span className="text-sm text-gray-600">Planshet</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>

        {/* Bottom Status Bar */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Onlayn</span>
              </div>
              <div className="flex items-center space-x-2">
                <Grid3X3 size={14} />
                <span>Planshet rejimi</span>
              </div>
            </div>
            <div>
              Oxirgi yangilanish: {new Date().toLocaleTimeString("uz-UZ")}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TabletLayout;
