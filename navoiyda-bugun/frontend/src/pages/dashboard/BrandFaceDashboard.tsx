import React, { useState } from "react";
import {
  Star,
  Calendar,
  Video,
  FileText,
  Palette,
  Users,
  TrendingUp,
  Clock,
  Play,
  Pause,
  Plus,
  Filter,
  Search,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Camera,
  Mic,
  Monitor,
  Settings,
  Edit3,
  Download,
} from "lucide-react";

const BrandFaceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Jami efirlar",
      value: "124",
      change: "+8",
      changeType: "positive",
      icon: Video,
      color: "blue",
    },
    {
      title: "Obunachilar",
      value: "45.2K",
      change: "+1.2K",
      changeType: "positive",
      icon: Users,
      color: "green",
    },
    {
      title: "Umumiy ko'rishlar",
      value: "2.8M",
      change: "+15%",
      changeType: "positive",
      icon: Eye,
      color: "purple",
    },
    {
      title: "Engagement",
      value: "8.4%",
      change: "+0.8%",
      changeType: "positive",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  const liveSchedule = [
    {
      id: 1,
      title: "Yangi mahsulot tanishtiruvi",
      date: "2024-01-22",
      time: "19:00",
      duration: "60 min",
      platform: "Instagram Live",
      status: "scheduled",
      viewers: 0,
      script: "Mahsulot tanishtiruv ssenariysi",
    },
    {
      id: 2,
      title: "Savol-javob sessiyasi",
      date: "2024-01-23",
      time: "20:00",
      duration: "45 min",
      platform: "YouTube Live",
      status: "scheduled",
      viewers: 0,
      script: "Q&A sessiya ssenariysi",
    },
    {
      id: 3,
      title: "Kompaniya yangiliklari",
      date: "2024-01-21",
      time: "18:00",
      duration: "30 min",
      platform: "Facebook Live",
      status: "completed",
      viewers: 1250,
      script: "Yangiliklar ssenariysi",
    },
    {
      id: 4,
      title: "Mahsulot ko'rsatish",
      date: "2024-01-20",
      time: "19:30",
      duration: "40 min",
      platform: "Instagram Live",
      status: "completed",
      viewers: 890,
      script: "Mahsulot demo ssenariysi",
    },
  ];

  const contentCalendar = [
    {
      id: 1,
      title: "Haftalik yangiliklar",
      type: "live",
      date: "2024-01-22",
      time: "19:00",
      status: "scheduled",
      platform: "Instagram",
    },
    {
      id: 2,
      title: "Mahsulot sharhi",
      type: "video",
      date: "2024-01-23",
      time: "10:00",
      status: "draft",
      platform: "YouTube",
    },
    {
      id: 3,
      title: "Brend hikoyasi",
      type: "story",
      date: "2024-01-24",
      time: "15:00",
      status: "planned",
      platform: "Instagram",
    },
    {
      id: 4,
      title: "Mijoz sharhi",
      type: "post",
      date: "2024-01-25",
      time: "12:00",
      status: "scheduled",
      platform: "Facebook",
    },
  ];

  const scripts = [
    {
      id: 1,
      title: "Yangi mahsulot tanishtiruvi",
      type: "live_stream",
      duration: "60 min",
      status: "approved",
      lastModified: "2024-01-20",
      author: "Dilshod N.",
      wordCount: 1250,
    },
    {
      id: 2,
      title: "Kompaniya tarixi",
      type: "video",
      duration: "15 min",
      status: "draft",
      lastModified: "2024-01-19",
      author: "Malika T.",
      wordCount: 800,
    },
    {
      id: 3,
      title: "Mahsulot foydalanish qo'llanmasi",
      type: "tutorial",
      duration: "25 min",
      status: "review",
      lastModified: "2024-01-18",
      author: "Alisher K.",
      wordCount: 950,
    },
    {
      id: 4,
      title: "Mijozlar bilan suhbat",
      type: "interview",
      duration: "45 min",
      status: "approved",
      lastModified: "2024-01-17",
      author: "Nodira Y.",
      wordCount: 1100,
    },
  ];

  const brandGuidelines = [
    {
      id: 1,
      category: "Ranglar",
      items: [
        { name: "Asosiy rang", value: "#3B82F6", type: "color" },
        { name: "Ikkinchi rang", value: "#8B5CF6", type: "color" },
        { name: "Accent rang", value: "#10B981", type: "color" },
      ],
    },
    {
      id: 2,
      category: "Shriftlar",
      items: [
        { name: "Asosiy shrift", value: "Inter", type: "font" },
        { name: "Sarlavha shrift", value: "Poppins", type: "font" },
        { name: "Kontent shrift", value: "Open Sans", type: "font" },
      ],
    },
    {
      id: 3,
      category: "Logotip",
      items: [
        { name: "Asosiy logo", value: "primary-logo.svg", type: "file" },
        { name: "Oq logo", value: "white-logo.svg", type: "file" },
        { name: "Qora logo", value: "black-logo.svg", type: "file" },
      ],
    },
  ];

  const analytics = [
    {
      platform: "Instagram",
      followers: "25.4K",
      engagement: "9.2%",
      growth: "+12%",
      topContent: "Mahsulot tanishtiruvi",
    },
    {
      platform: "YouTube",
      followers: "18.7K",
      engagement: "7.8%",
      growth: "+8%",
      topContent: "Tutorial video",
    },
    {
      platform: "Facebook",
      followers: "12.3K",
      engagement: "6.4%",
      growth: "+5%",
      topContent: "Kompaniya yangiliklari",
    },
    {
      platform: "TikTok",
      followers: "8.9K",
      engagement: "15.2%",
      growth: "+25%",
      topContent: "Qisqa video",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "planned":
        return "bg-purple-100 text-purple-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "review":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "live":
        return Video;
      case "video":
        return Play;
      case "story":
        return Camera;
      case "post":
        return FileText;
      case "live_stream":
        return Video;
      case "tutorial":
        return Monitor;
      case "interview":
        return Mic;
      default:
        return FileText;
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

      {/* Live Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Efirlar jadvali
          </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Yangi efir</span>
          </button>
        </div>
        <div className="space-y-4">
          {liveSchedule.slice(0, 3).map((stream) => (
            <div
              key={stream.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{stream.title}</p>
                  <p className="text-sm text-gray-600">
                    {stream.platform} • {stream.duration}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {stream.date} {stream.time}
                </p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      stream.status
                    )}`}
                  >
                    {stream.status === "scheduled"
                      ? "Rejalashtirilgan"
                      : "Tugallangan"}
                  </span>
                  {stream.viewers > 0 && (
                    <span className="text-sm text-gray-500">
                      {stream.viewers} tomoshabin
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Platform analitikasi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analytics.map((platform, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">
                {platform.platform}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Obunachilar:</span>
                  <span className="font-medium">{platform.followers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Engagement:</span>
                  <span className="font-medium">{platform.engagement}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">O'sish:</span>
                  <span className="font-medium text-green-600">
                    {platform.growth}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Top kontent:</p>
                  <p className="text-sm font-medium">{platform.topContent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Kontent kalendari
        </h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Yangi kontent</span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {contentCalendar.map((content) => {
            const TypeIcon = getTypeIcon(content.type);
            return (
              <div key={content.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <TypeIcon className="w-5 h-5 text-gray-600" />
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      content.status
                    )}`}
                  >
                    {content.status === "scheduled"
                      ? "Rejalashtirilgan"
                      : content.status === "draft"
                      ? "Qoralama"
                      : content.status === "planned"
                      ? "Rejalashtirilgan"
                      : "Tugallangan"}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {content.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{content.platform}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{content.time}</span>
                  <span>{content.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Streams */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Efirlar</h3>
        <div className="space-y-4">
          {liveSchedule.map((stream) => (
            <div
              key={stream.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{stream.title}</p>
                  <p className="text-sm text-gray-600">
                    {stream.platform} • {stream.duration}
                  </p>
                  <p className="text-xs text-gray-500">{stream.script}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {stream.date} {stream.time}
                </p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      stream.status
                    )}`}
                  >
                    {stream.status === "scheduled"
                      ? "Rejalashtirilgan"
                      : "Tugallangan"}
                  </span>
                  {stream.viewers > 0 && (
                    <span className="text-sm text-gray-500">
                      {stream.viewers} tomoshabin
                    </span>
                  )}
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Tahrirlash
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-sm">
                    Ssenariy
                  </button>
                </div>
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Yangi ssenariy</span>
        </button>
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
                  Davomiyligi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Muallif
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scripts.map((script) => {
                const TypeIcon = getTypeIcon(script.type);
                return (
                  <tr key={script.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TypeIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {script.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {script.wordCount} so'z
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {script.type.replace("_", " ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {script.duration}
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
                          : script.status === "draft"
                          ? "Qoralama"
                          : script.status === "review"
                          ? "Ko'rib chiqilmoqda"
                          : "Tugallangan"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {script.author}
                      </div>
                      <div className="text-sm text-gray-500">
                        {script.lastModified}
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
                        Yuklab olish
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBrandGuide = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Brend qo'llanmasi
        </h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Sozlamalar</span>
        </button>
      </div>

      {/* Brand Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandGuidelines.map((guideline) => (
          <div
            key={guideline.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {guideline.category}
            </h4>
            <div className="space-y-3">
              {guideline.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {item.type === "color" && (
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.value }}
                      ></div>
                    )}
                    {item.type === "font" && (
                      <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs font-bold">Aa</span>
                      </div>
                    )}
                    {item.type === "file" && (
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.value}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Visual Examples */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Vizual namunalar
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="relative group">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <Palette className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg mr-2">
                    Ko'rish
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Yuklab olish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Umumiy ko'rinish", icon: BarChart3 },
    { id: "schedule", label: "Jadval", icon: Calendar },
    { id: "scripts", label: "Ssenariylar", icon: FileText },
    { id: "brand", label: "Brend qo'llanmasi", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Brend Yuzi Paneli</h1>
        <p className="text-rose-100 text-lg">Kontent va brend boshqaruvi</p>
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
          {activeTab === "schedule" && renderSchedule()}
          {activeTab === "scripts" && renderScripts()}
          {activeTab === "brand" && renderBrandGuide()}
        </div>
      </div>
    </div>
  );
};

export default BrandFaceDashboard;
