import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  FileText,
  Download,
  BarChart3,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Send,
  Edit,
  Trash2,
  Eye,
  Share2,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Users,
  Building,
  DollarSign,
  Target,
  Award,
  Briefcase,
  PieChart,
  Activity,
  Mail,
  Phone,
  Globe,
  Smartphone,
  Printer,
  Save,
  Copy,
  ExternalLink,
  Folder,
  Archive,
  Star,
  Flag,
  Bookmark,
  Timer,
  PlayCircle,
  PauseCircle,
  StopCircle,
  X,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Zap,
  Bell,
  Shield,
  Lock,
  Unlock,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  description: string;
  type:
    | "financial"
    | "employee"
    | "project"
    | "sales"
    | "attendance"
    | "performance"
    | "custom";
  format: "pdf" | "excel" | "csv" | "json";
  status: "draft" | "scheduled" | "generating" | "completed" | "failed";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  scheduledAt: string | null;
  completedAt: string | null;
  fileSize: number;
  downloadCount: number;
  isPublic: boolean;
  recipients: string[];
  frequency: "once" | "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  parameters: ReportParameters;
  tags: string[];
  priority: "low" | "medium" | "high";
}

interface ReportParameters {
  dateRange: {
    start: string;
    end: string;
  };
  departments: string[];
  employees: string[];
  projects: string[];
  includeCharts: boolean;
  includeDetails: boolean;
  groupBy: string;
  sortBy: string;
  filters: Record<string, any>;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: React.ReactNode;
  color: string;
  parameters: string[];
  estimatedTime: number;
  isPopular: boolean;
}

interface ReportStats {
  totalReports: number;
  completedReports: number;
  scheduledReports: number;
  failedReports: number;
  totalDownloads: number;
  avgGenerationTime: number;
  mostPopularType: string;
  storageUsed: number;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [stats, setStats] = useState<ReportStats>({
    totalReports: 0,
    completedReports: 0,
    scheduledReports: 0,
    failedReports: 0,
    totalDownloads: 0,
    avgGenerationTime: 0,
    mostPopularType: "",
    storageUsed: 0,
  });
  const [activeTab, setActiveTab] = useState<
    "reports" | "templates" | "scheduled" | "analytics"
  >("reports");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<ReportTemplate | null>(null);

