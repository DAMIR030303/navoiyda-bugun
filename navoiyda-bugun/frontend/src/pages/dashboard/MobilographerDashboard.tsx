import React, { useState } from "react";
import {
  Camera,
  Video,
  Calendar,
  Image,
  Film,
  Upload,
  Download,
  Edit3,
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
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Layers,
  Settings,
} from "lucide-react";

const MobilographerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Jami kontent",
      value: "348",
      change: "+24",
      changeType: "positive",
      icon: Image,
      color: "blue",
    },
    {
      title: "Reels",
      value: "156",
      change: "+18",
      changeType: "positive",
      icon: Film,
      color: "purple",
    },
    {
      title: "Storilar",
      value: "892",
      change: "+45",
      changeType: "positive",
      icon: Zap,
      color: "green",
    },
    {
      title: "Umumiy ko'rishlar",
      value: "2.4M",
      change: "+32%",
      changeType: "positive",
      icon: Eye,
      color: "orange",
    },
  ];

  const contentCalendar = [
    {
      id: 1,
      title: "Yangi mahsulot tanishtiruvi",
      type: "video",
      date: "2024-01-22",
      time: "10:00",
      platform: "Instagram",
      status: "scheduled",
      thumbnail: "/api/placeholder/100/100",
    },
    {
      id: 2,
      title: "Kompaniya hayoti",
      type: "story",
      date: "2024-01-22",
      time: "14:30",
      platform: "Instagram",
      status: "draft",
      thumbnail: "/api/placeholder/100/100",
    },
    {
      id: 3,
      title: "Mahsulot ko'rsatish",
      type: "reel",
      date: "2024-01-23",
      time: "09:00",
      platform: "TikTok",
      status: "completed",
      thumbnail: "/api/placeholder/100/100",
    },
    {
      id: 4,
      title: "Mijoz sharhi",
      type: "post",
      date: "2024-01-23",
      time: "16:00",
      platform: "Facebook",
      status: "scheduled",
      thumbnail: "/api/placeholder/100/100",
    },
  ];

  const recentContent = [
    {
      id: 1,
      title: "Yangi mahsulot video",
      type: "video",
      duration: "2:34",
      views: "45.2K",
      likes: "3.8K",
      comments: "234",
      shares: "89",
      platform: "Instagram",
      date: "2024-01-20",
      thumbnail: "/api/placeholder/150/150",
    },
    {
      id: 2,
      title: "Kompaniya prezentatsiyasi",
      type: "reel",
      duration: "0:45",
      views: "28.7K",
      likes: "2.1K",
      comments: "156",
      shares: "67",
      platform: "TikTok",
      date: "2024-01-19",
      thumbnail: "/api/placeholder/150/150",
    },
    {
      id: 3,
      title: "Xodimlar bilan suhbat",
      type: "story",
      duration: "0:15",
      views: "12.3K",
      likes: "890",
      comments: "45",
      shares: "23",
      platform: "Instagram",
      date: "2024-01-18",
      thumbnail: "/api/placeholder/150/150",
    },
    {
      id: 4,
      title: "Mahsulot taqdimoti",
      type: "post",
      duration: "1:20",
      views: "67.8K",
      likes: "5.2K",
      comments: "342",
      shares: "156",
      platform: "Facebook",
      date: "2024-01-17",
      thumbnail: "/api/placeholder/150/150",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Yangi mahsulot kampaniyasi",
      description: "Yangi mahsulot uchun video kontent yaratish",
      status: "active",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      contents: { total: 20, completed: 15, draft: 3, scheduled: 2 },
    },
    {
      id: 2,
      name: "Brend tanishtiruvi",
      description: "Kompaniya brendini tanishtiradigan kontent",
      status: "planning",
      progress: 30,
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      contents: { total: 15, completed: 4, draft: 6, scheduled: 5 },
    },
    {
      id: 3,
      name: "Mijozlar sharhlari",
      description: "Mijozlar bilan intervyu va sharhlar",
      status: "completed",
      progress: 100,
      startDate: "2023-12-01",
      endDate: "2024-01-15",
      contents: { total: 12, completed: 12, draft: 0, scheduled: 0 },
    },
  ];

  const equipment = [
    {
      id: 1,
      name: "Canon EOS R5",
      type: "Camera",
      status: "available",
      lastUsed: "2024-01-20",
      location: "Studio A",
    },
    {
      id: 2,
      name: "DJI Ronin-S",
      type: "Gimbal",
      status: "in_use",
      lastUsed: "2024-01-22",
      location: "Studio B",
    },
    {
      id: 3,
      name: "Rode VideoMic Pro",
      type: "Microphone",
      status: "available",
      lastUsed: "2024-01-19",
      location: "Studio A",
    },
    {
      id: 4,
      name: "Godox SL-60W",
      type: "Light",
      status: "maintenance",
      lastUsed: "2024-01-18",
      location: "Storage",
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
      case "active":
        return "bg-green-100 text-green-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "in_use":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "reel":
        return Film;
      case "story":
        return Zap;
      case "post":
        return Image;
      default:
        return Image;
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

      {/* Content Calendar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Bugungi kontent rejasi
          </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Yangi kontent</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentCalendar.map((content) => {
            const TypeIcon = getTypeIcon(content.type);
            return (
              <div key={content.id} className="bg-gray-50 rounded-lg p-4">
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

      {/* Recent Content Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          So'nggi kontent samaradorligi
        </h3>
        <div className="space-y-4">
          {recentContent.slice(0, 3).map((content) => {
            const TypeIcon = getTypeIcon(content.type);
            return (
              <div
                key={content.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <TypeIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{content.title}</p>
                    <p className="text-sm text-gray-600">
                      {content.platform} • {content.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{content.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{content.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{content.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{content.shares}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Kontent kutubxonasi
        </h3>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Yuklash</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Yangi yaratish</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recentContent.map((content) => {
          const TypeIcon = getTypeIcon(content.type);
          return (
            <div
              key={content.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <TypeIcon className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  {content.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    {content.type.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {content.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {content.platform} • {content.date}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{content.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{content.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{content.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{content.shares}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Ko'rish
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Tahrirlash
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Kontent loyihalari
        </h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Yangi loyiha</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h4>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status === "active"
                  ? "Faol"
                  : project.status === "planning"
                  ? "Rejalashtirilmoqda"
                  : "Tugallangan"}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{project.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jarayon:</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Kontent:</span>
                <span className="font-medium">
                  {project.contents.completed}/{project.contents.total}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Muddat:</span>
                <span className="font-medium">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Ko'rish
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                Tahrirlash
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEquipment = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Uskunalar</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Yangi uskuna</span>
        </button>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {equipment.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Camera className="w-8 h-8 text-gray-600" />
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getEquipmentStatusColor(
                  item.status
                )}`}
              >
                {item.status === "available"
                  ? "Mavjud"
                  : item.status === "in_use"
                  ? "Ishlatilmoqda"
                  : "Ta'mirlash"}
              </span>
            </div>

            <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{item.type}</p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Joylashuv:</span>
                <span className="font-medium">{item.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Oxirgi ishlatilgan:</span>
                <span className="font-medium">{item.lastUsed}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Bron qilish
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                Tahrirlash
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Umumiy ko'rinish", icon: BarChart3 },
    { id: "content", label: "Kontent", icon: Image },
    { id: "projects", label: "Loyihalar", icon: Layers },
    { id: "equipment", label: "Uskunalar", icon: Camera },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-violet-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Mobilograf Paneli</h1>
        <p className="text-pink-100 text-lg">Kontent yaratish va boshqarish</p>
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
          {activeTab === "content" && renderContent()}
          {activeTab === "projects" && renderProjects()}
          {activeTab === "equipment" && renderEquipment()}
        </div>
      </div>
    </div>
  );
};

export default MobilographerDashboard;
