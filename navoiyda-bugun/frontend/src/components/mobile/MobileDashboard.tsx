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
} from "lucide-react";

interface MobileDashboardProps {
  userRole: string;
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({ userRole }) => {
  const getDashboardData = () => {
    switch (userRole) {
      case "founder":
        return {
          title: "Asoschi Dashboard",
          stats: [
            {
              label: "Umumiy daromad",
              value: "$450",
              icon: DollarSign,
              color: "text-green-600",
            },
            {
              label: "Xodimlar",
              value: "12",
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
              label: "Ishlatilgan vaqt",
              value: "8.5h",
              icon: Clock,
              color: "text-orange-600",
            },
          ],
          features: [
            {
              icon: QrCode,
              title: "QR kod orqali davomat",
              desc: "Tezkor davomat belgilash",
            },
            {
              icon: Camera,
              title: "Kamera skanerlash",
              desc: "Hujjatlarni skanerlash",
            },
            {
              icon: MapPin,
              title: "Geolokatsiya",
              desc: "Joylashuvni aniqlash",
            },
            { icon: Wifi, title: "Oflayn rejim", desc: "Internetisiz ishlash" },
          ],
        };
      case "ceo":
        return {
          title: "CEO Dashboard",
          stats: [
            {
              label: "Oylik maqsad",
              value: "85%",
              icon: TrendingUp,
              color: "text-green-600",
            },
            {
              label: "Faol loyihalar",
              value: "7",
              icon: Users,
              color: "text-blue-600",
            },
            {
              label: "Bugungi vazifalar",
              value: "12",
              icon: Clock,
              color: "text-orange-600",
            },
            {
              label: "Xarajatlar",
              value: "$2.1K",
              icon: DollarSign,
              color: "text-red-600",
            },
          ],
          features: [
            {
              icon: QrCode,
              title: "QR davomat nazorati",
              desc: "Xodimlar davomatini kuzatish",
            },
            {
              icon: Camera,
              title: "Hisobot skaneri",
              desc: "Hisobotlarni tez yuklash",
            },
            {
              icon: MapPin,
              title: "Filiallar xaritasi",
              desc: "Barcha filiallarni ko'rish",
            },
            {
              icon: Wifi,
              title: "Sinxronizatsiya",
              desc: "Ma'lumotlarni sinxronlash",
            },
          ],
        };
      case "marketing":
        return {
          title: "Marketing Dashboard",
          stats: [
            {
              label: "ROI",
              value: "245%",
              icon: TrendingUp,
              color: "text-green-600",
            },
            {
              label: "Followers",
              value: "15.4K",
              icon: Users,
              color: "text-blue-600",
            },
            {
              label: "Kampaniyalar",
              value: "8",
              icon: Clock,
              color: "text-purple-600",
            },
            {
              label: "Budget",
              value: "$5.2K",
              icon: DollarSign,
              color: "text-orange-600",
            },
          ],
          features: [
            {
              icon: QrCode,
              title: "QR kampaniya",
              desc: "QR kod bilan marketing",
            },
            {
              icon: Camera,
              title: "Kontent yaratish",
              desc: "Foto va video yaratish",
            },
            {
              icon: MapPin,
              title: "Geo targeting",
              desc: "Joylashuv bo'yicha reklama",
            },
            { icon: Wifi, title: "Social media", desc: "Ijtimoiy tarmoqlar" },
          ],
        };
      default:
        return {
          title: "Xodim Dashboard",
          stats: [
            {
              label: "Bajarilgan vazifalar",
              value: "8",
              icon: Clock,
              color: "text-green-600",
            },
            {
              label: "Haftalik soatlar",
              value: "35h",
              icon: TrendingUp,
              color: "text-blue-600",
            },
            {
              label: "Kurslar",
              value: "3",
              icon: Users,
              color: "text-purple-600",
            },
            {
              label: "Ball",
              value: "92",
              icon: DollarSign,
              color: "text-orange-600",
            },
          ],
          features: [
            {
              icon: QrCode,
              title: "QR davomat",
              desc: "Tezkor davomat belgilash",
            },
            {
              icon: Camera,
              title: "Vazifa fotosi",
              desc: "Vazifa natijasini yuklash",
            },
            { icon: MapPin, title: "Ish joyi", desc: "Ish joyini belgilash" },
            {
              icon: Wifi,
              title: "Oflayn ishlash",
              desc: "Internetisiz vazifalar",
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

        {/* Mobil Xususiyatlar */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              Mobil Xususiyatlar
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

export default MobileDashboard;