  // Sample data
  useEffect(() => {
    const sampleTemplates: ReportTemplate[] = [
      {
        id: "1",
        name: "Moliyaviy hisobot",
        description: "Daromad, xarajat va foyda ko'rsatkichlari",
        type: "financial",
        icon: <DollarSign className="w-6 h-6" />,
        color: "bg-green-500",
        parameters: ["Sana oralig'i", "Valyuta", "Bo'limlar"],
        estimatedTime: 5,
        isPopular: true,
      },
      {
        id: "2",
        name: "Xodimlar hisoboti",
        description: "Xodimlar faoliyati va unumdorligi",
        type: "employee",
        icon: <Users className="w-6 h-6" />,
        color: "bg-blue-500",
        parameters: ["Bo'limlar", "Lavozimlar", "Davomat"],
        estimatedTime: 3,
        isPopular: true,
      },
      {
        id: "3",
        name: "Loyihalar hisoboti",
        description: "Loyihalar holati va progress",
        type: "project",
        icon: <Briefcase className="w-6 h-6" />,
        color: "bg-purple-500",
        parameters: ["Loyihalar", "Holat", "Byudjet"],
        estimatedTime: 4,
        isPopular: false,
      },
      {
        id: "4",
        name: "Sotuv hisoboti",
        description: "Sotuv ko'rsatkichlari va mijozlar",
        type: "sales",
        icon: <TrendingUp className="w-6 h-6" />,
        color: "bg-orange-500",
        parameters: ["Mahsulotlar", "Mijozlar", "Hudud"],
        estimatedTime: 6,
        isPopular: true,
      },
      {
        id: "5",
        name: "Davomat hisoboti",
        description: "Xodimlar davomat ma'lumotlari",
        type: "attendance",
        icon: <Clock className="w-6 h-6" />,
        color: "bg-indigo-500",
        parameters: ["Sana", "Bo'limlar", "Kechikishlar"],
        estimatedTime: 2,
        isPopular: false,
      },
      {
        id: "6",
        name: "Samaradorlik hisoboti",
        description: "Umumiy samaradorlik ko'rsatkichlari",
        type: "performance",
        icon: <Target className="w-6 h-6" />,
        color: "bg-red-500",
        parameters: ["KPI", "Maqsadlar", "Yutuqlar"],
        estimatedTime: 8,
        isPopular: false,
      },
    ];

    const sampleReports: Report[] = [
      {
        id: "1",
        title: "Iyul oyi moliyaviy hisobot",
        description: "2024-yil iyul oyining moliyaviy ko'rsatkichlari",
        type: "financial",
        format: "pdf",
        status: "completed",
        createdBy: "Aziz Karimov",
        createdAt: "2024-07-12T10:30:00Z",
        updatedAt: "2024-07-12T10:35:00Z",
        scheduledAt: null,
        completedAt: "2024-07-12T10:35:00Z",
        fileSize: 2.5,
        downloadCount: 15,
        isPublic: false,
        recipients: ["ceo@company.com", "finance@company.com"],
        frequency: "monthly",
        parameters: {
          dateRange: { start: "2024-07-01", end: "2024-07-31" },
          departments: ["Moliya", "Sotuv"],
          employees: [],
          projects: [],
          includeCharts: true,
          includeDetails: true,
          groupBy: "department",
          sortBy: "amount",
          filters: {},
        },
        tags: ["moliya", "oylik", "hisobot"],
        priority: "high",
      },
      {
        id: "2",
        title: "Xodimlar unumdorligi",
        description: "Haftalik xodimlar unumdorligi tahlili",
        type: "employee",
        format: "excel",
        status: "generating",
        createdBy: "Malika Tosheva",
        createdAt: "2024-07-12T14:20:00Z",
        updatedAt: "2024-07-12T14:25:00Z",
        scheduledAt: "2024-07-12T15:00:00Z",
        completedAt: null,
        fileSize: 0,
        downloadCount: 0,
        isPublic: true,
        recipients: ["hr@company.com"],
        frequency: "weekly",
        parameters: {
          dateRange: { start: "2024-07-08", end: "2024-07-14" },
          departments: ["IT", "Marketing"],
          employees: ["1", "2", "3"],
          projects: [],
          includeCharts: false,
          includeDetails: true,
          groupBy: "employee",
          sortBy: "performance",
          filters: {},
        },
        tags: ["xodimlar", "haftalik", "unumdorlik"],
        priority: "medium",
      },
      {
        id: "3",
        title: "Loyihalar holati",
        description: "Barcha loyihalar holati va progress",
        type: "project",
        format: "pdf",
        status: "scheduled",
        createdBy: "Bobur Rahimov",
        createdAt: "2024-07-11T09:15:00Z",
        updatedAt: "2024-07-11T09:15:00Z",
        scheduledAt: "2024-07-13T08:00:00Z",
        completedAt: null,
        fileSize: 0,
        downloadCount: 0,
        isPublic: false,
        recipients: ["management@company.com"],
        frequency: "weekly",
        parameters: {
          dateRange: { start: "2024-07-01", end: "2024-07-31" },
          departments: [],
          employees: [],
          projects: ["1", "2", "3", "4"],
          includeCharts: true,
          includeDetails: false,
          groupBy: "status",
          sortBy: "progress",
          filters: {},
        },
        tags: ["loyihalar", "holat", "progress"],
        priority: "medium",
      },
      {
        id: "4",
        title: "Sotuv statistikasi",
        description: "Choraklik sotuv statistikasi va tahlil",
        type: "sales",
        format: "excel",
        status: "failed",
        createdBy: "Dildora Nazarova",
        createdAt: "2024-07-10T16:45:00Z",
        updatedAt: "2024-07-10T17:00:00Z",
        scheduledAt: null,
        completedAt: null,
        fileSize: 0,
        downloadCount: 0,
        isPublic: false,
        recipients: ["sales@company.com"],
        frequency: "quarterly",
        parameters: {
          dateRange: { start: "2024-04-01", end: "2024-06-30" },
          departments: ["Sotuv"],
          employees: [],
          projects: [],
          includeCharts: true,
          includeDetails: true,
          groupBy: "product",
          sortBy: "revenue",
          filters: {},
        },
        tags: ["sotuv", "choraklik", "statistika"],
        priority: "low",
      },
    ];

    setTemplates(sampleTemplates);
    setReports(sampleReports);

    // Calculate stats
    const completedReports = sampleReports.filter(
      (r) => r.status === "completed"
    );
    const scheduledReports = sampleReports.filter(
      (r) => r.status === "scheduled"
    );
    const failedReports = sampleReports.filter((r) => r.status === "failed");
    const totalDownloads = sampleReports.reduce(
      (sum, r) => sum + r.downloadCount,
      0
    );

    setStats({
      totalReports: sampleReports.length,
      completedReports: completedReports.length,
      scheduledReports: scheduledReports.length,
      failedReports: failedReports.length,
      totalDownloads,
      avgGenerationTime: 4.2,
      mostPopularType: "financial",
      storageUsed: 125.6,
    });
  }, []);

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "generating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "scheduled":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "generating":
        return <PlayCircle className="w-4 h-4 text-blue-600" />;
      case "scheduled":
        return <Clock className="w-4 h-4 text-orange-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "draft":
        return <Edit className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "financial":
        return <DollarSign className="w-4 h-4" />;
      case "employee":
        return <Users className="w-4 h-4" />;
      case "project":
        return <Briefcase className="w-4 h-4" />;
      case "sales":
        return <TrendingUp className="w-4 h-4" />;
      case "attendance":
        return <Clock className="w-4 h-4" />;
      case "performance":
        return <Target className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) return `${Math.round(sizeInMB * 1024)} KB`;
    return `${sizeInMB.toFixed(1)} MB`;
  };

  const handleCreateReport = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    setShowModal("create-report");
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setShowModal("view-report");
  };

  const handleDownloadReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? { ...report, downloadCount: report.downloadCount + 1 }
          : report
      )
    );
    // Simulate download
    console.log(`Downloading report ${reportId}`);
  };

  const handleDeleteReport = (reportId: string) => {
    setReports((prev) => prev.filter((report) => report.id !== reportId));
  };

  const handleGenerateReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, status: "generating" } : report
      )
    );

    // Simulate generation
    setTimeout(() => {
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: "completed",
                completedAt: new Date().toISOString(),
                fileSize: Math.random() * 5 + 1,
              }
            : report
        )
      );
    }, 3000);
  };

  const closeModal = () => {
    setShowModal(null);
    setSelectedReport(null);
    setSelectedTemplate(null);
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {showModal === "create-report" && "Yangi hisobot yaratish"}
              {showModal === "view-report" && "Hisobot tafsilotlari"}
              {showModal === "schedule-report" && "Hisobotni rejalashtirish"}
            </h3>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {showModal === "create-report" && selectedTemplate && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div
                  className={`w-12 h-12 ${selectedTemplate.color} rounded-lg flex items-center justify-center text-white`}
                >
                  {selectedTemplate.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedTemplate.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedTemplate.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hisobot nomi
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hisobot nomini kiriting..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tavsif
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hisobot tavsifini kiriting..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sana oralig'i
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bo'limlar
                    </label>
                    <select
                      multiple
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="it">IT</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sotuv</option>
                      <option value="hr">HR</option>
                      <option value="finance">Moliya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qo'shimcha parametrlar
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Grafiklar qo'shish</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Batafsil ma'lumotlar</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Ommaviy hisobot</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h5 className="font-medium text-gray-900 mb-3">
                  Email yuborish
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qabul qiluvchilar
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@example.com, email2@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Takrorlash
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="once">Bir marta</option>
                      <option value="daily">Har kuni</option>
                      <option value="weekly">Har hafta</option>
                      <option value="monthly">Har oy</option>
                      <option value="quarterly">Har chorak</option>
                    </select>
                  </div>
                </div>
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
                    // Handle report creation
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Yaratish
                </button>
              </div>
            </div>
          )}

          {showModal === "view-report" && selectedReport && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                  {getTypeIcon(selectedReport.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {selectedReport.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedReport.description}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    selectedReport.status
                  )}`}
                >
                  {getStatusIcon(selectedReport.status)}
                  <span className="ml-1">
                    {selectedReport.status === "completed"
                      ? "Tugallangan"
                      : selectedReport.status === "generating"
                      ? "Yaratilmoqda"
                      : selectedReport.status === "scheduled"
                      ? "Rejalashtirilgan"
                      : selectedReport.status === "failed"
                      ? "Xato"
                      : "Qoralama"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">
                      Umumiy ma'lumot
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yaratuvchi:</span>
                        <span className="font-medium">
                          {selectedReport.createdBy}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yaratilgan:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedReport.createdAt
                          ).toLocaleDateString("uz-UZ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Format:</span>
                        <span className="font-medium uppercase">
                          {selectedReport.format}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hajmi:</span>
                        <span className="font-medium">
                          {formatFileSize(selectedReport.fileSize)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yuklab olindi:</span>
                        <span className="font-medium">
                          {selectedReport.downloadCount} marta
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">
                      Parametrlar
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sana:</span>
                        <span className="font-medium">
                          {selectedReport.parameters.dateRange.start} -{" "}
                          {selectedReport.parameters.dateRange.end}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guruhlash:</span>
                        <span className="font-medium">
                          {selectedReport.parameters.groupBy}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saralash:</span>
                        <span className="font-medium">
                          {selectedReport.parameters.sortBy}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">
                      Email sozlamalari
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Qabul qiluvchilar:
                        </span>
                        <span className="font-medium">
                          {selectedReport.recipients.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Takrorlash:</span>
                        <span className="font-medium">
                          {selectedReport.frequency === "once"
                            ? "Bir marta"
                            : selectedReport.frequency === "daily"
                            ? "Har kuni"
                            : selectedReport.frequency === "weekly"
                            ? "Har hafta"
                            : selectedReport.frequency === "monthly"
                            ? "Har oy"
                            : "Har chorak"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ommaviy:</span>
                        <span className="font-medium">
                          {selectedReport.isPublic ? "Ha" : "Yo'q"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Teglar</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                {selectedReport.status === "completed" && (
                  <button
                    onClick={() => handleDownloadReport(selectedReport.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Yuklab olish
                  </button>
                )}
                {selectedReport.status === "draft" && (
                  <button
                    onClick={() => handleGenerateReport(selectedReport.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Yaratish
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Ulashish
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Send className="w-4 h-4" />
                  Email yuborish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Hisobotlar - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hisobotlar generatori
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              PDF, Excel, email delivery va scheduling bilan hisobotlar yaratish
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              Yangi hisobot
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Settings className="w-4 h-4" />
              Sozlamalar
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                  <FileText size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Jami hisobotlar
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalReports}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 font-medium">
                  {stats.scheduledReports} rejalashtirilgan
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                  <CheckCircle size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Tugallangan
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.completedReports}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">
                  {Math.round(
                    (stats.completedReports / stats.totalReports) * 100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600">
                  <Download size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Yuklab olindi
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalDownloads}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-600 font-medium">
                  {stats.storageUsed} MB
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
                  <Clock size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    O'rtacha vaqt
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.avgGenerationTime}m
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-600 font-medium">
                  Yaratish vaqti
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "reports", label: "Hisobotlar", icon: FileText },
                { id: "templates", label: "Shablonlar", icon: Folder },
                { id: "scheduled", label: "Rejalashtirilgan", icon: Calendar },
                { id: "analytics", label: "Analitika", icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "reports" && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Hisobotlarni qidirish..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Barcha turlar</option>
                    <option value="financial">Moliyaviy</option>
                    <option value="employee">Xodimlar</option>
                    <option value="project">Loyihalar</option>
                    <option value="sales">Sotuv</option>
                    <option value="attendance">Davomat</option>
                    <option value="performance">Samaradorlik</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Barcha holatlar</option>
                    <option value="completed">Tugallangan</option>
                    <option value="generating">Yaratilmoqda</option>
                    <option value="scheduled">Rejalashtirilgan</option>
                    <option value="failed">Xato</option>
                    <option value="draft">Qoralama</option>
                  </select>

                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    Yangilash
                  </button>
                </div>

                {/* Reports List */}
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                            {getTypeIcon(report.type)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {report.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {report.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{report.createdBy}</span>
                              <span>•</span>
                              <span>
                                {new Date(report.createdAt).toLocaleDateString(
                                  "uz-UZ"
                                )}
                              </span>
                              <span>•</span>
                              <span className="uppercase">{report.format}</span>
                              {report.fileSize > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{formatFileSize(report.fileSize)}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              report.status
                            )}`}
                          >
                            {getStatusIcon(report.status)}
                            <span>
                              {report.status === "completed"
                                ? "Tugallangan"
                                : report.status === "generating"
                                ? "Yaratilmoqda"
                                : report.status === "scheduled"
                                ? "Rejalashtirilgan"
                                : report.status === "failed"
                                ? "Xato"
                                : "Qoralama"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewReport(report)}
                              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {report.status === "completed" && (
                              <button
                                onClick={() => handleDownloadReport(report.id)}
                                className="p-2 text-green-600 hover:text-green-900 transition-colors"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            )}
                            {report.status === "draft" && (
                              <button
                                onClick={() => handleGenerateReport(report.id)}
                                className="p-2 text-blue-600 hover:text-blue-900 transition-colors"
                              >
                                <PlayCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReport(report.id)}
                              className="p-2 text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredReports.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Hech qanday hisobot topilmadi
                    </h3>
                    <p className="text-gray-600">
                      Yangi hisobot yaratish uchun shablondan foydalaning
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "templates" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center text-white`}
                        >
                          {template.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {template.description}
                          </p>
                        </div>
                        {template.isPopular && (
                          <div className="ml-auto">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Parametrlar:</span>
                          <span className="font-medium">
                            {template.parameters.length}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Vaqt:</span>
                          <span className="font-medium">
                            ~{template.estimatedTime} daqiqa
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.parameters.slice(0, 3).map((param, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full"
                          >
                            {param}
                          </span>
                        ))}
                        {template.parameters.length > 3 && (
                          <span className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full">
                            +{template.parameters.length - 3}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleCreateReport(template)}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Hisobot yaratish
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "scheduled" && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Rejalashtirilgan hisobotlar
                  </h3>
                  <p className="text-gray-600">
                    Avtomatik yaratiluvchi hisobotlar ro'yxati
                  </p>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Hisobot turlari
                    </h4>
                    <div className="space-y-3">
                      {[
                        { type: "Moliyaviy", count: 8, color: "bg-green-500" },
                        { type: "Xodimlar", count: 6, color: "bg-blue-500" },
                        { type: "Loyihalar", count: 4, color: "bg-purple-500" },
                        { type: "Sotuv", count: 3, color: "bg-orange-500" },
                        { type: "Davomat", count: 2, color: "bg-indigo-500" },
                      ].map((item) => (
                        <div
                          key={item.type}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 ${item.color} rounded-full`}
                            ></div>
                            <span className="text-sm text-gray-700">
                              {item.type}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Oxirgi faollik
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          action: "Moliyaviy hisobot yaratildi",
                          time: "2 soat oldin",
                        },
                        {
                          action: "Xodimlar hisoboti yuklandi",
                          time: "1 kun oldin",
                        },
                        {
                          action: "Loyihalar hisoboti rejalashtirildi",
                          time: "2 kun oldin",
                        },
                        { action: "Sotuv hisoboti xato", time: "3 kun oldin" },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">
                            {activity.action}
                          </span>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Render Modal */}
        {renderModal()}
      </div>
    </>
  );
};

export default ReportsPage;
