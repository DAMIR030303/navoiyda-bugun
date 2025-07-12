import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Plus,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  Zap,
  Star,
  Gift,
  Rocket,
  Heart,
  Trophy,
} from "lucide-react";

const QuickActions: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (action: string) => {
    setLoading(action);
    // Simulate API call
    setTimeout(() => {
      setLoading(null);
      alert(`${action} amalga oshirildi! ✅`);
    }, 2000);
  };

  const quickActions = [
    {
      id: "new-project",
      title: "Yangi Loyiha",
      description: "Yangi loyiha yaratish",
      icon: <Plus className="w-5 h-5" />,
      variant: "gradient" as const,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "add-employee",
      title: "Xodim Qo'shish",
      description: "Yangi xodim ro'yxatga olish",
      icon: <Users className="w-5 h-5" />,
      variant: "success" as const,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "schedule-meeting",
      title: "Yig'ilish Belgilash",
      description: "Yangi yig'ilish rejalashtirish",
      icon: <Calendar className="w-5 h-5" />,
      variant: "warning" as const,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "send-announcement",
      title: "E'lon Yuborish",
      description: "Barcha xodimlarga xabar",
      icon: <MessageSquare className="w-5 h-5" />,
      variant: "outline" as const,
      color: "from-indigo-500 to-blue-600",
    },
    {
      id: "view-analytics",
      title: "Analitika",
      description: "Hisobotlar va statistika",
      icon: <BarChart3 className="w-5 h-5" />,
      variant: "secondary" as const,
      color: "from-gray-500 to-slate-600",
    },
    {
      id: "premium-feature",
      title: "Premium Xususiyat",
      description: "Maxsus funksiyalar",
      icon: <Star className="w-5 h-5" />,
      variant: "premium" as const,
      color: "from-purple-500 via-pink-500 to-blue-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Tezkor Amallar</h3>
            <p className="text-sm text-gray-600">
              Eng ko'p ishlatiladigan funksiyalar
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white`}
              >
                {action.icon}
              </div>
              {action.variant === "premium" && (
                <div className="flex items-center gap-1 text-xs font-medium text-purple-600">
                  <Trophy className="w-3 h-3" />
                  Premium
                </div>
              )}
            </div>

            <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
            <p className="text-sm text-gray-600 mb-4">{action.description}</p>

            <Button
              variant={action.variant}
              size="sm"
              className="w-full"
              loading={loading === action.id}
              leftIcon={
                action.variant === "premium" ? (
                  <Gift className="w-4 h-4" />
                ) : undefined
              }
              rightIcon={
                action.variant === "gradient" ? (
                  <Rocket className="w-4 h-4" />
                ) : undefined
              }
              onClick={() => handleAction(action.title)}
            >
              {loading === action.id ? "Yuklanmoqda..." : "Boshlash"}
            </Button>
          </div>
        ))}
      </div>

      {/* Yangi funksiyalar banner */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-purple-600" />
            <div>
              <h4 className="font-semibold text-purple-900">
                Yangi funksiyalar qo'shildi!
              </h4>
              <p className="text-sm text-purple-700">
                Premium tugmalar, loading animatsiyalar va ko'plab yangiliklar
              </p>
            </div>
          </div>
          <Button variant="gradient" size="sm">
            Ko'rish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
