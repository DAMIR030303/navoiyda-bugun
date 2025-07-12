import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckSquare,
  Calendar,
  TrendingUp,
  User,
  Clock,
  Target,
  Award,
  BookOpen,
  BarChart3,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  RefreshCw,
  FileText,
  Star,
  Zap,
  Coffee,
  Home,
  ArrowUp,
  ArrowDown,
  Eye,
  MessageSquare,
  Settings,
  Calendar as CalendarIcon,
  Trophy,
  Lightbulb,
  Heart,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | "overdue";
  deadline: string;
  assignedBy: string;
  estimatedHours: number;
  completedAt?: string;
  progress: number;
}

interface AttendanceRecord {
  date: string;
  checkIn?: string;
  checkOut?: string;
  totalHours: number;
  status: "present" | "absent" | "late" | "half_day" | "leave";
  location: string;
}

interface LearningCourse {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed" | "paused";
  totalLessons: number;
  completedLessons: number;
  estimatedTime: number;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  points: number;
  category: "task" | "attendance" | "learning" | "collaboration";
}

interface PersonalKPI {
  title: string;
  current: number;
  target: number;
  unit: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  color: string;
}

const EmployeeDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [todayHours, setTodayHours] = useState(6.5);

  // Personal KPIs
  const [personalKPIs, setPersonalKPIs] = useState<PersonalKPI[]>([
    {
      title: "Vazifalar bajarilishi",
      current: 85,
      target: 90,
      unit: "%",
      change: 5.2,
      changeType: "increase",
      color: "bg-green-500",
    },
    {
      title: "Davomat",
      current: 95,
      target: 98,
      unit: "%",
      change: 2.1,
      changeType: "increase",
      color: "bg-blue-500",
    },
    {
      title: "O'qish soatlari",
      current: 12,
      target: 15,
      unit: "soat",
      change: 3.5,
      changeType: "increase",
      color: "bg-purple-500",
    },
    {
      title: "Jamoa ishi",
      current: 88,
      target: 90,
      unit: "%",
      change: -1.2,
      changeType: "decrease",
      color: "bg-orange-500",
    },
  ]);

  // Today's tasks
  const [todayTasks, setTodayTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Marketing materiallari tayyorlash",
      description: "Yangi kampaniya uchun kreativ materiallar yaratish",
      priority: "high",
      status: "in_progress",
      deadline: "2024-05-15T16:00:00",
      assignedBy: "Marketing Manager",
      estimatedHours: 4,
      progress: 60,
    },
    {
      id: "2",
      title: "Mijoz bilan uchrashuv",
      description: "Yangi loyiha bo'yicha muhokama",
      priority: "medium",
      status: "completed",
      deadline: "2024-05-15T14:30:00",
      assignedBy: "Sales Manager",
      estimatedHours: 1,
      progress: 100,
      completedAt: "2024-05-15T14:15:00",
    },
    {
      id: "3",
      title: "Haftalik hisobot tayyorlash",
      description: "O'tgan hafta faoliyati bo'yicha hisobot",
      priority: "low",
      status: "pending",
      deadline: "2024-05-15T18:00:00",
      assignedBy: "HR Manager",
      estimatedHours: 2,
      progress: 0,
    },
    {
      id: "4",
      title: "Jamoa yig'ilishi",
      description: "Oylik reja muhokamasi",
      priority: "medium",
      status: "completed",
      deadline: "2024-05-15T11:00:00",
      assignedBy: "Project Manager",
      estimatedHours: 1,
      progress: 100,
      completedAt: "2024-05-15T11:45:00",
    },
  ]);

  // Learning courses
  const [learningCourses, setLearningCourses] = useState<LearningCourse[]>([
    {
      id: "1",
      title: "JavaScript asoslari",
      description: "Dasturlash tilining asosiy tushunchalari",
      progress: 85,
      status: "in_progress",
      totalLessons: 20,
      completedLessons: 17,
      estimatedTime: 40,
      category: "Programming",
      difficulty: "beginner",
    },
    {
      id: "2",
      title: "Loyiha boshqaruvi",
      description: "Agile va Scrum metodologiyalari",
      progress: 60,
      status: "in_progress",
      totalLessons: 15,
      completedLessons: 9,
      estimatedTime: 30,
      category: "Management",
      difficulty: "intermediate",
    },
    {
      id: "3",
      title: "Muloqot ko'nikmalari",
      description: "Samarali muloqot va prezentatsiya",
      progress: 100,
      status: "completed",
      totalLessons: 12,
      completedLessons: 12,
      estimatedTime: 24,
      category: "Soft Skills",
      difficulty: "beginner",
    },
  ]);

  // Recent achievements
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Vazifalar ustasi",
      description: "5 ta vazifani ketma-ket muddatida bajardingiz",
      icon: "trophy",
      earnedAt: "2024-05-14T16:30:00",
      points: 100,
      category: "task",
    },
    {
      id: "2",
      title: "Doimiy davomat",
      description: "1 oy davomida 100% davomat",
      icon: "calendar",
      earnedAt: "2024-05-01T09:00:00",
      points: 150,
      category: "attendance",
    },
    {
      id: "3",
      title: "O'quvchi",
      description: "Birinchi kursni muvaffaqiyatli yakunladingiz",
      icon: "book",
      earnedAt: "2024-04-28T18:00:00",
      points: 200,
      category: "learning",
    },
  ]);

  // Weekly attendance
  const [weeklyAttendance, setWeeklyAttendance] = useState<AttendanceRecord[]>([
    {
      date: "2024-05-13",
      checkIn: "09:00",
      checkOut: "18:00",
      totalHours: 8,
      status: "present",
      location: "Office",
    },
    {
      date: "2024-05-14",
      checkIn: "09:15",
      checkOut: "18:30",
      totalHours: 8.25,
      status: "late",
      location: "Office",
    },
    {
      date: "2024-05-15",
      checkIn: "08:45",
      checkOut: "",
      totalHours: 6.5,
      status: "present",
      location: "Office",
    },
    { date: "2024-05-16", totalHours: 0, status: "leave", location: "" },
    { date: "2024-05-17", totalHours: 0, status: "leave", location: "" },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
      setLastUpdated(new Date());
    }, 1000);

    const updateTimer = setInterval(() => {
      // Simulate KPI updates
      setPersonalKPIs((prev) =>
        prev.map((kpi) => ({
          ...kpi,
          change: kpi.change + (Math.random() - 0.5) * 0.2,
        }))
      );
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeTimer);
      clearInterval(updateTimer);
    };
  }, []);

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-500";
      case "overdue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "paused":
        return "bg-orange-500";
      case "not_started":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-orange-100 text-orange-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setLastUpdated(new Date());
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setTodayHours(8);
    setLastUpdated(new Date());
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
      {/* Employee Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Xodim Dashboard</h1>
              <p className="text-green-100 text-lg">
                Vazifalar, davomat va shaxsiy rivojlanish
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-green-100 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {currentTime.toLocaleTimeString("uz-UZ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!isCheckedIn ? (
                <button
                  onClick={handleCheckIn}
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Kelish
                </button>
              ) : (
                <button
                  onClick={handleCheckOut}
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  Ketish
                </button>
              )}
              <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                <Bell className="w-4 h-4" />
                Bildirishnomalar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personalKPIs.map((kpi, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center`}
              >
                {index === 0 && <CheckSquare className="w-6 h-6 text-white" />}
                {index === 1 && <Calendar className="w-6 h-6 text-white" />}
                {index === 2 && <BookOpen className="w-6 h-6 text-white" />}
                {index === 3 && <Heart className="w-6 h-6 text-white" />}
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                  kpi.changeType === "increase"
                    ? "bg-green-100 text-green-700"
                    : kpi.changeType === "decrease"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {kpi.changeType === "increase" ? (
                  <ArrowUp className="w-3 h-3" />
                ) : kpi.changeType === "decrease" ? (
                  <ArrowDown className="w-3 h-3" />
                ) : null}
                {Math.abs(kpi.change).toFixed(1)}%
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {kpi.current}
                  {kpi.unit}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    Maqsad: {kpi.target}
                    {kpi.unit}
                  </span>
                  <span>{Math.round((kpi.current / kpi.target) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${kpi.color} transition-all duration-500`}
                    style={{
                      width: `${Math.min(
                        (kpi.current / kpi.target) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Status */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Bugungi holat
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Ish vaqti</span>
              </div>
              <span className="text-lg font-bold text-blue-900">
                {todayHours}h
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">
                  Bajarilgan vazifalar
                </span>
              </div>
              <span className="text-lg font-bold text-green-900">
                {todayTasks.filter((t) => t.status === "completed").length}/
                {todayTasks.length}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">
                  Bugungi ball
                </span>
              </div>
              <span className="text-lg font-bold text-purple-900">+85</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Tezkor harakatlar
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/tasks"
              className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <CheckSquare className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Vazifalar
              </span>
            </Link>

            <Link
              to="/attendance"
              className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <Calendar className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-900">
                Davomat
              </span>
            </Link>

            <Link
              to="/learning"
              className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <BookOpen className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">
                O'qish
              </span>
            </Link>

            <Link
              to="/reports"
              className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
            >
              <FileText className="w-8 h-8 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">
                Hisobotlar
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Today's Tasks & Learning Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Bugungi vazifalar
            </h3>
            <Link
              to="/tasks"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              Barchasini ko'rish
            </Link>
          </div>

          <div className="space-y-4">
            {todayTasks.map((task) => (
              <div key={task.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-3 h-3 ${getTaskStatusColor(
                        task.status
                      )} rounded-full mt-1.5`}
                    ></div>
                    <div className="flex-1">
                      <h4
                        className={`font-medium ${
                          task.status === "completed"
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority === "high"
                            ? "Yuqori"
                            : task.priority === "medium"
                            ? "O'rta"
                            : "Past"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(task.deadline).toLocaleTimeString("uz-UZ", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  {task.status === "completed" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>

                {task.status !== "completed" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Jarayon</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getTaskStatusColor(
                          task.status
                        )} transition-all duration-500`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">O'qish jarayoni</h3>
            <Link
              to="/learning"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              <BookOpen className="w-4 h-4" />
              Kurslar
            </Link>
          </div>

          <div className="space-y-4">
            {learningCourses.map((course) => (
              <div key={course.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          course.difficulty
                        )}`}
                      >
                        {course.difficulty === "beginner"
                          ? "Boshlang'ich"
                          : course.difficulty === "intermediate"
                          ? "O'rta"
                          : "Ilg'or"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 ${getCourseStatusColor(
                      course.status
                    )} rounded-full`}
                  ></div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      {course.completedLessons}/{course.totalLessons} dars
                    </span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getCourseStatusColor(
                        course.status
                      )} transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Attendance & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Haftalik davomat
          </h3>

          <div className="grid grid-cols-5 gap-3">
            {weeklyAttendance.map((record, index) => {
              const dayName = ["Du", "Se", "Ch", "Pa", "Ju"][index];
              const isToday = index === 2; // Wednesday as example

              return (
                <div
                  key={record.date}
                  className={`text-center p-3 rounded-xl ${
                    isToday ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-sm font-medium mb-2 ${
                      isToday ? "text-blue-700" : "text-gray-600"
                    }`}
                  >
                    {dayName}
                  </p>

                  <div
                    className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      record.status === "present"
                        ? "bg-green-500"
                        : record.status === "late"
                        ? "bg-orange-500"
                        : record.status === "leave"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {record.status === "present" ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : record.status === "late" ? (
                      <Clock className="w-4 h-4 text-white" />
                    ) : record.status === "leave" ? (
                      <Home className="w-4 h-4 text-white" />
                    ) : (
                      <XCircle className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <p
                    className={`text-xs font-medium ${
                      isToday ? "text-blue-900" : "text-gray-900"
                    }`}
                  >
                    {record.totalHours > 0
                      ? `${record.totalHours}h`
                      : record.status === "leave"
                      ? "Ta'til"
                      : "-"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              So'nggi yutuqlar
            </h3>
            <Link
              to="/achievements"
              className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              <Trophy className="w-4 h-4" />
              Barchasini ko'rish
            </Link>
          </div>

          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
              >
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                  {achievement.icon === "trophy" && (
                    <Trophy className="w-6 h-6 text-white" />
                  )}
                  {achievement.icon === "calendar" && (
                    <Calendar className="w-6 h-6 text-white" />
                  )}
                  {achievement.icon === "book" && (
                    <BookOpen className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                      +{achievement.points} ball
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(achievement.earnedAt).toLocaleDateString(
                        "uz-UZ"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/tasks"
          className="group bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Vazifalar</h3>
              <p className="text-blue-100 text-sm">Kundalik vazifalar</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {todayTasks.filter((t) => t.status !== "completed").length} ta
              qolgan
            </span>
            <CheckSquare className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/learning"
          className="group bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">O'qish</h3>
              <p className="text-purple-100 text-sm">Shaxsiy rivojlanish</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {learningCourses.filter((c) => c.status === "in_progress").length}{" "}
              ta faol kurs
            </span>
            <BookOpen className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/profile"
          className="group bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Profil</h3>
              <p className="text-green-100 text-sm">Shaxsiy ma'lumotlar</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Profilni ko'rish</span>
            <User className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
