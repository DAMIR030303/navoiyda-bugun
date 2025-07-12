import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Target,
  DollarSign,
  Crown,
  Users,
  BarChart3,
  Activity,
  ArrowUp,
} from "lucide-react";

const FounderDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Asoschi Dashboard</h1>
            <p className="text-yellow-100 text-lg">
              Kompaniya boshqaruvi va strategik ko'rsatkichlar
            </p>
          </div>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
              <ArrowUp className="w-3 h-3" />
              15.2%
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-600">
                Jami daromad
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                125,000,000 so'm
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Maqsad: 150,000,000 so'm</span>
                <span>83%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: "83%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
              <ArrowUp className="w-3 h-3" />
              3.8%
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-600">
                Foyda marginali
              </h3>
              <p className="text-2xl font-bold text-gray-900">68.5%</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Maqsad: 75%</span>
                <span>91%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: "91%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
              <ArrowUp className="w-3 h-3" />
              12.4%
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-600">
                Mijozlar soni
              </h3>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Maqsad: 3,000</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-purple-500 transition-all duration-500"
                  style={{ width: "95%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
              <ArrowUp className="w-3 h-3" />
              2.1%
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-600">
                Bozor ulushi
              </h3>
              <p className="text-2xl font-bold text-gray-900">23.7%</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Maqsad: 30%</span>
                <span>79%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-orange-500 transition-all duration-500"
                  style={{ width: "79%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/strategy"
          className="group bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Strategik rejalar</h3>
              <p className="text-purple-100 text-sm">Uzoq muddatli maqsadlar</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">12 ta faol reja</span>
            <ArrowUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/operations"
          className="group bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Operatsiyalar</h3>
              <p className="text-blue-100 text-sm">Kundalik jarayonlar</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">87% samaradorlik</span>
            <ArrowUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/reports"
          className="group bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Executive hisobotlar</h3>
              <p className="text-green-100 text-sm">Boshqaruv analitikasi</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Yangi hisobotlar</span>
            <BarChart3 className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Tezkor ma'lumotlar
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">45</p>
            <p className="text-sm text-gray-600">Xodimlar</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Faol loyihalar</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">94.5%</p>
            <p className="text-sm text-gray-600">Mijoz mamnuniyati</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">87.3%</p>
            <p className="text-sm text-gray-600">Samaradorlik</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
