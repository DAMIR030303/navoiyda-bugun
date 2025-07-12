import React, { useState } from "react";
import { Menu, Bell, Search, User, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import NotificationCenter from "../notifications/NotificationCenter";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-3 sm:px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 touch-manipulation"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="search-input"
                name="search"
                type="text"
                placeholder="Qidirish..."
                className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Mobile Search Overlay */}
          {showMobileSearch && (
            <div className="fixed inset-0 bg-white z-50 md:hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="mobile-search-input"
                    name="search"
                    type="text"
                    placeholder="Qidirish..."
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setShowMobileSearch(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 touch-manipulation"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search button */}
          <button
            onClick={() => setShowMobileSearch(true)}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 md:hidden touch-manipulation"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <NotificationCenter />

          {/* User menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>

            {user && (
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[120px] lg:max-w-none">
                  {user.username}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate max-w-[120px] lg:max-w-none">
                  {user.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
