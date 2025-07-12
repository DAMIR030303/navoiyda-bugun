import React, { useState } from "react";
import {
  FileText,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Clock,
  Edit3,
  Search,
  Plus,
  Filter,
  BarChart3,
  Eye,
  Star,
  MessageCircle,
  Calendar,
  User,
  Target,
  Zap,
  BookOpen,
  PenTool,
  Send,
  Download,
  Share2,
  AlertCircle,
  XCircle,
} from "lucide-react";

const ScreenwriterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Jami ssenariylar",
      value: "89",
      change: "+12",
      changeType: "positive",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Tasdiqlangan",
      value: "67",
      change: "+8",
      changeType: "positive",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Jarayonda",
      value: "15",
      change: "+3",
      changeType: "positive",
      icon: Clock,
      color: "orange",
    },
    {
      title: "G'oyalar",
      value: "124",
      change: "+18",
      changeType: "positive",
      icon: Lightbulb,
      color: "purple",
    },
  ];

  const scripts = [
    {
      id: 1,
      title: "Yangi mahsulot tanishtiruvi",
      type: "promotional",
      duration: "2:30",
      status: "approved",
      priority: "high",
      assignedTo: "Malika T.",
      createdDate: "2024-01-20",
      deadline: "2024-01-25",
      wordCount: 450,
      revisions: 2,
      description: "Yangi mahsulot uchun tanishtiruv video ssenariysi",
    },
    {
      id: 2,
      title: "Kompaniya tarixi",
      type: "corporate",
      duration: "5:00",
      status: "review",
      priority: "medium",
      assignedTo: "Alisher K.",
      createdDate: "2024-01-18",
      deadline: "2024-01-28",
      wordCount: 850,
      revisions: 1,
      description: "Kompaniya tarix va yutuqlari haqida video",
    },
    {
      id: 3,
      title: "Mijoz sharhi",
      type: "testimonial",
      duration: "1:45",
      status: "draft",
      priority: "low",
      assignedTo: "Nodira Y.",
      createdDate: "2024-01-15",
      deadline: "2024-01-30",
      wordCount: 320,
      revisions: 0,
      description: "Mijoz tajribasi va sharhi",
    },
    {
      id: 4,
      title: "Mahsulot qo'llanmasi",
      type: "tutorial",
      duration: "8:15",
      status: "completed",
      priority: "high",
      assignedTo: "Bobur R.",
      createdDate: "2024-01-10",
      deadline: "2024-01-20",
      wordCount: 1200,
      revisions: 3,
      description: "Mahsulot ishlatish bo'yicha qo'llanma",
    },
  ];

  const ideas = [
    {
      id: 1,
      title: "Xodimlar hayoti",
      description: "Kompaniya xodimlarining kundalik hayoti va ish jarayoni",
      category: "behind_scenes",
      status: "approved",
      votes: 15,
      author: "Dilshod N.",
      createdDate: "2024-01-19",
      tags: ["xodimlar", "hayot", "ish"],
    },
    {
      id: 2,
      title: "Mijozlar bilan uchrashuv",
      description: "Eng yaxshi mijozlar bilan intervyu va suhbat",
      category: "interview",
      status: "pending",
      votes: 8,
      author: "Malika T.",
      createdDate: "2024-01-18",
      tags: ["mijoz", "intervyu", "suhbat"],
    },
    {
      id: 3,
      title: "Mahsulot yaratish jarayoni",
      description: "Mahsulot qanday yaratilishini ko'rsatish",
      category: "process",
      status: "in_development",
      votes: 12,
      author: "Alisher K.",
      createdDate: "2024-01-17",
      tags: ["mahsulot", "jarayon", "yaratish"],
    },
    {
      id: 4,
      title: "Kompaniya yutuqlari",
      description: "Oxirgi yildagi eng katta yutuqlar va muvaffaqiyatlar",
      category: "achievement",
      status: "approved",
      votes: 22,
      author: "Nodira Y.",
      createdDate: "2024-01-16",
      tags: ["yutuq", "muvaffaqiyat", "kompaniya"],
    },
  ];

  const trends = [
    {
      id: 1,
      keyword: "AI texnologiyalar",
      growth: "+45%",
      searches: "2.4M",
      difficulty: "medium",
      opportunity: "high",
      relatedTopics: ["sun'iy intellekt", "avtomatlashtirish", "innovatsiya"],
    },
    {
      id: 2,
      keyword: "Ekologik mahsulotlar",
      growth: "+32%",
      searches: "1.8M",
      difficulty: "low",
      opportunity: "high",
      relatedTopics: ["ekologiya", "tabiiy", "organik"],
    },
    {
      id: 3,
      keyword: "Masofaviy ish",
      growth: "+28%",
      searches: "3.1M",
      difficulty: "high",
      opportunity: "medium",
      relatedTopics: ["uzoq ish", "moslashuvchanlik", "texnologiya"],
    },
    {
      id: 4,
      keyword: "Raqamli marketing",
      growth: "+25%",
      searches: "1.5M",
      difficulty: "medium",
      opportunity: "medium",
      relatedTopics: ["SMM", "reklama", "onlayn"],
    },
  ];

  const templates = [
    {
      id: 1,
      name: "Mahsulot tanishtiruvi",
      type: "promotional",
      duration: "2-3 daqiqa",
      sections: ["Kirish", "Muammo", "Yechim", "Foyda", "Chaqiruv"],
      usage: 23,
    },
    {
      id: 2,
      name: "Mijoz sharhi",
      type: "testimonial",
      duration: "1-2 daqiqa",
      sections: ["Tanishuv", "Muammo", "Yechim", "Natija"],
      usage: 18,
    },
    {
      id: 3,
      name: "Kompaniya yangiliklari",
      type: "news",
      duration: "3-5 daqiqa",
      sections: ["Yangilik", "Tafsilot", "Ta'sir", "Kelajak"],
      usage: 15,
    },
    {
      id: 4,
      name: "Qo'llanma video",
      type: "tutorial",
      duration: "5-10 daqiqa",
      sections: ["Kirish", "Tayyorgarlik", "Qadamlar", "Xulosa"],
      usage: 12,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "in_development":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
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
                  <span className="text-sm text-gray-500 ml-1">bu oy</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Scripts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            So'nggi ssenariylar
          </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Yangi ssenariy</span>
          </button>
        </div>
        <div className="space-y-4">
          {scripts.slice(0, 3).map((script) => (
            <div
              key={script.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{script.title}</p>
                  <p className="text-sm text-gray-600">
                    {script.type} • {script.duration} • {script.wordCount} so'z
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      script.status
                    )}`}
                  >
                    {script.status === "approved"
                      ? "Tasdiqlangan"
                      : script.status === "review"
                      ? "Ko'rib chiqilmoqda"
                      : script.status === "draft"
                      ? "Qoralama"
                      : "Tugallangan"}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                      script.priority
                    )}`}
                  >
                    {script.priority === "high"
                      ? "Yuqori"
                      : script.priority === "medium"
                      ? "O'rta"
                      : "Past"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Muddat: {script.deadline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Ideas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Eng yaxshi g'oyalar
          </h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Lightbulb className="w-4 h-4" />
            <span>Yangi g'oya</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ideas.slice(0, 4).map((idea) => (
            <div key={idea.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{idea.title}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{idea.votes}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    idea.status
                  )}`}
                >
                  {idea.status === "approved"
                    ? "Tasdiqlangan"
                    : idea.status === "pending"
                    ? "Kutilmoqda"
                    : "Ishlanmoqda"}
                </span>
                <span className="text-xs text-gray-500">{idea.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScripts = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Ssenariylar</h3>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Yangi ssenariy</span>
          </button>
        </div>
      </div>

      {/* Scripts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ssenariy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Muhimlik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Muddat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scripts.map((script) => (
                <tr key={script.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {script.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {script.duration} • {script.wordCount} so'z
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {script.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        script.status
                      )}`}
                    >
                      {script.status === "approved"
                        ? "Tasdiqlangan"
                        : script.status === "review"
                        ? "Ko'rib chiqilmoqda"
                        : script.status === "draft"
                        ? "Qoralama"
                        : "Tugallangan"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                        script.priority
                      )}`}
                    >
                      {script.priority === "high"
                        ? "Yuqori"
                        : script.priority === "medium"
                        ? "O'rta"
                        : "Past"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {script.deadline}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Ko'rish
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      Tahrirlash
                    </button>
                    <button className="text-purple-600 hover:text-purple-900">
                      Yuborish
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

  const renderIdeas = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Kontent g'oyalari
        </h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Lightbulb className="w-4 h-4" />
          <span>Yangi g'oya</span>
        </button>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">
                {idea.title}
              </h4>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{idea.votes}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{idea.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {idea.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  idea.status
                )}`}
              >
                {idea.status === "approved"
                  ? "Tasdiqlangan"
                  : idea.status === "pending"
                  ? "Kutilmoqda"
                  : "Ishlanmoqda"}
              </span>
              <span className="text-xs text-gray-500">{idea.createdDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Muallif: {idea.author}
              </span>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="text-purple-600 hover:text-purple-800">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Trendlar va qidiruv
        </h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Trend qidirish..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Yangi trend</span>
          </button>
        </div>
      </div>

      {/* Trends Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kalit so'z
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  O'sish
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qidiruvlar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qiyinlik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imkoniyat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trends.map((trend) => (
                <tr key={trend.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {trend.keyword}
                        </div>
                        <div className="text-sm text-gray-500">
                          {trend.relatedTopics.slice(0, 3).join(", ")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">
                      {trend.growth}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {trend.searches}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(
                        trend.difficulty
                      )}`}
                    >
                      {trend.difficulty === "high"
                        ? "Yuqori"
                        : trend.difficulty === "medium"
                        ? "O'rta"
                        : "Past"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getOpportunityColor(
                        trend.opportunity
                      )}`}
                    >
                      {trend.opportunity === "high"
                        ? "Yuqori"
                        : trend.opportunity === "medium"
                        ? "O'rta"
                        : "Past"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Tahlil
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      G'oya yaratish
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

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Ssenariy shablonlari
        </h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Yangi shablon</span>
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">
                {template.name}
              </h4>
              <span className="text-sm text-gray-500">
                {template.usage} marta
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Turi:</span>
                <span className="text-sm font-medium capitalize">
                  {template.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Davomiyligi:</span>
                <span className="text-sm font-medium">{template.duration}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Qismlar:</p>
              <div className="flex flex-wrap gap-1">
                {template.sections.map((section, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Ishlatish
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                Ko'rish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Umumiy ko'rinish", icon: BarChart3 },
    { id: "scripts", label: "Ssenariylar", icon: FileText },
    { id: "ideas", label: "G'oyalar", icon: Lightbulb },
    { id: "trends", label: "Trendlar", icon: TrendingUp },
    { id: "templates", label: "Shablonlar", icon: BookOpen },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Ssenarist Paneli</h1>
        <p className="text-indigo-100 text-lg">
          Kontent yaratish va g'oyalar boshqaruvi
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
          {activeTab === "scripts" && renderScripts()}
          {activeTab === "ideas" && renderIdeas()}
          {activeTab === "trends" && renderTrends()}
          {activeTab === "templates" && renderTemplates()}
        </div>
      </div>
    </div>
  );
};

export default ScreenwriterDashboard;
