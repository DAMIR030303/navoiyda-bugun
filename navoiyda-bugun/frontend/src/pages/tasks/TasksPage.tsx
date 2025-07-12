import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  CheckSquare,
  Clock,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  MessageSquare,
  Paperclip,
  Flag,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  X,
  Save,
  UserPlus,
  Send,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
  creator: {
    id: string;
    name: string;
  };
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  comments: number;
  attachments: number;
  progress: number;
  estimatedHours: number;
  actualHours: number;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sample data
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: "1",
        name: "Aziz Karimov",
        avatar: "/api/placeholder/32/32",
        role: "Developer",
      },
      {
        id: "2",
        name: "Malika Tosheva",
        avatar: "/api/placeholder/32/32",
        role: "Designer",
      },
      {
        id: "3",
        name: "Bobur Rahimov",
        avatar: "/api/placeholder/32/32",
        role: "Manager",
      },
      {
        id: "4",
        name: "Dildora Nazarova",
        avatar: "/api/placeholder/32/32",
        role: "Analyst",
      },
    ];

    const sampleTasks: Task[] = [
      {
        id: "1",
        title: "Yangi login sahifasi dizayni",
        description:
          "Foydalanuvchilar uchun zamonaviy va qulay login sahifasi yaratish",
        status: "in_progress",
        priority: "high",
        assignee: sampleUsers[1],
        creator: sampleUsers[2],
        dueDate: "2024-07-15",
        createdAt: "2024-07-10",
        updatedAt: "2024-07-12",
        tags: ["UI/UX", "Frontend"],
        comments: 5,
        attachments: 3,
        progress: 65,
        estimatedHours: 16,
        actualHours: 10,
      },
      {
        id: "2",
        title: "API endpoint yaratish",
        description:
          "Foydalanuvchilar ma'lumotlari uchun REST API endpoint yaratish",
        status: "todo",
        priority: "medium",
        assignee: sampleUsers[0],
        creator: sampleUsers[2],
        dueDate: "2024-07-20",
        createdAt: "2024-07-11",
        updatedAt: "2024-07-11",
        tags: ["Backend", "API"],
        comments: 2,
        attachments: 1,
        progress: 0,
        estimatedHours: 12,
        actualHours: 0,
      },
      {
        id: "3",
        title: "Ma'lumotlar tahlili",
        description: "Oxirgi oylik sotuvlar ma'lumotlarini tahlil qilish",
        status: "review",
        priority: "urgent",
        assignee: sampleUsers[3],
        creator: sampleUsers[2],
        dueDate: "2024-07-14",
        createdAt: "2024-07-08",
        updatedAt: "2024-07-12",
        tags: ["Analytics", "Report"],
        comments: 8,
        attachments: 5,
        progress: 90,
        estimatedHours: 8,
        actualHours: 7,
      },
      {
        id: "4",
        title: "Mobil ilovani test qilish",
        description:
          "Android va iOS versiyalarini test qilish va xatolarni topish",
        status: "completed",
        priority: "low",
        assignee: sampleUsers[0],
        creator: sampleUsers[2],
        dueDate: "2024-07-10",
        createdAt: "2024-07-05",
        updatedAt: "2024-07-10",
        tags: ["Mobile", "Testing"],
        comments: 3,
        attachments: 2,
        progress: 100,
        estimatedHours: 20,
        actualHours: 18,
      },
    ];

    setUsers(sampleUsers);
    setTasks(sampleTasks);
  }, []);

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || task.status === filterStatus;
      const matchesPriority =
        filterPriority === "all" || task.priority === filterPriority;
      const matchesAssignee =
        filterAssignee === "all" || task.assignee.id === filterAssignee;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesAssignee
      );
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "dueDate":
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "progress":
          comparison = a.progress - b.progress;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    overdue: tasks.filter(
      (t) => new Date(t.dueDate) < new Date() && t.status !== "completed"
    ).length,
    efficiency:
      Math.round(
        (tasks.filter((t) => t.status === "completed").length / tasks.length) *
          100
      ) || 0,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "todo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "review":
        return <Eye className="w-4 h-4 text-purple-600" />;
      case "todo":
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Flag className="w-4 h-4 text-red-600" />;
      case "high":
        return <ArrowUp className="w-4 h-4 text-orange-600" />;
      case "medium":
        return <Minus className="w-4 h-4 text-yellow-600" />;
      case "low":
        return <ArrowDown className="w-4 h-4 text-green-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Bugun";
    if (diffDays === 1) return "Ertaga";
    if (diffDays === -1) return "Kecha";
    if (diffDays > 0) return `${diffDays} kun qoldi`;
    return `${Math.abs(diffDays)} kun kechikdi`;
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowModal("create");
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowModal("edit");
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setShowModal("view");
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : t
      )
    );
  };

  const closeModal = () => {
    setShowModal(null);
    setSelectedTask(null);
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {showModal === "create" && "Yangi vazifa yaratish"}
              {showModal === "edit" && "Vazifani tahrirlash"}
              {showModal === "view" && "Vazifa tafsilotlari"}
            </h3>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {(showModal === "create" || showModal === "edit") && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vazifa nomi
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Vazifa nomini kiriting..."
                  defaultValue={selectedTask?.title || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tavsif
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Vazifa tavsifini kiriting..."
                  defaultValue={selectedTask?.description || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Muhimlik darajasi
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={selectedTask?.priority || "medium"}
                  >
                    <option value="low">Past</option>
                    <option value="medium">O'rta</option>
                    <option value="high">Yuqori</option>
                    <option value="urgent">Shoshilinch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Holat
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={selectedTask?.status || "todo"}
                  >
                    <option value="todo">Kutilmoqda</option>
                    <option value="in_progress">Jarayonda</option>
                    <option value="review">Ko'rib chiqilmoqda</option>
                    <option value="completed">Bajarildi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Javobgar shaxs
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={selectedTask?.assignee.id || ""}
                  >
                    <option value="">Javobgar shaxsni tanlang</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Muddat
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={selectedTask?.dueDate || ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taxminiy vaqt (soat)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    defaultValue={selectedTask?.estimatedHours || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teglar
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Teglarni vergul bilan ajrating"
                    defaultValue={selectedTask?.tags.join(", ") || ""}
                  />
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
                    // Handle task creation/editing
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {showModal === "create" ? "Yaratish" : "Saqlash"}
                </button>
              </div>
            </div>
          )}

          {showModal === "view" && selectedTask && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedTask.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {selectedTask.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedTask.status
                      )}`}
                    >
                      {getStatusIcon(selectedTask.status)}
                      {selectedTask.status === "todo"
                        ? "Kutilmoqda"
                        : selectedTask.status === "in_progress"
                        ? "Jarayonda"
                        : selectedTask.status === "review"
                        ? "Ko'rib chiqilmoqda"
                        : "Bajarildi"}
                    </div>

                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(
                        selectedTask.priority
                      )}`}
                    >
                      {getPriorityIcon(selectedTask.priority)}
                      {selectedTask.priority === "low"
                        ? "Past"
                        : selectedTask.priority === "medium"
                        ? "O'rta"
                        : selectedTask.priority === "high"
                        ? "Yuqori"
                        : "Shoshilinch"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Javobgar shaxs
                    </h5>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {selectedTask.assignee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedTask.assignee.name}
                        </p>
                        <p className="text-xs text-gray-500">Javobgar</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Yaratuvchi
                    </h5>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {selectedTask.creator.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedTask.creator.name}
                        </p>
                        <p className="text-xs text-gray-500">Yaratuvchi</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Muddat
                    </h5>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-900">
                        {new Date(selectedTask.dueDate).toLocaleDateString(
                          "uz-UZ"
                        )}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({formatDate(selectedTask.dueDate)})
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Vaqt
                    </h5>
                    <div className="text-sm text-gray-900">
                      {selectedTask.actualHours}h /{" "}
                      {selectedTask.estimatedHours}h
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Bajarilish darajasi
                </h5>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${selectedTask.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedTask.progress}%
                  </span>
                </div>
              </div>

              {selectedTask.tags.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Teglar
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  {selectedTask.comments} izoh
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Paperclip className="w-4 h-4" />
                  {selectedTask.attachments} fayl
                </div>
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
        <title>Vazifalar - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Vazifalar boshqaruvi
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Vazifalarni yaratish, taqsimlash va nazorat qilish
            </p>
          </div>
          <button
            onClick={handleCreateTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yangi vazifa
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                <CheckSquare size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jami vazifalar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                <CheckCircle size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Bajarilgan
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completed}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600">
                <Clock size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jarayonda
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.inProgress}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600">
                <AlertCircle size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Kechikkan
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.overdue}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Samaradorlik
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.efficiency}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Vazifalarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Barcha holatlar</option>
              <option value="todo">Kutilmoqda</option>
              <option value="in_progress">Jarayonda</option>
              <option value="review">Ko'rib chiqilmoqda</option>
              <option value="completed">Bajarilgan</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Barcha muhimlik</option>
              <option value="urgent">Shoshilinch</option>
              <option value="high">Yuqori</option>
              <option value="medium">O'rta</option>
              <option value="low">Past</option>
            </select>

            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Barcha xodimlar</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order as "asc" | "desc");
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dueDate-asc">Muddat (yaqin)</option>
              <option value="dueDate-desc">Muddat (uzoq)</option>
              <option value="priority-desc">Muhimlik (yuqori)</option>
              <option value="priority-asc">Muhimlik (past)</option>
              <option value="progress-asc">Bajarilish (kam)</option>
              <option value="progress-desc">Bajarilish (ko'p)</option>
              <option value="title-asc">Nom (A-Z)</option>
              <option value="title-desc">Nom (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Vazifalar ro'yxati ({filteredTasks.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => handleViewTask(task)}
                        className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
                      >
                        {task.title}
                      </button>

                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status === "todo"
                          ? "Kutilmoqda"
                          : task.status === "in_progress"
                          ? "Jarayonda"
                          : task.status === "review"
                          ? "Ko'rib chiqilmoqda"
                          : "Bajarilgan"}
                      </div>

                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {getPriorityIcon(task.priority)}
                        {task.priority === "low"
                          ? "Past"
                          : task.priority === "medium"
                          ? "O'rta"
                          : task.priority === "high"
                          ? "Yuqori"
                          : "Shoshilinch"}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {task.assignee.name.charAt(0)}
                        </div>
                        <span>{task.assignee.name}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(task.dueDate)}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{task.comments}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Paperclip className="w-4 h-4" />
                        <span>{task.attachments}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {task.progress}%
                      </span>
                    </div>

                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <div className="relative">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task.id,
                            e.target.value as Task["status"]
                          )
                        }
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="todo">Kutilmoqda</option>
                        <option value="in_progress">Jarayonda</option>
                        <option value="review">Ko'rib chiqilmoqda</option>
                        <option value="completed">Bajarilgan</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleViewTask(task)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>

                    <button
                      onClick={() => handleEditTask(task)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="p-12 text-center">
              <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Hech qanday vazifa topilmadi
              </p>
            </div>
          )}
        </div>

        {/* Render Modal */}
        {renderModal()}
      </div>
    </>
  );
};

export default TasksPage;
