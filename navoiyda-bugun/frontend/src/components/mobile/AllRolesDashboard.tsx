import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  QrCode,
  Camera,
  MapPin,
  Wifi,
  Bell,
  Search,
  Menu,
  FileText,
  BarChart3,
  Target,
  Video,
  Edit3,
  Settings,
  Shield,
  Plus,
  ChevronRight,
  Activity,
  Star,
  Calendar,
  MessageCircle,
  Zap,
  Award,
  Briefcase,
  Globe,
  Headphones,
  Layers,
  PieChart,
  TrendingDown,
  UserCheck,
  Smartphone,
  Tablet,
  Monitor,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Filter,
  Download,
  Share2,
  Eye,
  Heart,
  BookOpen,
  Coffee,
  Lightbulb,
  Rocket,
  Sparkles,
} from "lucide-react";

interface AllRolesDashboardProps {
  userRole: string;
}

const AllRolesDashboard: React.FC<AllRolesDashboardProps> = ({ userRole }) => {
  const getDashboardData = () => {
    switch (userRole) {
      case "founder":
        return {
          title: "Asoschi Dashboard",
          gradient: "from-purple-600 to-blue-600",
          stats: [
            {
              label: "Umumiy daromad",
              value: "$450K",
              icon: DollarSign,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+12%",
              trend: "up",
            },
            {
              label: "Xodimlar",
              value: "11",
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+2",
              trend: "up",
            },
            {
              label: "O'sish",
              value: "+15%",
              icon: TrendingUp,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+3%",
              trend: "up",
            },
            {
              label: "KPI",
              value: "94%",
              icon: BarChart3,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+5%",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: BarChart3,
              title: "Statistikalar",
              desc: "Umumiy ko'rsatkichlar",
              color: "blue",
            },
            {
              icon: DollarSign,
              title: "Moliya",
              desc: "Daromad hisoboti",
              color: "green",
            },
            {
              icon: Target,
              title: "Strategiya",
              desc: "Uzoq muddatli rejalar",
              color: "purple",
            },
            {
              icon: Users,
              title: "Jamoa",
              desc: "Xodimlar holati",
              color: "orange",
            },
          ],
          features: [
            {
              icon: BarChart3,
              title: "Statistikalar nazorati",
              desc: "Barcha ko'rsatkichlar",
              status: "active",
            },
            {
              icon: DollarSign,
              title: "Moliyaviy ko'rsatkichlar",
              desc: "Daromad va xarajatlar",
              status: "active",
            },
            {
              icon: Target,
              title: "Strategik rejalar",
              desc: "Uzoq muddatli rejalar",
              status: "active",
            },
            {
              icon: TrendingUp,
              title: "KPI monitoringi",
              desc: "Samaradorlik nazorati",
              status: "active",
            },
          ],
        };

      case "ceo":
        return {
          title: "CEO Dashboard",
          gradient: "from-blue-600 to-indigo-600",
          stats: [
            {
              label: "Operatsion ko'rsatkichlar",
              value: "85%",
              icon: TrendingUp,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+8%",
              trend: "up",
            },
            {
              label: "Faol loyihalar",
              value: "7",
              icon: FileText,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+1",
              trend: "up",
            },
            {
              label: "Xodimlar samaradorligi",
              value: "92%",
              icon: Users,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+4%",
              trend: "up",
            },
            {
              label: "Vazifalar",
              value: "23",
              icon: Clock,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+5",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: BarChart3,
              title: "Operatsiyalar",
              desc: "Kundalik nazorat",
              color: "blue",
            },
            {
              icon: Users,
              title: "Xodimlar",
              desc: "Jamoa boshqaruvi",
              color: "green",
            },
            {
              icon: FileText,
              title: "Loyihalar",
              desc: "Loyihalar holati",
              color: "purple",
            },
            {
              icon: Target,
              title: "Vazifalar",
              desc: "Vazifalar nazorati",
              color: "orange",
            },
          ],
          features: [
            {
              icon: BarChart3,
              title: "Operatsion nazorat",
              desc: "Kundalik operatsiyalar",
              status: "active",
            },
            {
              icon: Users,
              title: "Xodimlar boshqaruvi",
              desc: "Jamoani boshqarish",
              status: "active",
            },
            {
              icon: FileText,
              title: "Loyihalar holati",
              desc: "Loyihalar monitoringi",
              status: "active",
            },
            {
              icon: Target,
              title: "Vazifalar nazorati",
              desc: "Vazifalar taqsimlash",
              status: "active",
            },
          ],
        };

      case "admin":
        return {
          title: "Administrator Dashboard",
          gradient: "from-gray-700 to-gray-900",
          stats: [
            {
              label: "Foydalanuvchilar",
              value: "11",
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+2",
              trend: "up",
            },
            {
              label: "Rollar/Ruxsatlar",
              value: "8",
              icon: Shield,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+1",
              trend: "up",
            },
            {
              label: "Tizim sozlamalari",
              value: "95%",
              icon: Settings,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+5%",
              trend: "up",
            },
            {
              label: "Monitoring",
              value: "100%",
              icon: Activity,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "0%",
              trend: "stable",
            },
          ],
          quickActions: [
            {
              icon: Users,
              title: "Foydalanuvchilar",
              desc: "User management",
              color: "blue",
            },
            {
              icon: Shield,
              title: "Rollar",
              desc: "Permissions",
              color: "green",
            },
            {
              icon: Settings,
              title: "Sozlamalar",
              desc: "System config",
              color: "purple",
            },
            {
              icon: Activity,
              title: "Monitoring",
              desc: "System health",
              color: "orange",
            },
          ],
          features: [
            {
              icon: Users,
              title: "Foydalanuvchilar boshqaruvi",
              desc: "User management va permissions",
              status: "active",
            },
            {
              icon: Shield,
              title: "Rollar va ruxsatlar",
              desc: "Role-based access control",
              status: "active",
            },
            {
              icon: Settings,
              title: "Tizim sozlamalari",
              desc: "System configuration",
              status: "active",
            },
            {
              icon: Activity,
              title: "Tizim monitoringi",
              desc: "Performance va security",
              status: "active",
            },
            {
              icon: Database,
              title: "Ma'lumotlar bazasi",
              desc: "Database management",
              status: "active",
            },
            {
              icon: Globe,
              title: "API integratsiya",
              desc: "External services",
              status: "active",
            },
          ],
        };

      case "hr_manager":
      case "hr":
        return {
          title: "HR Manager Dashboard",
          gradient: "from-green-600 to-teal-600",
          stats: [
            {
              label: "Xodimlar",
              value: "11",
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+1",
              trend: "up",
            },
            {
              label: "Davomat",
              value: "98%",
              icon: Clock,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+2%",
              trend: "up",
            },
            {
              label: "Ball tizimi",
              value: "4.8",
              icon: Star,
              color: "text-yellow-600",
              bg: "bg-yellow-50",
              change: "+0.2",
              trend: "up",
            },
            {
              label: "Rivojlanish",
              value: "85%",
              icon: TrendingUp,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+10%",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: Users,
              title: "Xodimlar",
              desc: "Barcha xodimlar",
              color: "blue",
            },
            {
              icon: Clock,
              title: "Davomat",
              desc: "Kelish-ketish",
              color: "green",
            },
            { icon: Star, title: "KPI", desc: "Samaradorlik", color: "yellow" },
            {
              icon: TrendingUp,
              title: "Rivojlanish",
              desc: "Training va kurslar",
              color: "purple",
            },
          ],
          features: [
            {
              icon: Users,
              title: "Xodimlar ro'yxati",
              desc: "Barcha xodimlar ma'lumoti",
              status: "active",
            },
            {
              icon: Clock,
              title: "Davomat nazorati",
              desc: "Kelish-ketish vaqtlari",
              status: "active",
            },
            {
              icon: Star,
              title: "KPI monitoringi",
              desc: "Xodimlar samaradorligi",
              status: "active",
            },
            {
              icon: TrendingUp,
              title: "Rivojlanish",
              desc: "Xodimlar o'sishi",
              status: "active",
            },
          ],
        };

      case "project_manager":
      case "project":
        return {
          title: "Loyiha Menejer Dashboard",
          gradient: "from-orange-600 to-red-600",
          stats: [
            {
              label: "Loyihalar",
              value: "7",
              icon: FileText,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+1",
              trend: "up",
            },
            {
              label: "Vazifalar",
              value: "23",
              icon: Target,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+5",
              trend: "up",
            },
            {
              label: "Bajarilish",
              value: "78%",
              icon: TrendingUp,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+8%",
              trend: "up",
            },
            {
              label: "Monitoring",
              value: "100%",
              icon: Activity,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "0%",
              trend: "stable",
            },
          ],
          quickActions: [
            {
              icon: FileText,
              title: "Loyihalar",
              desc: "Barcha loyihalar",
              color: "blue",
            },
            {
              icon: Target,
              title: "Vazifalar",
              desc: "Task management",
              color: "orange",
            },
            {
              icon: TrendingUp,
              title: "Progress",
              desc: "Bajarilish holati",
              color: "green",
            },
            {
              icon: Activity,
              title: "Monitoring",
              desc: "Real-time tracking",
              color: "purple",
            },
          ],
          features: [
            {
              icon: FileText,
              title: "Loyihalar boshqaruvi",
              desc: "Barcha loyihalar",
              status: "active",
            },
            {
              icon: Target,
              title: "Vazifalar taqsimlash",
              desc: "Vazifalarni belgilash",
              status: "active",
            },
            {
              icon: TrendingUp,
              title: "Bajarilish nazorati",
              desc: "Progress monitoring",
              status: "active",
            },
            {
              icon: BarChart3,
              title: "Hisobotlar",
              desc: "Loyiha hisobotlari",
              status: "active",
            },
          ],
        };

      case "marketing_manager":
      case "marketing":
        return {
          title: "Marketing Dashboard",
          gradient: "from-pink-600 to-rose-600",
          stats: [
            {
              label: "Kampaniyalar",
              value: "8",
              icon: Target,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+2",
              trend: "up",
            },
            {
              label: "Target reklama",
              value: "15.4K",
              icon: TrendingUp,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+2.1K",
              trend: "up",
            },
            {
              label: "Analitika",
              value: "245%",
              icon: BarChart3,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+45%",
              trend: "up",
            },
            {
              label: "Segmentatsiya",
              value: "92%",
              icon: Users,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+8%",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: Target,
              title: "Kampaniyalar",
              desc: "Reklama kampaniyalari",
              color: "blue",
            },
            {
              icon: TrendingUp,
              title: "Target",
              desc: "Maqsadli auditoriya",
              color: "green",
            },
            {
              icon: BarChart3,
              title: "Analitika",
              desc: "ROI va statistika",
              color: "purple",
            },
            {
              icon: Users,
              title: "Segmentatsiya",
              desc: "Mijozlar guruhi",
              color: "orange",
            },
          ],
          features: [
            {
              icon: Target,
              title: "Marketing kampaniyalari",
              desc: "Reklama kampaniyalari",
              status: "active",
            },
            {
              icon: TrendingUp,
              title: "Target reklama",
              desc: "Maqsadli auditoriya",
              status: "active",
            },
            {
              icon: BarChart3,
              title: "Marketing analitika",
              desc: "ROI va statistika",
              status: "active",
            },
            {
              icon: Users,
              title: "Mijozlar segmentatsiyasi",
              desc: "Mijozlarni guruhlash",
              status: "active",
            },
          ],
        };

      case "sales_manager":
      case "sales":
        return {
          title: "Sotuv Menejer Dashboard",
          gradient: "from-emerald-600 to-teal-600",
          stats: [
            {
              label: "Mijozlar",
              value: "156",
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+12",
              trend: "up",
            },
            {
              label: "Sotuv voronkasi",
              value: "89%",
              icon: TrendingUp,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+5%",
              trend: "up",
            },
            {
              label: "Buyurtmalar",
              value: "47",
              icon: FileText,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+8",
              trend: "up",
            },
            {
              label: "Hisobotlar",
              value: "12",
              icon: BarChart3,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+3",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: Users,
              title: "Mijozlar",
              desc: "CRM boshqaruvi",
              color: "blue",
            },
            {
              icon: TrendingUp,
              title: "Sotuv voronkasi",
              desc: "Lead management",
              color: "green",
            },
            {
              icon: FileText,
              title: "Buyurtmalar",
              desc: "Order tracking",
              color: "orange",
            },
            {
              icon: BarChart3,
              title: "Hisobotlar",
              desc: "Sales analytics",
              color: "purple",
            },
          ],
          features: [
            {
              icon: Users,
              title: "Mijozlar bazasi",
              desc: "CRM boshqaruvi",
              status: "active",
            },
            {
              icon: TrendingUp,
              title: "Sotuv voronkasi",
              desc: "Lead management",
              status: "active",
            },
            {
              icon: FileText,
              title: "Buyurtmalar",
              desc: "Order tracking",
              status: "active",
            },
            {
              icon: BarChart3,
              title: "Sotuv hisobotlari",
              desc: "Sales analytics",
              status: "active",
            },
          ],
        };

      case "mobilographer":
        return {
          title: "Mobilograf Dashboard",
          gradient: "from-violet-600 to-purple-600",
          stats: [
            {
              label: "Kontent kalendari",
              value: "24",
              icon: Calendar,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+6",
              trend: "up",
            },
            {
              label: "Foto/Video",
              value: "156",
              icon: Camera,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+23",
              trend: "up",
            },
            {
              label: "Reels/Stories",
              value: "89",
              icon: Video,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+15",
              trend: "up",
            },
            {
              label: "Jonli efirlar",
              value: "12",
              icon: Wifi,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+3",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: Calendar,
              title: "Kalendar",
              desc: "Kontent rejasi",
              color: "blue",
            },
            {
              icon: Camera,
              title: "Foto/Video",
              desc: "Kontent yaratish",
              color: "green",
            },
            {
              icon: Video,
              title: "Reels",
              desc: "Qisqa videolar",
              color: "purple",
            },
            {
              icon: Wifi,
              title: "Live",
              desc: "Jonli efirlar",
              color: "orange",
            },
          ],
          features: [
            {
              icon: Calendar,
              title: "Kontent kalendari",
              desc: "Rejalashtirish",
              status: "active",
            },
            {
              icon: Camera,
              title: "Foto/Video yaratish",
              desc: "Kontent ishlab chiqarish",
              status: "active",
            },
            {
              icon: Video,
              title: "Reels va Stories",
              desc: "Qisqa video kontent",
              status: "active",
            },
            {
              icon: Wifi,
              title: "Jonli efirlar",
              desc: "Live streaming",
              status: "active",
            },
          ],
        };

      case "brand_face":
      case "brandface":
        return {
          title: "Brend Yuzi Dashboard",
          gradient: "from-rose-600 to-pink-600",
          stats: [
            {
              label: "Kontent kalendari",
              value: "30",
              icon: Calendar,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+8",
              trend: "up",
            },
            {
              label: "Ssenariylar",
              value: "18",
              icon: Edit3,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+5",
              trend: "up",
            },
            {
              label: "Jonli efirlar",
              value: "8",
              icon: Video,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+2",
              trend: "up",
            },
            {
              label: "Vizual estetika",
              value: "95%",
              icon: Camera,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+5%",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: Calendar,
              title: "Kalendar",
              desc: "Nashr rejasi",
              color: "blue",
            },
            {
              icon: Edit3,
              title: "Ssenariylar",
              desc: "Matn tayyorlash",
              color: "green",
            },
            {
              icon: Video,
              title: "Live",
              desc: "Jonli efirlar",
              color: "purple",
            },
            {
              icon: Camera,
              title: "Estetika",
              desc: "Brand identity",
              color: "orange",
            },
          ],
          features: [
            {
              icon: Calendar,
              title: "Kontent kalendari",
              desc: "Nashr rejasi",
              status: "active",
            },
            {
              icon: Edit3,
              title: "Ssenariylar",
              desc: "Matn tayyorlash",
              status: "active",
            },
            {
              icon: Video,
              title: "Jonli efirlar jadvali",
              desc: "Live sessions",
              status: "active",
            },
            {
              icon: Camera,
              title: "Vizual estetika",
              desc: "Brand identity",
              status: "active",
            },
          ],
        };

      case "screenwriter":
        return {
          title: "Ssenarist Dashboard",
          gradient: "from-indigo-600 to-blue-600",
          stats: [
            {
              label: "Kontent g'oyalari",
              value: "45",
              icon: Lightbulb,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+12",
              trend: "up",
            },
            {
              label: "Ssenariylar",
              value: "23",
              icon: FileText,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+6",
              trend: "up",
            },
            {
              label: "Trend qidirish",
              value: "156",
              icon: TrendingUp,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+34",
              trend: "up",
            },
            {
              label: "Tasdiqlangan",
              value: "89%",
              icon: CheckCircle,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+12%",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: Lightbulb,
              title: "G'oyalar",
              desc: "Ijodiy g'oyalar",
              color: "blue",
            },
            {
              icon: FileText,
              title: "Ssenariylar",
              desc: "Matn yozish",
              color: "green",
            },
            {
              icon: TrendingUp,
              title: "Trendlar",
              desc: "Mashhur mavzular",
              color: "purple",
            },
            {
              icon: CheckCircle,
              title: "Tasdiqlash",
              desc: "Approval jarayoni",
              color: "orange",
            },
          ],
          features: [
            {
              icon: Lightbulb,
              title: "Kontent g'oyalari",
              desc: "Ijodiy g'oyalar",
              status: "active",
            },
            {
              icon: FileText,
              title: "Ssenariy yaratish",
              desc: "Matn yozish",
              status: "active",
            },
            {
              icon: TrendingUp,
              title: "Trend qidirish",
              desc: "Mashhur mavzular",
              status: "active",
            },
            {
              icon: CheckCircle,
              title: "Tasdiqlash",
              desc: "Kontent approval",
              status: "active",
            },
          ],
        };

      default:
        return {
          title: "Xodim Dashboard",
          gradient: "from-slate-600 to-gray-600",
          stats: [
            {
              label: "Vazifalar",
              value: "8",
              icon: FileText,
              color: "text-green-600",
              bg: "bg-green-50",
              change: "+2",
              trend: "up",
            },
            {
              label: "Davomat",
              value: "98%",
              icon: Clock,
              color: "text-blue-600",
              bg: "bg-blue-50",
              change: "+2%",
              trend: "up",
            },
            {
              label: "Rivojlanish",
              value: "3",
              icon: TrendingUp,
              color: "text-purple-600",
              bg: "bg-purple-50",
              change: "+1",
              trend: "up",
            },
            {
              label: "Hisobotlar",
              value: "5",
              icon: BarChart3,
              color: "text-orange-600",
              bg: "bg-orange-50",
              change: "+1",
              trend: "up",
            },
          ],
          quickActions: [
            {
              icon: FileText,
              title: "Vazifalar",
              desc: "Kundalik vazifalar",
              color: "green",
            },
            {
              icon: Clock,
              title: "Davomat",
              desc: "Check-in/out",
              color: "blue",
            },
            {
              icon: TrendingUp,
              title: "Rivojlanish",
              desc: "Kurslar",
              color: "purple",
            },
            {
              icon: BarChart3,
              title: "Hisobotlar",
              desc: "Progress reports",
              color: "orange",
            },
          ],
          features: [
            {
              icon: FileText,
              title: "Vazifalar ro'yxati",
              desc: "Kundalik vazifalar",
              status: "active",
            },
            {
              icon: Clock,
              title: "Davomat qayd etish",
              desc: "Check-in/out",
              status: "active",
            },
            {
              icon: TrendingUp,
              title: "Shaxsiy rivojlanish",
              desc: "Kurslar va treninglar",
              status: "active",
            },
            {
              icon: BarChart3,
              title: "Hisobotlar yuborish",
              desc: "Progress reports",
              status: "active",
            },
          ],
        };
    }
  };

  const data = getDashboardData();

  return (
    <div className="pb-20 md:pb-0 min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-4 md:hidden shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-r ${data.gradient} flex items-center justify-center shadow-lg`}
            >
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{data.title}</h1>
              <p className="text-xs text-gray-500">Mobil boshqaruv paneli</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="p-2 h-9 w-9">
              <Search size={18} />
            </Button>
            <Button size="sm" variant="ghost" className="p-2 h-9 w-9 relative">
              <Bell size={18} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">3</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className={`mx-4 mt-4 p-6 rounded-2xl bg-gradient-to-r ${data.gradient} text-white shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Salom! 👋</h2>
            <p className="text-white/90 text-sm">
              Bugun sizning {data.title.toLowerCase()} panelingizda yangi
              imkoniyatlar mavjud
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {data.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-4 border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white"
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-xl ${stat.bg} shadow-sm`}>
                      <Icon size={20} className={stat.color} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {stat.trend === "up" && (
                        <TrendingUp size={12} className="text-green-600" />
                      )}
                      {stat.trend === "down" && (
                        <TrendingDown size={12} className="text-red-600" />
                      )}
                      {stat.trend === "stable" && (
                        <Activity size={12} className="text-gray-600" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : stat.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-4 border-0 shadow-md">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg flex items-center">
              <Zap className="w-5 h-5 text-blue-600 mr-2" />
              Tezkor Amallar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-3">
              {data.quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`h-auto p-4 flex flex-col items-center space-y-2 bg-${action.color}-50 hover:bg-${action.color}-100 border border-${action.color}-200 rounded-xl transition-all duration-300`}
                  >
                    <Icon size={24} className={`text-${action.color}-600`} />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {action.title}
                      </p>
                      <p className="text-xs text-gray-600">{action.desc}</p>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="p-4 border-0 shadow-md">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg flex items-center">
              <Briefcase className="w-5 h-5 text-purple-600 mr-2" />
              {data.title} Xususiyatlari
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              {data.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="p-3 bg-white rounded-xl shadow-sm mr-4">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {feature.title}
                        </h4>
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="p-4 border-0 shadow-md">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg flex items-center">
              <Monitor className="w-5 h-5 text-green-600 mr-2" />
              Tizim Holati
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">
                    Server holati
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Faol
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">
                    Ma'lumotlar bazasi
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Sog'lom
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">
                    API xizmatlari
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  Ishlayapti
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Optimization */}
        <Card className="p-4 border-0 shadow-md">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg flex items-center">
              <Smartphone className="w-5 h-5 text-indigo-600 mr-2" />
              Mobil Optimizatsiya
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Mobil qurilmalar
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-800"
                >
                  Optimallashtirilgan
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Tablet className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Planshetlar
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-cyan-100 text-cyan-800"
                >
                  Moslashtirilgan
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Desktop
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800"
                >
                  To'liq versiya
                </Badge>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-3">
                Barcha qurilmalar uchun optimallashtirilgan interfeys:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Touch Friendly
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Responsive Design
                </Badge>
                <Badge variant="outline" className="text-xs">
                  PWA Ready
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Offline Support
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Fast Loading
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg">
            <RefreshCw size={18} className="mr-2" />
            Yangilash
          </Button>
          <Button
            variant="outline"
            className="h-12 border-2 border-gray-200 hover:border-gray-300 rounded-xl"
          >
            <Settings size={18} className="mr-2" />
            Sozlamalar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllRolesDashboard;
