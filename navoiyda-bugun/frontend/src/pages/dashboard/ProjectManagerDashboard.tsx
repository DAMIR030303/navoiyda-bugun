import React, { useState } from "react";
import {
  FolderOpen,
  CheckSquare,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  Plus,
  Filter,
  Search,
  BarChart3,
  Target,
  FileText,
  Settings,
  Play,
  Pause,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ProjectManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Jami loyihalar",
      value: "24",
      change: "+3",
      changeType: "positive",
      icon: FolderOpen,
      color: "blue",
    },
    {
      title: "Faol loyihalar",
      value: "18",
      change: "+2",
      changeType: "positive",
      icon: Play,
      color: "green",
    },
    {
      title: "Tugallangan",
      value: "6",
      change: "+1",
      changeType: "positive",
      icon: CheckCircle2,
      color: "purple",
    },
    {
      title: "Kechiktirilgan",
      value: "3",
      change: "-1",
      changeType: "positive",
      icon: AlertCircle,
      color: "red",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Navoiyda Bugun Web Platform",
      description: "Korxona boshqaruv tizimi",
      status: "active",
      priority: "high",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      budget: 50000,
      spent: 37500,
      team: ["Alisher K.", "Malika T.", "Bobur R."],
      tasks: { total: 45, completed: 34, inProgress: 8, pending: 3 },
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "PWA va mobil ilova",
      status: "active",
      priority: "medium",
      progress: 60,
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      budget: 30000,
      spent: 18000,
      team: ["Nodira Y.", "Jasur M."],
      tasks: { total: 32, completed: 19, inProgress: 10, pending: 3 },
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Raqamli marketing strategiyasi",
      status: "planning",
      priority: "low",
      progress: 25,
      startDate: "2024-03-01",
      endDate: "2024-05-01",
      budget: 15000,
      spent: 3750,
      team: ["Malika T.", "Aziz K."],
      tasks: { total: 20, completed: 5, inProgress: 3, pending: 12 },
    },
  ];

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

      {/* Projects Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Loyihalar jarayoni
        </h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === "active"
                      ? "bg-green-100 text-green-800"
                      : project.status === "planning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {project.status === "active"
                    ? "Faol"
                    : project.status === "planning"
                    ? "Rejalashtirilmoqda"
                    : "Tugallangan"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Jarayon: {project.progress}%
                </span>
                <span className="text-sm text-gray-600">
                  {project.tasks.completed}/{project.tasks.total} vazifa
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Loyihalar ro'yxati
        </h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Yangi loyiha</span>
        </button>
      </div>

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
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  project.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : project.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {project.priority === "high"
                  ? "Yuqori"
                  : project.priority === "medium"
                  ? "O'rta"
                  : "Past"}
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
                <span className="text-sm text-gray-600">Byudjet:</span>
                <span className="font-medium">
                  ${project.spent.toLocaleString()} / $
                  {project.budget.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Vazifalar:</span>
                <span className="font-medium">
                  {project.tasks.completed}/{project.tasks.total}
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

  const tabs = [
    { id: "overview", label: "Umumiy ko'rinish", icon: BarChart3 },
    { id: "projects", label: "Loyihalar", icon: FolderOpen },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Loyiha Menejer Paneli</h1>
        <p className="text-purple-100 text-lg">
          Loyihalar va vazifalar boshqaruvi
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
          {activeTab === "projects" && renderProjects()}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagerDashboard;
