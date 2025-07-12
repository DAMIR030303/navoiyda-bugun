import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
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
          stats: [
            {
              label: "Umumiy daromad",
              value: "$450K",
              icon: DollarSign,
              color: "text-green-600",
            },
            {
              label: "Xodimlar",
              value: "11",
              icon: Users,
              color: "text-blue-600",
            },
            {
              label: "O'sish",
              value: "+15%",
              icon: TrendingUp,
              color: "text-purple-600",
            },
            {
              label: "KPI",
              value: "94%",
              icon: BarChart3,
              color: "text-orange-600",
            },
          ],
          features: [
            {
              icon: BarChart3,
              title: "Statistikalar nazorati",
              desc: "Barcha ko'rsatkichlar",
            },
            {
              icon: DollarSign,
              title: "Moliyaviy ko'rsatkichlar",
              desc: "Daromad va xarajatlar",
            },
            {
              icon: Target,
              title: "Strategik rejalar",
              desc: "Uzoq muddatli rejalar",
            },
            {
              icon: TrendingUp,
              title: "KPI monitoringi",
              desc: "Samaradorlik nazorati",
            },
          ],
        };

      case "ceo":
        return {
          title: "CEO Dashboard",
          stats: [
            {
              label: "Operatsion ko'rsatkichlar",
              value: "85%",
              icon: TrendingUp,
              color: "text-green-600",
            },
            {
              label: "Faol loyihalar",
              value: "7",
              icon: FileText,
              color: "text-blue-600",
            },
            {
              label: "Xodimlar samaradorligi",
              value: "92%",
              icon: Users,
              color: "text-orange-600",
            },
            {
              label: "Vazifalar taqsimlash",
              value: "23",
              icon: Clock,
              color: "text-purple-600",
            },
          ],
          features: [
            {
              icon: BarChart3,
              title: "Operatsion nazorat",
              desc: "Kundalik operatsiyalar",
            },
            {
              icon: Users,
              title: "Xodimlar boshqaruvi",
              desc: "Jamoani boshqarish",
            },
            {
              icon: FileText,
              title: "Loyihalar holati",
              desc: "Loyihalar monitoringi",
            },
            {
              icon: Target,
              title: "Vazifalar nazorati",
              desc: "Vazifalar taqsimlash",
            },
          ],
        };

      case "hr_manager":
      case "hr":
        return {
          title: "HR Manager Dashboard",
          stats: [
            {
              label: "Xodimlar ro'yxati",
              value: "11",
              icon: Users,
              color: "text-blue-600",
            },
            {
              label: "Davomat nazorati",
              value: "98%",
              icon: Clock,
              color: "text-green-600",
            },
            {
              label: "Ball tizimi",
              value: "4.8",
              icon: TrendingUp,
              color: "text-purple-600",
            },
            {
              label: "Rivojlanish",
              value: "85%",
              icon: BarChart3,
              color: "text-orange-600",
            },
          ],
          features: [
            {
              icon: Users,
              title: "Xodimlar ro'yxati",
              desc: "Barcha xodimlar ma'lumoti",
            },
            {
              icon: Clock,
              title: "Davomat nazorati",
              desc: "Kelish-ketish vaqtlari",
            },
            {
              icon: TrendingUp,
              title: "KPI monitoringi",
              desc: "Xodimlar samaradorligi",
            },
            { icon: BarChart3, title: "Rivojlanish", desc: "Xodimlar o'sishi" },
          ],
        };

      case "project_manager":
      case "project":
        return {
          title: "Loyiha Menejer Dashboard",
          stats: [
            {
              label: "Loyihalar ro'yxati",
              value: "7",
              icon: FileText,
              color: "text-blue-600",
            },
            {
              label: "Vazifalar taqsimlash",
              value: "23",
              icon: Target,
              color: "text-orange-600",
            },
            {
              label: "Bajarilish",
              value: "78%",
              icon: TrendingUp,
              color: "text-green-600",
            },
            {
              label: "Monitoring",
              value: "100%",
              icon: BarChart3,
              color: "text-purple-600",
            },
          ],
          features: [
            {
              icon: FileText,
              title: "Loyihalar boshqaruvi",
              desc: "Barcha loyihalar",
            },
            {
              icon: Target,
              title: "Vazifalar taqsimlash",
              desc: "Vazifalarni belgilash",
            },
            {
              icon: TrendingUp,
              title: "Bajarilish nazorati",
              desc: "Progress monitoring",
            },
            {
              icon: BarChart3,
              title: "Hisobotlar",
              desc: "Loyiha hisobotlari",
            },
          ],
        };

      case "marketing_manager":
      case "marketing":
        return {
          title: "Marketing Dashboard",
          stats: [
            {
              label: "Kampaniyalar",
              value: "8",
              icon: Target,
              color: "text-blue-600",
            },
            {
              label: "Target reklama",
              value: "15.4K",
              icon: TrendingUp,
              color: "text-green-600",
            },
            {
              label: "Analitika",
              value: "245%",
              icon: BarChart3,
              color: "text-purple-600",
            },
            {
              label: "Segmentatsiya",
              value: "92%",
              icon: Users,
              color: "text-orange-600",
            },
          ],
          features: [
            {
              icon: Target,
              title: "Marketing kampaniyalari",
              desc: "Reklama kampaniyalari",
            },
            {
              icon: TrendingUp,
              title: "Target reklama",
              desc: "Maqsadli auditoriya",
            },
            {
              icon: BarChart3,
              title: "Marketing analitika",
              desc: "ROI va statistika",
            },
            {
              icon: Users,
              title: "Mijozlar segmentatsiyasi",
              desc: "Mijozlarni guruhlash",
            },
          ],
        };

      case "sales_manager":
      case "sales":
        return {
          title: "Sotuv Menejer Dashboard",
          stats: [
            {
              label: "Mijozlar bazasi",
              value: "156",
              icon: Users,
              color: "text-blue-600",
            },
            {
              label: "Sotuv voronkasi",
              value: "89%",
              icon: TrendingUp,
              color: "text-green-600",
            },
            {
              label: "Buyurtmalar",
              value: "47",
              icon: FileText,
              color: "text-orange-600",
            },
            {
              label: "Hisobotlar",
              value: "12",
              icon: BarChart3,
              color: "text-purple-600",
            },
          ],
          features: [
            { icon: Users, title: "Mijozlar bazasi", desc: "CRM boshqaruvi" },
            {
              icon: TrendingUp,
              title: "Sotuv voronkasi",
              desc: "Lead management",
            },
            { icon: FileText, title: "Buyurtmalar", desc: "Order tracking" },
            {
              icon: BarChart3,
              title: "Sotuv hisobotlari",
              desc: "Sales analytics",
            },
          ],
        };

      case "mobilographer":
        return {
          title: "Mobilograf Dashboard",
          stats: [
            {
              label: "Kontent kalendari",
              value: "24",
              icon: Clock,
              color: "text-blue-600",
            },
            {
              label: "Foto/Video",
              value: "156",
              icon: Camera,
              color: "text-green-600",
            },
            {
              label: "Reels/Stories",
              value: "89",
              icon: Video,
              color: "text-purple-600",
            },
            {
              label: "Jonli efirlar",
              value: "12",
              icon: Wifi,
              color: "text-orange-600",
            },
          ],
          features: [
            { icon: Clock, title: "Kontent kalendari", desc: "Rejalashtirish" },
            {
              icon: Camera,
              title: "Foto/Video yaratish",
              desc: "Kontent ishlab chiqarish",
            },
            {
              icon: Video,
              title: "Reels va Stories",
              desc: "Qisqa video kontent",
            },
            { icon: Wifi, title: "Jonli efirlar", desc: "Live streaming" },
          ],
        };

      case "brand_face":
      case "brandface":
        return {
          title: "Brend Yuzi Dashboard",
          stats: [
            {
              label: "Kontent kalendari",
              value: "30",
              icon: Clock,
              color: "text-blue-600",
            },
            {
              label: "Ssenariylar",
              value: "18",
              icon: Edit3,
              color: "text-green-600",
            },
            {
              label: "Jonli efirlar",
              value: "8",
              icon: Video,
              color: "text-purple-600",
            },
            {
              label: "Vizual estetika",
              value: "95%",
              icon: Camera,
              color: "text-orange-600",
            },
          ],
          features: [
            { icon: Clock, title: "Kontent kalendari", desc: "Nashr rejasi" },
            { icon: Edit3, title: "Ssenariylar", desc: "Matn tayyorlash" },
            {
              icon: Video,
              title: "Jonli efirlar jadvali",
              desc: "Live sessions",
            },
            { icon: Camera, title: "Vizual estetika", desc: "Brand identity" },
          ],
        };

      case "screenwriter":
        return {
          title: "Ssenarist Dashboard",
          stats: [
            {
              label: "Kontent g'oyalari",
              value: "45",
              icon: Edit3,
              color: "text-blue-600",
            },
            {
              label: "Ssenariylar",
              value: "23",
              icon: FileText,
              color: "text-green-600",
            },
            {
              label: "Trend qidirish",
              value: "156",
              icon: TrendingUp,
              color: "text-purple-600",
            },
            {
              label: "Tasdiqlangan",
              value: "89%",
              icon: Target,
              color: "text-orange-600",
            },
          ],
          features: [
            {
              icon: Edit3,
              title: "Kontent g'oyalari",
              desc: "Ijodiy g'oyalar",
            },
            { icon: FileText, title: "Ssenariy yaratish", desc: "Matn yozish" },
            {
              icon: TrendingUp,
              title: "Trend qidirish",
              desc: "Mashhur mavzular",
            },
            { icon: Target, title: "Tasdiqlash", desc: "Kontent approval" },
          ],
        };

      case "admin":
        return {
          title: "Administrator Dashboard",
          stats: [
            {
              label: "Foydalanuvchilar",
              value: "11",
              icon: Users,
              color: "text-blue-600",
            },
            {
              label: "Rollar/Ruxsatlar",
              value: "8",
              icon: Shield,
              color: "text-green-600",
            },
            {
              label: "Tizim sozlamalari",
              value: "95%",
              icon: Settings,
              color: "text-purple-600",
            },
            {
              label: "Monitoring",
              value: "100%",
              icon: BarChart3,
              color: "text-orange-600",
            },
          ],
          features: [
            { icon: Users, title: "Foydalanuvchilar", desc: "User management" },
            { icon: Shield, title: "Rollar va ruxsatlar", desc: "Permissions" },
            {
              icon: Settings,
              title: "Tizim sozlamalari",
              desc: "System config",
            },
            {
              icon: BarChart3,
              title: "Tizim monitoringi",
              desc: "System health",
            },
          ],
        };

      default:
        return {
          title: "Xodim Dashboard",
          stats: [
            {
              label: "Vazifalar ro'yxati",
              value: "8",
              icon: FileText,
              color: "text-green-600",
            },
            {
              label: "Davomat qayd etish",
              value: "98%",
              icon: Clock,
              color: "text-blue-600",
            },
            {
              label: "Shaxsiy rivojlanish",
              value: "3",
              icon: TrendingUp,
              color: "text-purple-600",
            },
            {
              label: "Hisobotlar",
              value: "5",
              icon: BarChart3,
              color: "text-orange-600",
            },
          ],
          features: [
            {
              icon: FileText,
              title: "Vazifalar ro'yxati",
              desc: "Kundalik vazifalar",
            },
            { icon: Clock, title: "Davomat qayd etish", desc: "Check-in/out" },
            {
              icon: TrendingUp,
              title: "Shaxsiy rivojlanish",
              desc: "Kurslar va treninglar",
            },
            {
              icon: BarChart3,
              title: "Hisobotlar yuborish",
              desc: "Progress reports",
            },
          ],
        };
    }
  };

  const data = getDashboardData();

  return (
    <div className="pb-20 md:pb-0">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg bg-gray-100">
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold">{data.title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-gray-100">
              <Search size={18} />
            </button>
            <button className="p-2 rounded-lg bg-gray-100 relative">
              <Bell size={18} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {data.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                      <Icon size={16} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Asosiy Interfeys Elementlari */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
              Asosiy Interfeys Elementlari
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm">Pastki navigatsiya paneli</span>
                <Badge variant="secondary">5 ta tugma</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm">Bildirishnomalar markazi</span>
                <Badge variant="secondary">Yuqori o'ng</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">Qidiruv tugmasi</span>
                <Badge variant="secondary">Yuqori chap</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm">Filtrlar va saralash</span>
                <Badge variant="secondary">Ro'yxatlar tepasida</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rol bo'yicha Xususiyatlar */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              {data.title} Xususiyatlari
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-3">
              {data.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-white rounded-lg mr-3">
                      <Icon size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Mobil Qurilmalar Uchun Optimallashtirilgan */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base">
              Mobil Qurilmalar Uchun Optimallashtirilgan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm text-gray-600 mb-3">
              Mobil qurilmalar uchun maxsus moslashtirilgan interfeys, bir qo'l
              bilan boshqarish imkoniyati va tezkor foydalanish uchun
              optimallashtirilgan.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Touch Friendly</Badge>
              <Badge variant="outline">Responsive</Badge>
              <Badge variant="outline">PWA Ready</Badge>
              <Badge variant="outline">Offline Mode</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllRolesDashboard;
