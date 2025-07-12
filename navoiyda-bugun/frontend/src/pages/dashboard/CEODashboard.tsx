import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Settings,
  Users,
  Briefcase,
  Shield,
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Zap,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Eye,
  RefreshCw,
  Bell,
  MessageSquare,
  FileText,
  Globe,
  Plus,
  Edit,
  Trash2,
  Download,
  Share2,
  Filter,
  Search,
  Phone,
  Mail,
  Video,
  ExternalLink,
  AlertCircle,
  CheckSquare,
  X,
  Save,
  Send,
  UserPlus,
  Building,
  Layers,
  Presentation,
} from "lucide-react";

interface OperationalMetric {
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  status: "excellent" | "good" | "warning" | "critical";
  target: string;
  progress: number;
}

interface EmployeePerformance {
  department: string;
  performance: number;
  employees: number;
  efficiency: number;
  satisfaction: number;
  color: string;
}

interface ProjectStatus {
  id: string;
  name: string;
  progress: number;
  status: "on_track" | "at_risk" | "delayed" | "completed";
  deadline: string;
  team: number;
  budget: number;
  spent: number;
}

interface ExecutiveAlert {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  category: "operational" | "financial" | "hr" | "strategic";
  time: string;
  actionRequired: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
  urgent?: boolean;
}

const CEODashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "today" | "week" | "month" | "quarter"
  >("week");
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<ExecutiveAlert | null>(
    null
  );

  // Quick Actions
  const quickActions: QuickAction[] = [
    {
      id: "meeting",
      title: "Yangi yig'ilish",
      description: "Jamoa bilan yig'ilish tashkil qilish",
      icon: <Video className="w-6 h-6" />,
      color: "bg-blue-500",
      action: () => setShowModal("meeting"),
    },
    {
      id: "employee",
      title: "Xodim qo'shish",
      description: "Yangi xodim ishga qabul qilish",
      icon: <UserPlus className="w-6 h-6" />,
      color: "bg-green-500",
      action: () => navigate("/employees"),
    },
    {
      id: "project",
      title: "Loyiha yaratish",
      description: "Yangi loyiha boshlash",
      icon: <Plus className="w-6 h-6" />,
      color: "bg-purple-500",
      action: () => navigate("/projects"),
    },
    {
      id: "report",
      title: "Hisobot olish",
      description: "Batafsil hisobot yuklab olish",
      icon: <Download className="w-6 h-6" />,
      color: "bg-orange-500",
      action: () => setShowModal("report"),
      urgent: true,
    },
    {
      id: "strategy",
      title: "Strategiya",
      description: "Strategik reja ko'rish",
      icon: <Target className="w-6 h-6" />,
      color: "bg-red-500",
      action: () => navigate("/strategy"),
    },
    {
      id: "analytics",
      title: "Analitika",
      description: "Chuqur tahlil va prognozlar",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-indigo-500",
      action: () => navigate("/analytics"),
    },
  ];

  // Operational metrics
  const [operationalMetrics, setOperationalMetrics] = useState<
    OperationalMetric[]
  >([
    {
      title: "Operatsion samaradorlik",
      value: "94.2%",
      change: 2.3,
      changeType: "increase",
      status: "excellent",
      target: "95%",
      progress: 99,
    },
    {
      title: "Xodimlar unumdorligi",
      value: "87.8%",
      change: 1.5,
      changeType: "increase",
      status: "good",
      target: "90%",
      progress: 98,
    },
    {
      title: "Loyihalar bajarilishi",
      value: "78.5%",
      change: -0.8,
      changeType: "decrease",
      status: "warning",
      target: "85%",
      progress: 92,
    },
    {
      title: "Mijozlar mamnuniyati",
      value: "92.1%",
      change: 3.2,
      changeType: "increase",
      status: "excellent",
      target: "95%",
      progress: 97,
    },
  ]);

  // Employee performance by department
  const [employeePerformance, setEmployeePerformance] = useState<
    EmployeePerformance[]
  >([
    {
      department: "Marketing",
      performance: 92,
      employees: 8,
      efficiency: 89,
      satisfaction: 94,
      color: "bg-blue-500",
    },
    {
      department: "Sotuv",
      performance: 88,
      employees: 12,
      efficiency: 91,
      satisfaction: 87,
      color: "bg-green-500",
    },
    {
      department: "Ishlab chiqarish",
      performance: 95,
      employees: 15,
      efficiency: 93,
      satisfaction: 96,
      color: "bg-purple-500",
    },
    {
      department: "IT",
      performance: 90,
      employees: 6,
      efficiency: 95,
      satisfaction: 89,
      color: "bg-orange-500",
    },
    {
      department: "HR",
      performance: 85,
      employees: 4,
      efficiency: 88,
      satisfaction: 92,
      color: "bg-pink-500",
    },
  ]);

  // Project statuses
  const [projectStatuses, setProjectStatuses] = useState<ProjectStatus[]>([
    {
      id: "1",
      name: "Yangi mahsulot ishlab chiqarish",
      progress: 75,
      status: "on_track",
      deadline: "2024-06-15",
      team: 8,
      budget: 50000000,
      spent: 32000000,
    },
    {
      id: "2",
      name: "Marketing kampaniyasi",
      progress: 60,
      status: "at_risk",
      deadline: "2024-05-30",
      team: 5,
      budget: 25000000,
      spent: 18000000,
    },
    {
      id: "3",
      name: "Tizim yangilanishi",
      progress: 45,
      status: "delayed",
      deadline: "2024-05-20",
      team: 4,
      budget: 15000000,
      spent: 8000000,
    },
    {
      id: "4",
      name: "Mijozlar bazasi kengaytirish",
      progress: 90,
      status: "on_track",
      deadline: "2024-07-01",
      team: 6,
      budget: 30000000,
      spent: 22000000,
    },
  ]);

  // Executive alerts
  const [executiveAlerts, setExecutiveAlerts] = useState<ExecutiveAlert[]>([
    {
      id: "1",
      title: "Loyiha kechikishi",
      description: "Tizim yangilanishi loyihasi 3 kun kechikmoqda",
      severity: "high",
      category: "operational",
      time: "30 daqiqa oldin",
      actionRequired: true,
    },
    {
      id: "2",
      title: "Byudjet oshishi",
      description: "Marketing kampaniyasi byudjeti 20% oshdi",
      severity: "medium",
      category: "financial",
      time: "2 soat oldin",
      actionRequired: true,
    },
    {
      id: "3",
      title: "Xodim mamnuniyati",
      description: "IT bo'limida xodimlar mamnuniyati pasaydi",
      severity: "medium",
      category: "hr",
      time: "4 soat oldin",
      actionRequired: false,
    },
    {
      id: "4",
      title: "Yangi imkoniyat",
      description: "Yangi bozor segmentiga kirish imkoniyati",
      severity: "low",
      category: "strategic",
      time: "1 kun oldin",
      actionRequired: false,
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const updateTimer = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate small metric changes
      setOperationalMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          change: metric.change + (Math.random() - 0.5) * 0.3,
        }))
      );
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(updateTimer);
    };
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("UZS", "so'm");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "warning":
        return "bg-orange-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "bg-green-500";
      case "at_risk":
        return "bg-orange-500";
      case "delayed":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAlertAction = (alert: ExecutiveAlert) => {
    setSelectedAlert(alert);
    setShowModal("alert-action");
  };

  const handleProjectClick = (project: ProjectStatus) => {
    navigate(`/projects/${project.id}`);
  };

  const handleDepartmentClick = (department: EmployeePerformance) => {
    navigate(`/employees?department=${department.department.toLowerCase()}`);
  };

  const closeModal = () => {
    setShowModal(null);
    setSelectedAlert(null);
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {showModal === "meeting" && "Yangi yig'ilish"}
              {showModal === "report" && "Hisobot yuklab olish"}
              {showModal === "alert-action" && "Ogohlantirish harakati"}
            </h3>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {showModal === "meeting" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yig'ilish mavzusi
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mavzu kiriting..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sana va vaqt
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => {
                    // Handle meeting creation
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Yaratish
                </button>
              </div>
            </div>
          )}

          {showModal === "report" && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Qaysi hisobotni yuklab olmoqchisiz?
              </p>
              <div className="space-y-2">
                {[
                  "Moliyaviy hisobot",
                  "Xodimlar hisoboti",
                  "Loyihalar hisoboti",
                  "Umumiy hisobot",
                ].map((report) => (
                  <button
                    key={report}
                    onClick={() => {
                      // Handle report download
                      closeModal();
                    }}
                    className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-gray-500" />
                      {report}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showModal === "alert-action" && selectedAlert && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  {selectedAlert.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedAlert.description}
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    // Handle alert resolution
                    closeModal();
                  }}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Hal qilindi
                </button>
                <button
                  onClick={() => {
                    // Handle alert delegation
                    closeModal();
                  }}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Topshiriq berish
                </button>
                <button
                  onClick={closeModal}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Keyinroq
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-32 bg-gray-200 rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">CEO Dashboard</h1>
              <p className="text-blue-100 text-lg">
                Operatsion boshqaruv va strategik qarorlar
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-blue-100 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Oxirgi yangilanish: {lastUpdated.toLocaleTimeString("uz-UZ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Yangilash
              </button>
              <button
                onClick={() => navigate("/analytics")}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Analitika
              </button>
              <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                <Bell className="w-4 h-4" />
                Ogohlantirishlar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Tezkor harakatlar</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            Yangi harakat
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`relative p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-all duration-200 text-left group ${
                action.urgent
                  ? "ring-2 ring-red-200 bg-red-50"
                  : "bg-gray-50 hover:bg-white hover:shadow-md"
              }`}
            >
              {action.urgent && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              )}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                >
                  {action.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            Vaqt oralig'i:
          </span>
          {(["today", "week", "month", "quarter"] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {timeframe === "today"
                ? "Bugun"
                : timeframe === "week"
                ? "Hafta"
                : timeframe === "month"
                ? "Oy"
                : "Kvartal"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Share2 className="w-4 h-4" />
            Ulashish
          </button>
          <button
            onClick={() => setShowModal("report")}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {operationalMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => navigate("/analytics")}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${getStatusColor(
                  metric.status
                )} rounded-xl flex items-center justify-center`}
              >
                {index === 0 && <Settings className="w-6 h-6 text-white" />}
                {index === 1 && <Users className="w-6 h-6 text-white" />}
                {index === 2 && <Briefcase className="w-6 h-6 text-white" />}
                {index === 3 && <Award className="w-6 h-6 text-white" />}
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                  metric.changeType === "increase"
                    ? "bg-green-100 text-green-700"
                    : metric.changeType === "decrease"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {metric.changeType === "increase" ? (
                  <ArrowUp className="w-3 h-3" />
                ) : metric.changeType === "decrease" ? (
                  <ArrowDown className="w-3 h-3" />
                ) : null}
                {Math.abs(metric.change).toFixed(1)}%
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Maqsad: {metric.target}</span>
                  <span>{metric.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getStatusColor(
                      metric.status
                    )} transition-all duration-500`}
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Executive Alerts */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Muhim ogohlantirishlar
          </h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <Link
              to="/alerts"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              Barchasini ko'rish
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {executiveAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-xl p-4 ${getSeverityColor(
                alert.severity
              )} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {alert.severity === "high" ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : alert.severity === "medium" ? (
                      <Clock className="w-5 h-5 text-orange-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      {alert.actionRequired && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                          Chora talab
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-90 mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs opacity-75">
                      <span className="capitalize">{alert.category}</span>
                      <span>•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {alert.actionRequired && (
                    <button
                      onClick={() => handleAlertAction(alert)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Chora ko'rish
                    </button>
                  )}
                  <button className="p-1 rounded hover:bg-white/50 transition-colors">
                    <X className="w-4 h-4 opacity-50" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Performance & Project Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Bo'limlar samaradorligi
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-4 h-4 text-gray-500" />
              </button>
              <Link
                to="/employees"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Users className="w-4 h-4" />
                Batafsil
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {employeePerformance.map((dept, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleDepartmentClick(dept)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${dept.color} rounded-lg flex items-center justify-center`}
                    >
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {dept.department}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {dept.employees} xodim
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {dept.performance}%
                    </p>
                    <p className="text-xs text-gray-500">Umumiy ball</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Samaradorlik</p>
                    <p className="text-sm font-medium">{dept.efficiency}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mamnuniyat</p>
                    <p className="text-sm font-medium">{dept.satisfaction}%</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${dept.color} transition-all duration-500`}
                    style={{ width: `${dept.performance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Loyihalar holati
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/projects")}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Yangi
              </button>
              <Link
                to="/projects"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Briefcase className="w-4 h-4" />
                Barchasini ko'rish
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {projectStatuses.map((project) => (
              <div
                key={project.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 ${getProjectStatusColor(
                        project.status
                      )} rounded-full`}
                    ></div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {project.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {project.team} xodim •{" "}
                        {new Date(project.deadline).toLocaleDateString("uz-UZ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {project.progress}%
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {project.status.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Byudjet</p>
                    <p className="text-sm font-medium">
                      {formatCurrency(project.budget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sarflangan</p>
                    <p className="text-sm font-medium">
                      {formatCurrency(project.spent)}
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProjectStatusColor(
                      project.status
                    )} transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => navigate("/operations")}
          className="group bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Operatsiyalar</h3>
              <p className="text-blue-100 text-sm">Jarayonlar boshqaruvi</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">94% samaradorlik</span>
            <ArrowUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => navigate("/employees")}
          className="group bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Xodimlar</h3>
              <p className="text-purple-100 text-sm">Jamoani boshqarish</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">45 xodim • 94% faol</span>
            <ArrowUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="group bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Executive hisobotlar</h3>
              <p className="text-green-100 text-sm">Qarorlar uchun tahlil</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Yangi hisobotlar</span>
            <FileText className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Render Modal */}
      {renderModal()}
    </div>
  );
};

export default CEODashboard;
