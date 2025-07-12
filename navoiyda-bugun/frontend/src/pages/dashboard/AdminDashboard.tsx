import React, { useState } from "react";
import {
  Shield,
  Users,
  Settings,
  Activity,
  Database,
  Lock,
  UserPlus,
  Key,
  Monitor,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  Search,
  BarChart3,
  Eye,
  Edit3,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Globe,
  Server,
  HardDrive,
  Cpu,
  Wifi,
  Clock,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Jami foydalanuvchilar",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: Users,
      color: "blue",
    },
    {
      title: "Faol sessiyalar",
      value: "89",
      change: "+5",
      changeType: "positive",
      icon: Activity,
      color: "green",
    },
    {
      title: "Tizim yuklanganligi",
      value: "72%",
      change: "+8%",
      changeType: "negative",
      icon: Monitor,
      color: "orange",
    },
    {
      title: "Xavfsizlik holatlar",
      value: "3",
      change: "-2",
      changeType: "positive",
      icon: Shield,
      color: "red",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Alisher Karimov",
      email: "alisher@navoiyda.uz",
      role: "founder",
      status: "active",
      lastLogin: "2024-01-22 10:30",
      loginCount: 45,
      department: "Boshqaruv",
      permissions: ["all"],
    },
    {
      id: 2,
      name: "Malika Tosheva",
      email: "malika@navoiyda.uz",
      role: "marketing_manager",
      status: "active",
      lastLogin: "2024-01-22 09:15",
      loginCount: 32,
      department: "Marketing",
      permissions: ["marketing", "content"],
    },
    {
      id: 3,
      name: "Bobur Rahmonov",
      email: "bobur@navoiyda.uz",
      role: "project_manager",
      status: "inactive",
      lastLogin: "2024-01-20 16:45",
      loginCount: 28,
      department: "Loyihalar",
      permissions: ["projects", "tasks"],
    },
    {
      id: 4,
      name: "Nodira Yusupova",
      email: "nodira@navoiyda.uz",
      role: "hr_manager",
      status: "active",
      lastLogin: "2024-01-22 11:20",
      loginCount: 41,
      department: "HR",
      permissions: ["hr", "employees"],
    },
  ];

  const roles = [
    {
      id: 1,
      name: "Asoschi",
      key: "founder",
      users: 1,
      permissions: ["all"],
      description: "Barcha tizim ruxsatlari",
    },
    {
      id: 2,
      name: "CEO",
      key: "ceo",
      users: 1,
      permissions: ["operations", "employees", "projects", "reports"],
      description: "Operatsion boshqaruv ruxsatlari",
    },
    {
      id: 3,
      name: "HR Menejer",
      key: "hr_manager",
      users: 3,
      permissions: ["employees", "attendance", "development"],
      description: "Xodimlar boshqaruvi",
    },
    {
      id: 4,
      name: "Loyiha Menejer",
      key: "project_manager",
      users: 2,
      permissions: ["projects", "tasks", "teams"],
      description: "Loyihalar boshqaruvi",
    },
    {
      id: 5,
      name: "Marketing Menejer",
      key: "marketing_manager",
      users: 4,
      permissions: ["marketing", "campaigns", "analytics"],
      description: "Marketing faoliyati",
    },
    {
      id: 6,
      name: "Sotuv Menejer",
      key: "sales_manager",
      users: 3,
      permissions: ["sales", "customers", "orders"],
      description: "Sotuv boshqaruvi",
    },
  ];

  const systemHealth = [
    {
      component: "Web Server",
      status: "healthy",
      uptime: "99.9%",
      responseTime: "45ms",
      lastCheck: "2024-01-22 12:00",
    },
    {
      component: "Database",
      status: "healthy",
      uptime: "99.8%",
      responseTime: "12ms",
      lastCheck: "2024-01-22 12:00",
    },
    {
      component: "Redis Cache",
      status: "warning",
      uptime: "98.5%",
      responseTime: "8ms",
      lastCheck: "2024-01-22 12:00",
    },
    {
      component: "File Storage",
      status: "healthy",
      uptime: "99.7%",
      responseTime: "23ms",
      lastCheck: "2024-01-22 12:00",
    },
  ];

  const securityLogs = [
    {
      id: 1,
      type: "login_attempt",
      severity: "info",
      user: "alisher@navoiyda.uz",
      action: "Muvaffaqiyatli kirish",
      ip: "192.168.1.100",
      timestamp: "2024-01-22 10:30:15",
      details: "Desktop browser",
    },
    {
      id: 2,
      type: "failed_login",
      severity: "warning",
      user: "unknown@example.com",
      action: "Muvaffaqiyatsiz kirish urinishi",
      ip: "203.0.113.5",
      timestamp: "2024-01-22 09:45:22",
      details: "Noto'g'ri parol",
    },
    {
      id: 3,
      type: "permission_change",
      severity: "high",
      user: "admin@navoiyda.uz",
      action: "Foydalanuvchi ruxsatlari o'zgartirildi",
      ip: "192.168.1.101",
      timestamp: "2024-01-22 08:20:10",
      details: "Malika T. uchun marketing ruxsatlari",
    },
    {
      id: 4,
      type: "data_export",
      severity: "medium",
      user: "malika@navoiyda.uz",
      action: "Ma'lumotlar eksport qilindi",
      ip: "192.168.1.102",
      timestamp: "2024-01-22 07:15:33",
      details: "Mijozlar ro'yxati",
    },
  ];

  const systemSettings = [
    {
      category: "Umumiy",
      settings: [
        {
          key: "site_name",
          label: "Sayt nomi",
          value: "Navoiyda Bugun",
          type: "text",
        },
        {
          key: "timezone",
          label: "Vaqt zonasi",
          value: "Asia/Tashkent",
          type: "select",
        },
        { key: "language", label: "Til", value: "uz", type: "select" },
        {
          key: "maintenance_mode",
          label: "Texnik ishlar rejimi",
          value: false,
          type: "boolean",
        },
      ],
    },
    {
      category: "Xavfsizlik",
      settings: [
        {
          key: "session_timeout",
          label: "Sessiya muddati (daqiqa)",
          value: "30",
          type: "number",
        },
        {
          key: "max_login_attempts",
          label: "Maksimal kirish urinishlari",
          value: "5",
          type: "number",
        },
        {
          key: "password_min_length",
          label: "Parol minimal uzunligi",
          value: "8",
          type: "number",
        },
        {
          key: "two_factor_auth",
          label: "Ikki bosqichli autentifikatsiya",
          value: true,
          type: "boolean",
        },
      ],
    },
    {
      category: "Bildirishnomalar",
      settings: [
        {
          key: "email_notifications",
          label: "Email bildirishnomalar",
          value: true,
          type: "boolean",
        },
        {
          key: "sms_notifications",
          label: "SMS bildirishnomalar",
          value: false,
          type: "boolean",
        },
        {
          key: "telegram_notifications",
          label: "Telegram bildirishnomalar",
          value: true,
          type: "boolean",
        },
        {
          key: "notification_frequency",
          label: "Bildirishnoma chastotasi",
          value: "daily",
          type: "select",
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "healthy":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">bugun</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tizim holati
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemHealth.map((component, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">
                  {component.component}
                </h4>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    component.status
                  )}`}
                >
                  {component.status === "healthy"
                    ? "Sog'lom"
                    : component.status === "warning"
                    ? "Ogohlantirish"
                    : "Xato"}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="font-medium">{component.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Javob vaqti:</span>
                  <span className="font-medium">{component.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Oxirgi tekshiruv:</span>
                  <span className="font-medium">{component.lastCheck}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          So'nggi xavfsizlik voqealari
        </h3>
        <div className="space-y-3">
          {securityLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    log.severity === "info"
                      ? "bg-blue-100"
                      : log.severity === "warning"
                      ? "bg-yellow-100"
                      : log.severity === "medium"
                      ? "bg-orange-100"
                      : "bg-red-100"
                  }`}
                >
                  <Shield
                    className={`w-4 h-4 ${
                      log.severity === "info"
                        ? "text-blue-600"
                        : log.severity === "warning"
                        ? "text-yellow-600"
                        : log.severity === "medium"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-600">
                    {log.user} • {log.ip}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(
                    log.severity
                  )}`}
                >
                  {log.severity === "info"
                    ? "Ma'lumot"
                    : log.severity === "warning"
                    ? "Ogohlantirish"
                    : log.severity === "medium"
                    ? "O'rta"
                    : "Yuqori"}
                </span>
                <p className="text-sm text-gray-500 mt-1">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Foydalanuvchilar
        </h3>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Yangi foydalanuvchi</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Foydalanuvchi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oxirgi kirish
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kirishlar soni
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name.charAt(0)}
                        </span>
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
                    <div className="text-sm text-gray-900 capitalize">
                      {user.role.replace("_", " ")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status === "active" ? "Faol" : "Faol emas"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.loginCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-900 mr-3">
                      <Key className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Rollar va ruxsatlar
        </h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Yangi rol</span>
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {role.name}
              </h4>
              <span className="text-sm text-gray-500">
                {role.users} foydalanuvchi
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{role.description}</p>

            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-gray-700">Ruxsatlar:</p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Tahrirlash
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                Foydalanuvchilar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Tizim sozlamalari
        </h3>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="space-y-6">
        {systemSettings.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {category.category}
            </h4>
            <div className="space-y-4">
              {category.settings.map((setting, settingIndex) => (
                <div
                  key={settingIndex}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{setting.label}</p>
                    <p className="text-sm text-gray-500">{setting.key}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {setting.type === "boolean" ? (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={setting.value as boolean}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    ) : setting.type === "select" ? (
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value={setting.value as string}>
                          {setting.value as string}
                        </option>
                      </select>
                    ) : (
                      <input
                        type={setting.type}
                        value={setting.value as string}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Xavfsizlik jurnallari
        </h3>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Yangilash</span>
          </button>
        </div>
      </div>

      {/* Security Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaqt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Foydalanuvchi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Manzil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jiddiylik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tafsilotlar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {securityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.timestamp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {log.action}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.user}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.ip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(
                        log.severity
                      )}`}
                    >
                      {log.severity === "info"
                        ? "Ma'lumot"
                        : log.severity === "warning"
                        ? "Ogohlantirish"
                        : log.severity === "medium"
                        ? "O'rta"
                        : "Yuqori"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.details}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Umumiy ko'rinish", icon: BarChart3 },
    { id: "users", label: "Foydalanuvchilar", icon: Users },
    { id: "roles", label: "Rollar", icon: Shield },
    { id: "settings", label: "Sozlamalar", icon: Settings },
    { id: "logs", label: "Jurnallar", icon: Activity },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Tizim Administrator Paneli</h1>
        <p className="text-gray-300 text-lg">
          Tizim boshqaruvi va xavfsizlik monitoring
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "users" && renderUsers()}
          {activeTab === "roles" && renderRoles()}
          {activeTab === "settings" && renderSettings()}
          {activeTab === "logs" && renderLogs()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
