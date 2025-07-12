import React, { useState, useEffect } from "react";
import {
  Users,
  Settings,
  FileText,
  Activity,
  Shield,
  Database,
  Bell,
  Monitor,
  UserPlus,
  UserMinus,
  Edit3,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Lock,
  Unlock,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Heart,
  MessageSquare,
  Share2,
  ExternalLink,
  Copy,
  Save,
  X,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  department: string;
  position: string;
  avatar: string;
  joinDate: string;
  permissions: string[];
}

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  value: string;
  type: "text" | "number" | "boolean" | "select";
  options?: string[];
  description: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  category: string;
  message: string;
  user?: string;
  ip?: string;
  details?: any;
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalSessions: number;
  systemUptime: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkTraffic: number;
}

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0,
    systemUptime: "0d 0h 0m",
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkTraffic: 0,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<SystemSetting | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLogLevel, setFilterLogLevel] = useState("all");
  const [filterLogCategory, setFilterLogCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadSystemStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadUsers(),
        loadSettings(),
        loadLogs(),
        loadSystemStats(),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    // Mock data - bu yerda real API chaqiriladi
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Aziz Karimov",
        email: "aziz@navoiyda.uz",
        role: "CEO",
        status: "active",
        lastLogin: "2024-01-15T10:30:00Z",
        department: "Boshqaruv",
        position: "Bosh direktor",
        avatar: "https://via.placeholder.com/40",
        joinDate: "2023-01-01",
        permissions: ["all"],
      },
      {
        id: "2",
        name: "Malika Tosheva",
        email: "malika@navoiyda.uz",
        role: "HR Manager",
        status: "active",
        lastLogin: "2024-01-15T09:15:00Z",
        department: "Kadrlar",
        position: "HR menejeri",
        avatar: "https://via.placeholder.com/40",
        joinDate: "2023-02-15",
        permissions: ["users", "reports"],
      },
      {
        id: "3",
        name: "Bobur Rahmonov",
        email: "bobur@navoiyda.uz",
        role: "Developer",
        status: "active",
        lastLogin: "2024-01-15T08:45:00Z",
        department: "IT",
        position: "Dasturchi",
        avatar: "https://via.placeholder.com/40",
        joinDate: "2023-03-01",
        permissions: ["development", "system"],
      },
      {
        id: "4",
        name: "Nargiza Yusupova",
        email: "nargiza@navoiyda.uz",
        role: "Designer",
        status: "inactive",
        lastLogin: "2024-01-10T16:20:00Z",
        department: "Dizayn",
        position: "Grafik dizayner",
        avatar: "https://via.placeholder.com/40",
        joinDate: "2023-04-10",
        permissions: ["design", "media"],
      },
    ];
    setUsers(mockUsers);
  };

  const loadSettings = async () => {
    const mockSettings: SystemSetting[] = [
      {
        id: "1",
        category: "General",
        name: "Site Title",
        value: "Navoiyda Bugun",
        type: "text",
        description: "Sayt sarlavhasi",
      },
      {
        id: "2",
        category: "Security",
        name: "Session Timeout",
        value: "30",
        type: "number",
        description: "Sessiya tugash vaqti (daqiqalarda)",
      },
      {
        id: "3",
        category: "Security",
        name: "Two Factor Auth",
        value: "true",
        type: "boolean",
        description: "Ikki faktorli autentifikatsiya",
      },
      {
        id: "4",
        category: "Notifications",
        name: "Email Notifications",
        value: "enabled",
        type: "select",
        options: ["enabled", "disabled"],
        description: "Email bildirishnomalar",
      },
      {
        id: "5",
        category: "System",
        name: "Backup Frequency",
        value: "daily",
        type: "select",
        options: ["hourly", "daily", "weekly"],
        description: "Zaxira nusxa olish chastotasi",
      },
    ];
    setSettings(mockSettings);
  };

  const loadLogs = async () => {
    const mockLogs: LogEntry[] = [
      {
        id: "1",
        timestamp: "2024-01-15T10:30:00Z",
        level: "info",
        category: "Auth",
        message: "User logged in successfully",
        user: "aziz@navoiyda.uz",
        ip: "192.168.1.100",
      },
      {
        id: "2",
        timestamp: "2024-01-15T10:25:00Z",
        level: "warning",
        category: "System",
        message: "High memory usage detected",
        details: { usage: "85%" },
      },
      {
        id: "3",
        timestamp: "2024-01-15T10:20:00Z",
        level: "error",
        category: "API",
        message: "Database connection failed",
        details: { error: "Connection timeout" },
      },
      {
        id: "4",
        timestamp: "2024-01-15T10:15:00Z",
        level: "info",
        category: "User",
        message: "New user registered",
        user: "admin@navoiyda.uz",
        details: { newUser: "test@example.com" },
      },
      {
        id: "5",
        timestamp: "2024-01-15T10:10:00Z",
        level: "debug",
        category: "Performance",
        message: "Query execution time: 250ms",
        details: { query: "SELECT * FROM users", time: "250ms" },
      },
    ];
    setLogs(mockLogs);
  };

  const loadSystemStats = async () => {
    // Mock real-time data
    setSystemStats({
      totalUsers: 1250,
      activeUsers: 89,
      totalSessions: 156,
      systemUptime: "15d 8h 32m",
      cpuUsage: Math.floor(Math.random() * 30) + 20,
      memoryUsage: Math.floor(Math.random() * 20) + 60,
      diskUsage: Math.floor(Math.random() * 10) + 45,
      networkTraffic: Math.floor(Math.random() * 50) + 100,
    });
  };

  const handleUserAction = (action: string, user: User) => {
    switch (action) {
      case "edit":
        setSelectedUser(user);
        setIsUserModalOpen(true);
        break;
      case "delete":
        if (
          window.confirm(`${user.name} foydalanuvchisini o'chirmoqchimisiz?`)
        ) {
          setUsers(users.filter((u) => u.id !== user.id));
        }
        break;
      case "suspend":
        setUsers(
          users.map((u) =>
            u.id === user.id ? { ...u, status: "suspended" as const } : u
          )
        );
        break;
      case "activate":
        setUsers(
          users.map((u) =>
            u.id === user.id ? { ...u, status: "active" as const } : u
          )
        );
        break;
    }
  };

  const handleSettingChange = (setting: SystemSetting, value: string) => {
    setSettings(
      settings.map((s) => (s.id === setting.id ? { ...s, value } : s))
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredLogs = logs.filter((log) => {
    const matchesLevel =
      filterLogLevel === "all" || log.level === filterLogLevel;
    const matchesCategory =
      filterLogCategory === "all" || log.category === filterLogCategory;
    return matchesLevel && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "inactive":
        return "text-gray-600 bg-gray-100";
      case "suspended":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "text-blue-600 bg-blue-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "error":
        return "text-red-600 bg-red-100";
      case "debug":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "error":
        return <XCircle className="w-4 h-4" />;
      case "debug":
        return <Eye className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Tizim boshqaruvi va monitoring</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Jami foydalanuvchilar
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {systemStats.totalUsers}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Faol foydalanuvchilar
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {systemStats.activeUsers}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Faol sessiyalar
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {systemStats.totalSessions}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Monitor className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Tizim ishlash vaqti
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {systemStats.systemUptime}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* System Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tizim ishlashi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">CPU</span>
              <span className="text-sm font-bold text-gray-900">
                {systemStats.cpuUsage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemStats.cpuUsage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Xotira</span>
              <span className="text-sm font-bold text-gray-900">
                {systemStats.memoryUsage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemStats.memoryUsage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Disk</span>
              <span className="text-sm font-bold text-gray-900">
                {systemStats.diskUsage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemStats.diskUsage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Tarmoq</span>
              <span className="text-sm font-bold text-gray-900">
                {systemStats.networkTraffic} MB/s
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(systemStats.networkTraffic / 2, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Foydalanuvchilar</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "settings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Sozlamalar</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "logs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Loglar</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Foydalanuvchi qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Barcha rollar</option>
                  <option value="CEO">CEO</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Barcha statuslar</option>
                  <option value="active">Faol</option>
                  <option value="inactive">Nofaol</option>
                  <option value="suspended">To'xtatilgan</option>
                </select>
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setIsUserModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Yangi foydalanuvchi</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Foydalanuvchi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Oxirgi kirish
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.role}</div>
                        <div className="text-sm text-gray-500">
                          {user.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status === "active"
                            ? "Faol"
                            : user.status === "inactive"
                            ? "Nofaol"
                            : "To'xtatilgan"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleDateString("uz-UZ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUserAction("edit", user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {user.status === "active" ? (
                            <button
                              onClick={() => handleUserAction("suspend", user)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction("activate", user)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleUserAction("delete", user)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Tizim sozlamalari
              </h3>
              <button
                onClick={() => loadSettings()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Yangilash</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(
                settings.reduce((acc, setting) => {
                  if (!acc[setting.category]) acc[setting.category] = [];
                  acc[setting.category].push(setting);
                  return acc;
                }, {} as Record<string, SystemSetting[]>)
              ).map(([category, categorySettings]) => (
                <div key={category} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">
                    {category}
                  </h4>
                  <div className="space-y-4">
                    {categorySettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="bg-white rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <label className="text-sm font-medium text-gray-900">
                              {setting.name}
                            </label>
                            <p className="text-xs text-gray-500">
                              {setting.description}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedSetting(setting);
                              setIsSettingsModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-2">
                          {setting.type === "boolean" ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={setting.value === "true"}
                                onChange={(e) =>
                                  handleSettingChange(
                                    setting,
                                    e.target.checked.toString()
                                  )
                                }
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">
                                {setting.value === "true"
                                  ? "Yoqilgan"
                                  : "O'chirilgan"}
                              </span>
                            </div>
                          ) : setting.type === "select" ? (
                            <select
                              value={setting.value}
                              onChange={(e) =>
                                handleSettingChange(setting, e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {setting.options?.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={setting.type}
                              value={setting.value}
                              onChange={(e) =>
                                handleSettingChange(setting, e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === "logs" && (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h3 className="text-lg font-semibold text-gray-900">
                Tizim loglari
              </h3>
              <div className="flex space-x-4">
                <select
                  value={filterLogLevel}
                  onChange={(e) => setFilterLogLevel(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Barcha darajalar</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="debug">Debug</option>
                </select>
                <select
                  value={filterLogCategory}
                  onChange={(e) => setFilterLogCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Barcha kategoriyalar</option>
                  <option value="Auth">Auth</option>
                  <option value="System">System</option>
                  <option value="API">API</option>
                  <option value="User">User</option>
                  <option value="Performance">Performance</option>
                </select>
                <button
                  onClick={() => loadLogs()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Yangilash</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start space-x-3 text-sm"
                  >
                    <span className="text-gray-400 font-mono whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString("uz-UZ")}
                    </span>
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${getLogLevelColor(
                        log.level
                      )}`}
                    >
                      {getLogLevelIcon(log.level)}
                      <span>{log.level.toUpperCase()}</span>
                    </div>
                    <span className="text-blue-400 font-medium">
                      [{log.category}]
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                    {log.user && (
                      <span className="text-yellow-400">({log.user})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {selectedUser
                  ? "Foydalanuvchini tahrirlash"
                  : "Yangi foydalanuvchi"}
              </h3>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ism
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser?.name || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser?.email || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  defaultValue={selectedUser?.role || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CEO">CEO</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bo'lim
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser?.department || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
