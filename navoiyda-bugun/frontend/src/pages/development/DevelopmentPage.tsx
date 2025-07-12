import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Award,
  Users,
  TrendingUp,
  BookOpen,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Star,
  Download,
  Share2,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  FileText,
  Video,
  Headphones,
  Image,
  PieChart,
  Target,
  Calendar,
  User,
  Trophy,
  Medal,
  GraduationCap,
  Brain,
  Lightbulb,
  Zap,
  BarChart3,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  X,
  Save,
  Send,
  MessageSquare,
  ThumbsUp,
  Flag,
  Bookmark,
  RefreshCw,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // in hours
  rating: number;
  studentsCount: number;
  price: number;
  isFree: boolean;
  thumbnail: string;
  tags: string[];
  progress: number;
  isEnrolled: boolean;
  completedLessons: number;
  totalLessons: number;
  certificate: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: "video" | "text" | "quiz" | "assignment";
  duration: number;
  isCompleted: boolean;
  order: number;
  content: string;
  videoUrl?: string;
  resources: string[];
}

interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number;
  attempts: number;
  maxAttempts: number;
  score: number;
  maxScore: number;
  isCompleted: boolean;
  completedAt: string | null;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  studentName: string;
  completionDate: string;
  score: number;
  instructor: string;
  certificateUrl: string;
}

interface LearningStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
  certificatesEarned: number;
  averageScore: number;
  streak: number;
  rank: number;
}

const DevelopmentPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [stats, setStats] = useState<LearningStats>({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalHours: 0,
    certificatesEarned: 0,
    averageScore: 0,
    streak: 0,
    rank: 0,
  });
  const [activeTab, setActiveTab] = useState<
    "courses" | "progress" | "certificates" | "achievements"
  >("courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Sample data
  useEffect(() => {
    const sampleCourses: Course[] = [
      {
        id: "1",
        title: "JavaScript Asoslari",
        description:
          "JavaScript dasturlash tilining asosiy tushunchalari va amaliy qo'llanilishi",
        instructor: "Aziz Karimov",
        category: "Programming",
        level: "beginner",
        duration: 20,
        rating: 4.8,
        studentsCount: 1250,
        price: 150000,
        isFree: false,
        thumbnail: "/api/placeholder/300/200",
        tags: ["JavaScript", "Web Development", "Frontend"],
        progress: 75,
        isEnrolled: true,
        completedLessons: 15,
        totalLessons: 20,
        certificate: true,
        createdAt: "2024-01-15",
        updatedAt: "2024-07-10",
      },
      {
        id: "2",
        title: "React.js Murakkab Mavzular",
        description:
          "React.js framework bilan professional web ilovalar yaratish",
        instructor: "Malika Tosheva",
        category: "Programming",
        level: "advanced",
        duration: 35,
        rating: 4.9,
        studentsCount: 890,
        price: 250000,
        isFree: false,
        thumbnail: "/api/placeholder/300/200",
        tags: ["React", "JavaScript", "Frontend", "Hooks"],
        progress: 30,
        isEnrolled: true,
        completedLessons: 8,
        totalLessons: 25,
        certificate: true,
        createdAt: "2024-02-20",
        updatedAt: "2024-07-12",
      },
      {
        id: "3",
        title: "Loyiha Boshqaruvi",
        description: "Zamonaviy loyiha boshqaruvi metodlari va vositalar",
        instructor: "Bobur Rahimov",
        category: "Management",
        level: "intermediate",
        duration: 15,
        rating: 4.7,
        studentsCount: 650,
        price: 0,
        isFree: true,
        thumbnail: "/api/placeholder/300/200",
        tags: ["Project Management", "Agile", "Scrum"],
        progress: 100,
        isEnrolled: true,
        completedLessons: 12,
        totalLessons: 12,
        certificate: true,
        createdAt: "2024-03-10",
        updatedAt: "2024-07-05",
      },
      {
        id: "4",
        title: "UI/UX Dizayn Tamoyillari",
        description: "Foydalanuvchi interfeysi va tajribasi dizayni asoslari",
        instructor: "Dildora Nazarova",
        category: "Design",
        level: "beginner",
        duration: 18,
        rating: 4.6,
        studentsCount: 980,
        price: 120000,
        isFree: false,
        thumbnail: "/api/placeholder/300/200",
        tags: ["UI/UX", "Design", "Figma", "Adobe XD"],
        progress: 0,
        isEnrolled: false,
        completedLessons: 0,
        totalLessons: 15,
        certificate: true,
        createdAt: "2024-04-05",
        updatedAt: "2024-07-08",
      },
      {
        id: "5",
        title: "Ma'lumotlar Tahlili",
        description: "Ma'lumotlar tahlili va vizualizatsiya usullari",
        instructor: "Jasur Abdullayev",
        category: "Analytics",
        level: "intermediate",
        duration: 25,
        rating: 4.8,
        studentsCount: 720,
        price: 180000,
        isFree: false,
        thumbnail: "/api/placeholder/300/200",
        tags: ["Data Analysis", "Python", "SQL", "Visualization"],
        progress: 45,
        isEnrolled: true,
        completedLessons: 9,
        totalLessons: 20,
        certificate: true,
        createdAt: "2024-05-12",
        updatedAt: "2024-07-11",
      },
    ];

    const sampleCertificates: Certificate[] = [
      {
        id: "1",
        courseId: "3",
        courseName: "Loyiha Boshqaruvi",
        studentName: "Foydalanuvchi",
        completionDate: "2024-07-05",
        score: 95,
        instructor: "Bobur Rahimov",
        certificateUrl: "/certificates/cert-1.pdf",
      },
    ];

    setCourses(sampleCourses);
    setCertificates(sampleCertificates);

    // Calculate stats
    const enrolledCourses = sampleCourses.filter((c) => c.isEnrolled);
    const completedCourses = enrolledCourses.filter((c) => c.progress === 100);
    const inProgressCourses = enrolledCourses.filter(
      (c) => c.progress > 0 && c.progress < 100
    );
    const totalHours = enrolledCourses.reduce(
      (sum, c) => sum + (c.duration * c.progress) / 100,
      0
    );

    setStats({
      totalCourses: enrolledCourses.length,
      completedCourses: completedCourses.length,
      inProgressCourses: inProgressCourses.length,
      totalHours: Math.round(totalHours),
      certificatesEarned: sampleCertificates.length,
      averageScore: 92,
      streak: 7,
      rank: 5,
    });
  }, []);

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || course.category === filterCategory;
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming":
        return <Brain className="w-5 h-5" />;
      case "Management":
        return <Target className="w-5 h-5" />;
      case "Design":
        return <Lightbulb className="w-5 h-5" />;
      case "Analytics":
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleEnrollCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, isEnrolled: true, progress: 0 }
          : course
      )
    );
  };

  const handleStartLesson = (course: Course) => {
    setSelectedCourse(course);
    setShowModal("lesson");
  };

  const handleViewCertificate = (certificate: Certificate) => {
    window.open(certificate.certificateUrl, "_blank");
  };

  const closeModal = () => {
    setShowModal(null);
    setSelectedCourse(null);
    setSelectedLesson(null);
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {showModal === "lesson" && selectedCourse?.title}
              {showModal === "quiz" && "Test"}
              {showModal === "course-details" && "Kurs tafsilotlari"}
            </h3>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {showModal === "lesson" && selectedCourse && (
            <div className="space-y-6">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Video dars</p>
                  <p className="text-sm opacity-75">Davomiyligi: 15 daqiqa</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Dars tafsilotlari
                  </h4>
                  <div className="prose max-w-none">
                    <p className="text-gray-600">
                      Bu darsda siz JavaScript dasturlash tilining asosiy
                      tushunchalari bilan tanishasiz. O'zgaruvchilar,
                      funksiyalar, ob'ektlar va massivlar haqida batafsil
                      ma'lumot olasiz.
                    </p>
                    <h5 className="font-medium text-gray-900 mt-4 mb-2">
                      Dars rejasi:
                    </h5>
                    <ul className="text-gray-600">
                      <li>JavaScript nima?</li>
                      <li>O'zgaruvchilar va ma'lumot turlari</li>
                      <li>Funksiyalar yaratish</li>
                      <li>Ob'ektlar bilan ishlash</li>
                      <li>Massivlar va metodlar</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">
                      Dars resurslari
                    </h5>
                    <div className="space-y-2">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        Dars konspekti (PDF)
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Kod namunalari
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Bookmark className="w-4 h-4" />
                        Qo'shimcha materiallar
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">Progress</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Bajarilgan</span>
                        <span>{selectedCourse.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${selectedCourse.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {selectedCourse.completedLessons} /{" "}
                        {selectedCourse.totalLessons} dars
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <ArrowDown className="w-4 h-4" />
                  Oldingi dars
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Darsni tugatish
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Keyingi dars
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {showModal === "course-details" && selectedCourse && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <img
                    src={selectedCourse.thumbnail}
                    alt={selectedCourse.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Kurs haqida
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {selectedCourse.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCourse.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Davomiyligi</p>
                      <p className="font-medium">
                        {selectedCourse.duration} soat
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Talabalar</p>
                      <p className="font-medium">
                        {selectedCourse.studentsCount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reyting</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">
                          {selectedCourse.rating}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Daraja</p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                          selectedCourse.level
                        )}`}
                      >
                        {selectedCourse.level === "beginner"
                          ? "Boshlang'ich"
                          : selectedCourse.level === "intermediate"
                          ? "O'rta"
                          : "Yuqori"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">
                      Instruktor
                    </h5>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {selectedCourse.instructor.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedCourse.instructor}
                        </p>
                        <p className="text-sm text-gray-500">
                          Expert Instruktor
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">Narx</h5>
                    <div className="text-center">
                      {selectedCourse.isFree ? (
                        <p className="text-2xl font-bold text-green-600">
                          Bepul
                        </p>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedCourse.price.toLocaleString()} so'm
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedCourse.isEnrolled ? (
                    <button
                      onClick={() => handleStartLesson(selectedCourse)}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Darsni boshlash
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnrollCourse(selectedCourse.id)}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Kursga yozilish
                    </button>
                  )}
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
        <title>O'qish platformasi - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              O'qish platformasi
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Kasbiy va shaxsiy rivojlanish uchun kurslar, testlar va
              sertifikatlar
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              Yangi kurs
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                  <BookOpen size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Jami kurslar
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalCourses}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 font-medium">
                  {stats.inProgressCourses} jarayonda
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
                    {stats.completedCourses}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">
                  {Math.round(
                    (stats.completedCourses / stats.totalCourses) * 100
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
                  <Clock size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    O'quv soatlari
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalHours}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-600 font-medium">
                  {stats.streak} kun ketma-ket
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
                  <Award size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Sertifikatlar
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.certificatesEarned}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-600 font-medium">
                  #{stats.rank} o'rinda
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
                { id: "courses", label: "Kurslar", icon: BookOpen },
                { id: "progress", label: "Progress", icon: TrendingUp },
                { id: "certificates", label: "Sertifikatlar", icon: Award },
                { id: "achievements", label: "Yutuqlar", icon: Trophy },
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
            {activeTab === "courses" && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Kurslarni qidirish..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Barcha kategoriyalar</option>
                    <option value="Programming">Dasturlash</option>
                    <option value="Management">Boshqaruv</option>
                    <option value="Design">Dizayn</option>
                    <option value="Analytics">Tahlil</option>
                  </select>

                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Barcha darajalar</option>
                    <option value="beginner">Boshlang'ich</option>
                    <option value="intermediate">O'rta</option>
                    <option value="advanced">Yuqori</option>
                  </select>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(course.category)}
                          <span className="text-sm text-gray-600">
                            {course.category}
                          </span>
                          <span
                            className={`ml-auto px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                              course.level
                            )}`}
                          >
                            {course.level === "beginner"
                              ? "Boshlang'ich"
                              : course.level === "intermediate"
                              ? "O'rta"
                              : "Yuqori"}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}h
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            {course.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.studentsCount}
                          </div>
                        </div>

                        {course.isEnrolled && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-gray-900">
                            {course.isFree
                              ? "Bepul"
                              : `${course.price.toLocaleString()} so'm`}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setShowModal("course-details");
                              }}
                              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {course.isEnrolled ? (
                              <button
                                onClick={() => handleStartLesson(course)}
                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                              >
                                Davom etish
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEnrollCourse(course.id)}
                                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                              >
                                Yozilish
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Haftalik faollik
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Dush",
                        "Sesh",
                        "Chor",
                        "Pay",
                        "Jum",
                        "Shan",
                        "Yak",
                      ].map((day, index) => (
                        <div
                          key={day}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-600">{day}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${Math.random() * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {Math.floor(Math.random() * 4)}h
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Kategoriyalar bo'yicha
                    </h4>
                    <div className="space-y-3">
                      {["Programming", "Management", "Design", "Analytics"].map(
                        (category) => (
                          <div
                            key={category}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(category)}
                              <span className="text-sm text-gray-600">
                                {category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${Math.random() * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {Math.floor(Math.random() * 10)}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Oxirgi faollik
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        action: "JavaScript Asoslari kursini tugallandi",
                        time: "2 soat oldin",
                        type: "completed",
                      },
                      {
                        action: "React.js darsini boshladi",
                        time: "1 kun oldin",
                        type: "started",
                      },
                      {
                        action: "Loyiha Boshqaruvi testini topshirdi",
                        time: "3 kun oldin",
                        type: "quiz",
                      },
                      {
                        action: "UI/UX Dizayn kursiga yozildi",
                        time: "1 hafta oldin",
                        type: "enrolled",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === "completed"
                              ? "bg-green-100 text-green-600"
                              : activity.type === "started"
                              ? "bg-blue-100 text-blue-600"
                              : activity.type === "quiz"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {activity.type === "completed" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : activity.type === "started" ? (
                            <Play className="w-4 h-4" />
                          ) : activity.type === "quiz" ? (
                            <FileText className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "certificates" && (
              <div className="space-y-6">
                {certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {certificate.courseName}
                            </h4>
                            <p className="text-sm text-gray-600">Sertifikat</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tugallangan:</span>
                            <span className="font-medium">
                              {new Date(
                                certificate.completionDate
                              ).toLocaleDateString("uz-UZ")}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Ball:</span>
                            <span className="font-medium text-green-600">
                              {certificate.score}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Instruktor:</span>
                            <span className="font-medium">
                              {certificate.instructor}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewCertificate(certificate)}
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            Ko'rish
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Hali sertifikatlar yo'q
                    </h3>
                    <p className="text-gray-600">
                      Kurslarni tugallab, sertifikat oling
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Birinchi kurs",
                      description: "Birinchi kursni tugallang",
                      icon: Trophy,
                      unlocked: true,
                      color: "from-yellow-400 to-orange-500",
                    },
                    {
                      title: "Haftaning o'quvchisi",
                      description: "Haftada 20 soat o'qing",
                      icon: Star,
                      unlocked: true,
                      color: "from-blue-400 to-purple-500",
                    },
                    {
                      title: "Test ustasi",
                      description:
                        "10 ta testni 90% dan yuqori ball bilan topshiring",
                      icon: Target,
                      unlocked: false,
                      color: "from-green-400 to-teal-500",
                    },
                    {
                      title: "Mentor",
                      description: "Boshqa o'quvchilarga yordam bering",
                      icon: Users,
                      unlocked: false,
                      color: "from-pink-400 to-red-500",
                    },
                    {
                      title: "Sertifikat yig'uvchi",
                      description: "5 ta sertifikat oling",
                      icon: Medal,
                      unlocked: false,
                      color: "from-indigo-400 to-purple-500",
                    },
                    {
                      title: "Doimiy o'quvchi",
                      description: "30 kun ketma-ket o'qing",
                      icon: Zap,
                      unlocked: false,
                      color: "from-orange-400 to-red-500",
                    },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`rounded-lg p-6 border ${
                        achievement.unlocked
                          ? "bg-white border-gray-200"
                          : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            achievement.unlocked
                              ? `bg-gradient-to-r ${achievement.color}`
                              : "bg-gray-300"
                          }`}
                        >
                          <achievement.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                      </div>

                      {achievement.unlocked ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Qo'lga kiritildi
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">Qulfda</span>
                        </div>
                      )}
                    </div>
                  ))}
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

export default DevelopmentPage;
