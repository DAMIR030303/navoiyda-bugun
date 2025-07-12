import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Monitor,
  Smartphone,
  Users,
  FileText,
  Globe,
  Shield,
  Activity,
  RefreshCw,
  ExternalLink,
  Search,
  Clock,
  BookOpen,
  Lock,
} from "lucide-react";

interface TestCase {
  id: string;
  category: string;
  name: string;
  description: string;
  path: string;
  status: "pending" | "running" | "passed" | "failed";
  duration?: number;
  error?: string;
  requiredRoles?: string[];
  features: string[];
}

interface TestCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  testCount: number;
  passedCount: number;
  failedCount: number;
}

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [categories, setCategories] = useState<TestCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [currentRunningTest, setCurrentRunningTest] = useState<string | null>(
    null
  );

  useEffect(() => {
    initializeTests();
  }, []);

  const initializeTests = () => {
    const mockTestCases: TestCase[] = [
      // CEO Dashboard Tests
      {
        id: "ceo-dashboard-basic",
        category: "dashboard",
        name: "CEO Dashboard - Asosiy Ko'rsatkichlar",
        description:
          "CEO dashboard sahifasining asosiy ko'rsatkichlari va KPI larni test qilish",
        path: "/dashboard/ceo",
        status: "pending",
        requiredRoles: ["CEO", "founder"],
        features: [
          "KPI monitoring",
          "Quick actions",
          "Executive alerts",
          "Department performance",
        ],
      },
      {
        id: "ceo-dashboard-modals",
        category: "dashboard",
        name: "CEO Dashboard - Modal Windows",
        description: "CEO dashboard dagi barcha modal oynalarni test qilish",
        path: "/dashboard/ceo",
        status: "pending",
        requiredRoles: ["CEO", "founder"],
        features: [
          "Meeting modal",
          "Report modal",
          "Alert actions",
          "Quick actions",
        ],
      },

      // Task Management Tests
      {
        id: "tasks-crud",
        category: "tasks",
        name: "Vazifalar - CRUD Operatsiyalar",
        description:
          "Vazifalar yaratish, o'qish, yangilash va o'chirish funksiyalarini test qilish",
        path: "/tasks",
        status: "pending",
        features: ["Create task", "Read tasks", "Update task", "Delete task"],
      },
      {
        id: "tasks-assignment",
        category: "tasks",
        name: "Vazifalar - Tayinlash va Tracking",
        description:
          "Vazifalarni foydalanuvchilarga tayinlash va kuzatish funksiyalarini test qilish",
        path: "/tasks",
        status: "pending",
        features: [
          "Task assignment",
          "Progress tracking",
          "Status updates",
          "Priority management",
        ],
      },
      {
        id: "tasks-filtering",
        category: "tasks",
        name: "Vazifalar - Filtrlash va Qidiruv",
        description:
          "Vazifalarni filtrlash va qidiruv funksiyalarini test qilish",
        path: "/tasks",
        status: "pending",
        features: [
          "Search tasks",
          "Filter by status",
          "Filter by priority",
          "Filter by assignee",
        ],
      },

      // Attendance System Tests
      {
        id: "attendance-checkin",
        category: "attendance",
        name: "Davomat - Check-in/Check-out",
        description:
          "Davomat tizimida kirish va chiqish funksiyalarini test qilish",
        path: "/attendance",
        status: "pending",
        features: [
          "Manual check-in",
          "Manual check-out",
          "QR code scanning",
          "GPS tracking",
        ],
      },
      {
        id: "attendance-tracking",
        category: "attendance",
        name: "Davomat - Vaqt Tracking",
        description:
          "Ish vaqti hisobini va ortiqcha vaqt kuzatishni test qilish",
        path: "/attendance",
        status: "pending",
        features: [
          "Working hours calculation",
          "Overtime tracking",
          "Break time",
          "Location tracking",
        ],
      },
      {
        id: "attendance-reports",
        category: "attendance",
        name: "Davomat - Hisobotlar",
        description:
          "Davomat hisobotlari va eksport funksiyalarini test qilish",
        path: "/attendance",
        status: "pending",
        features: [
          "Daily reports",
          "Weekly reports",
          "Monthly reports",
          "Export to Excel",
        ],
      },

      // Learning Platform Tests
      {
        id: "learning-courses",
        category: "learning",
        name: "O'qish - Kurslar",
        description: "O'qish platformasidagi kurslar va darslarni test qilish",
        path: "/development",
        status: "pending",
        features: [
          "Course catalog",
          "Lesson navigation",
          "Video playback",
          "Progress tracking",
        ],
      },
      {
        id: "learning-quizzes",
        category: "learning",
        name: "O'qish - Testlar va Sertifikatlar",
        description:
          "Test tizimi va sertifikat berish funksiyalarini test qilish",
        path: "/development",
        status: "pending",
        features: [
          "Quiz system",
          "Scoring",
          "Time limits",
          "Certificate generation",
        ],
      },
      {
        id: "learning-achievements",
        category: "learning",
        name: "O'qish - Yutuqlar",
        description: "Yutuqlar va badge tizimini test qilish",
        path: "/development",
        status: "pending",
        features: [
          "Achievement system",
          "Badges",
          "Leaderboard",
          "Progress analytics",
        ],
      },

      // Reports Generator Tests
      {
        id: "reports-generation",
        category: "reports",
        name: "Hisobotlar - Generatsiya",
        description:
          "Hisobotlarni turli formatlarda yaratish funksiyalarini test qilish",
        path: "/reports",
        status: "pending",
        features: [
          "PDF generation",
          "Excel export",
          "CSV export",
          "JSON export",
        ],
      },
      {
        id: "reports-scheduling",
        category: "reports",
        name: "Hisobotlar - Rejalash",
        description:
          "Hisobotlarni rejalash va email yuborish funksiyalarini test qilish",
        path: "/reports",
        status: "pending",
        features: [
          "Schedule reports",
          "Email delivery",
          "Recurring reports",
          "Custom parameters",
        ],
      },
      {
        id: "reports-templates",
        category: "reports",
        name: "Hisobotlar - Shablonlar",
        description:
          "Hisobot shablonlari va sozlash funksiyalarini test qilish",
        path: "/reports",
        status: "pending",
        features: [
          "Pre-built templates",
          "Custom templates",
          "Parameter configuration",
          "Template analytics",
        ],
      },

      // Admin Panel Tests
      {
        id: "admin-users",
        category: "admin",
        name: "Admin - Foydalanuvchilar",
        description:
          "Admin panelda foydalanuvchilarni boshqarish funksiyalarini test qilish",
        path: "/admin",
        status: "pending",
        requiredRoles: ["admin", "founder"],
        features: [
          "User management",
          "Role assignment",
          "Status management",
          "User search",
        ],
      },
      {
        id: "admin-settings",
        category: "admin",
        name: "Admin - Tizim Sozlamalari",
        description:
          "Tizim sozlamalari va konfiguratsiya funksiyalarini test qilish",
        path: "/admin",
        status: "pending",
        requiredRoles: ["admin", "founder"],
        features: [
          "System settings",
          "Security settings",
          "Notification settings",
          "Backup settings",
        ],
      },
      {
        id: "admin-monitoring",
        category: "admin",
        name: "Admin - Monitoring va Loglar",
        description:
          "Tizim monitoring va log kuzatuv funksiyalarini test qilish",
        path: "/admin",
        status: "pending",
        requiredRoles: ["admin", "founder"],
        features: [
          "System monitoring",
          "Log viewing",
          "Performance metrics",
          "Real-time updates",
        ],
      },

      // API Integration Tests
      {
        id: "api-services",
        category: "api",
        name: "API - Servislar",
        description:
          "API servislarni boshqarish va test qilish funksiyalarini test qilish",
        path: "/api-integration",
        status: "pending",
        requiredRoles: ["admin", "founder", "developer"],
        features: [
          "Service management",
          "API testing",
          "Authentication",
          "Rate limiting",
        ],
      },
      {
        id: "api-webhooks",
        category: "api",
        name: "API - Webhooks",
        description:
          "Webhook hodisalari va monitoring funksiyalarini test qilish",
        path: "/api-integration",
        status: "pending",
        requiredRoles: ["admin", "founder", "developer"],
        features: [
          "Webhook events",
          "Event monitoring",
          "Retry logic",
          "Payload inspection",
        ],
      },
      {
        id: "api-logs",
        category: "api",
        name: "API - Loglar",
        description:
          "API loglarni ko'rish va tahlil qilish funksiyalarini test qilish",
        path: "/api-integration",
        status: "pending",
        requiredRoles: ["admin", "founder", "developer"],
        features: [
          "API logs",
          "Request tracking",
          "Error monitoring",
          "Performance analytics",
        ],
      },

      // PWA Features Tests
      {
        id: "pwa-offline",
        category: "pwa",
        name: "PWA - Offline Rejim",
        description: "Progressive Web App offline funksiyalarini test qilish",
        path: "/",
        status: "pending",
        features: [
          "Offline mode",
          "Service worker",
          "Cache management",
          "Sync when online",
        ],
      },
      {
        id: "pwa-notifications",
        category: "pwa",
        name: "PWA - Push Bildirishnomalar",
        description:
          "Push bildirishnomalar va real-time yangilanishlarni test qilish",
        path: "/",
        status: "pending",
        features: [
          "Push notifications",
          "Real-time updates",
          "Notification permissions",
          "Background sync",
        ],
      },
      {
        id: "pwa-install",
        category: "pwa",
        name: "PWA - O'rnatish",
        description: "PWA o'rnatish va mobil xususiyatlarni test qilish",
        path: "/",
        status: "pending",
        features: [
          "Install prompt",
          "App icon",
          "Splash screen",
          "Mobile navigation",
        ],
      },

      // Authentication Tests
      {
        id: "auth-login",
        category: "auth",
        name: "Autentifikatsiya - Kirish",
        description:
          "Tizimga kirish va sessiya boshqaruvi funksiyalarini test qilish",
        path: "/login",
        status: "pending",
        features: [
          "User login",
          "Session management",
          "Remember me",
          "Auto logout",
        ],
      },
      {
        id: "auth-roles",
        category: "auth",
        name: "Autentifikatsiya - Rollar",
        description: "Foydalanuvchi rollari va ruxsatlar tizimini test qilish",
        path: "/",
        status: "pending",
        features: [
          "Role-based access",
          "Permission checks",
          "Protected routes",
          "Role switching",
        ],
      },
      {
        id: "auth-security",
        category: "auth",
        name: "Autentifikatsiya - Xavfsizlik",
        description:
          "Xavfsizlik choralari va himoya funksiyalarini test qilish",
        path: "/",
        status: "pending",
        features: [
          "Password security",
          "Session timeout",
          "CSRF protection",
          "XSS prevention",
        ],
      },
    ];

    setTestCases(mockTestCases);

    // Calculate categories
    const categoryMap = new Map() as Map<string, TestCategory>;

    mockTestCases.forEach((test) => {
      if (!categoryMap.has(test.category)) {
        categoryMap.set(test.category, {
          id: test.category,
          name: getCategoryName(test.category),
          description: getCategoryDescription(test.category),
          icon: getCategoryIcon(test.category),
          color: getCategoryColor(test.category),
          testCount: 0,
          passedCount: 0,
          failedCount: 0,
        });
      }

      const category = categoryMap.get(test.category)!;
      category.testCount++;
      if (test.status === "passed") category.passedCount++;
      if (test.status === "failed") category.failedCount++;
    });

    setCategories(Array.from(categoryMap.values()));
  };

  const getCategoryName = (category: string): string => {
    const names: Record<string, string> = {
      dashboard: "Dashboard",
      tasks: "Vazifalar",
      attendance: "Davomat",
      learning: "O'qish",
      reports: "Hisobotlar",
      admin: "Admin Panel",
      api: "API Integratsiya",
      pwa: "PWA Xususiyatlari",
      auth: "Autentifikatsiya",
    };
    return names[category] || category;
  };

  const getCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      dashboard: "Dashboard sahifalarini test qilish",
      tasks: "Vazifalar boshqaruvi tizimini test qilish",
      attendance: "Davomat tizimini test qilish",
      learning: "O'qish platformasini test qilish",
      reports: "Hisobotlar generatorini test qilish",
      admin: "Admin panelni test qilish",
      api: "API integratsiyasini test qilish",
      pwa: "PWA xususiyatlarini test qilish",
      auth: "Autentifikatsiya tizimini test qilish",
    };
    return descriptions[category] || category;
  };

  const getCategoryIcon = (category: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      dashboard: <Monitor className="w-5 h-5" />,
      tasks: <CheckCircle className="w-5 h-5" />,
      attendance: <Users className="w-5 h-5" />,
      learning: <BookOpen className="w-5 h-5" />,
      reports: <FileText className="w-5 h-5" />,
      admin: <Shield className="w-5 h-5" />,
      api: <Globe className="w-5 h-5" />,
      pwa: <Smartphone className="w-5 h-5" />,
      auth: <Lock className="w-5 h-5" />,
    };
    return icons[category] || <Activity className="w-5 h-5" />;
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      dashboard: "blue",
      tasks: "green",
      attendance: "purple",
      learning: "orange",
      reports: "red",
      admin: "gray",
      api: "indigo",
      pwa: "pink",
      auth: "yellow",
    };
    return colors[category] || "gray";
  };

  const runSingleTest = async (testId: string) => {
    setCurrentRunningTest(testId);
    setTestCases((prev) =>
      prev.map((test) =>
        test.id === testId ? { ...test, status: "running" } : test
      )
    );

    try {
      const test = testCases.find((t) => t.id === testId);
      if (!test) return;

      // Navigate to test page
      navigate(test.path);

      // Simulate test execution
      const startTime = Date.now();
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 3000 + 1000)
      );
      const duration = Date.now() - startTime;

      // Simulate random success/failure
      const success = Math.random() > 0.2; // 80% success rate

      setTestCases((prev) =>
        prev.map((t) =>
          t.id === testId
            ? {
                ...t,
                status: success ? "passed" : "failed",
                duration,
                error: success
                  ? undefined
                  : "Test failed: Mock error for testing",
              }
            : t
        )
      );
    } catch (error) {
      setTestCases((prev) =>
        prev.map((t) =>
          t.id === testId
            ? {
                ...t,
                status: "failed",
                error: error instanceof Error ? error.message : "Unknown error",
              }
            : t
        )
      );
    } finally {
      setCurrentRunningTest(null);
    }
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    const filteredTests = getFilteredTests();

    for (const test of filteredTests) {
      if (test.status !== "running") {
        await runSingleTest(test.id);
      }
    }

    setIsRunningAll(false);
  };

  const resetTests = () => {
    setTestCases((prev) =>
      prev.map((test) => ({
        ...test,
        status: "pending",
        duration: undefined,
        error: undefined,
      }))
    );
  };

  const getFilteredTests = () => {
    return testCases.filter((test) => {
      const matchesCategory =
        selectedCategory === "all" || test.category === selectedCategory;
      const matchesSearch =
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "text-green-600 bg-green-100";
      case "failed":
        return "text-red-600 bg-red-100";
      case "running":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case "pending":
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const filteredTests = getFilteredTests();
  const totalTests = filteredTests.length;
  const passedTests = filteredTests.filter((t) => t.status === "passed").length;
  const failedTests = filteredTests.filter((t) => t.status === "failed").length;
  const runningTests = filteredTests.filter(
    (t) => t.status === "running"
  ).length;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dastur Testlari
        </h1>
        <p className="text-gray-600">
          Barcha funksiyalarni test qilish va tekshirish
        </p>
      </div>

      {/* Test Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Jami testlar</p>
              <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Muvaffaqiyatli
              </p>
              <p className="text-2xl font-bold text-green-600">{passedTests}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Xatolar</p>
              <p className="text-2xl font-bold text-red-600">{failedTests}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ishlamoqda</p>
              <p className="text-2xl font-bold text-blue-600">{runningTests}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Test Categories */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Test Kategoriyalari
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedCategory === category.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 bg-${category.color}-100 rounded-lg`}>
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Jami: {category.testCount}
                </span>
                <span className="text-green-600">✓ {category.passedCount}</span>
                <span className="text-red-600">✗ {category.failedCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Test qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Barcha kategoriyalar</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              onClick={resetTests}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={runAllTests}
              disabled={isRunningAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
            >
              {isRunningAll ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Ishlamoqda...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Barcha testlarni ishga tushirish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Test Cases */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Test Holatlari
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(test.status)}
                    <h4 className="font-medium text-gray-900">{test.name}</h4>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        test.status
                      )}`}
                    >
                      {test.status === "passed"
                        ? "Muvaffaqiyatli"
                        : test.status === "failed"
                        ? "Xato"
                        : test.status === "running"
                        ? "Ishlamoqda"
                        : "Kutilmoqda"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {test.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {test.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  {test.requiredRoles && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Kerakli rollar: {test.requiredRoles.join(", ")}
                      </span>
                    </div>
                  )}
                  {test.duration && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Vaqt: {test.duration}ms
                      </span>
                    </div>
                  )}
                  {test.error && (
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-600">{test.error}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate(test.path)}
                    className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                    title="Sahifaga o'tish"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => runSingleTest(test.id)}
                    disabled={
                      test.status === "running" ||
                      currentRunningTest === test.id
                    }
                    className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 disabled:opacity-50"
                    title="Testni ishga tushirish"
                  >
                    {test.status === "running" ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
