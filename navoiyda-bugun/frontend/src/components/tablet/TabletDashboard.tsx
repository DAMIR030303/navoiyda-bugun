import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  CreditCard,
  TrendingUp,
  Users,
  Settings,
  Grid3X3,
  Monitor,
  Smartphone,
  RefreshCw,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface TabletDashboardProps {
  userRole: string;
}

const TabletDashboard: React.FC<TabletDashboardProps> = ({ userRole }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Planshet Ko'rinish
        </h1>
        <p className="text-center text-gray-600">
          Keng ekrandan samarali foydalanish uchun optimallashtirilgan interfeys
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Planshet Interfeysi */}
        <div className="space-y-6">
          <Card className="p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl flex items-center">
                <Monitor className="mr-3 text-blue-600" size={24} />
                Planshet Interfeysi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mock Planshet Screen */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Side - Cards */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">My Cards</span>
                        <Settings size={16} className="text-gray-400" />
                      </div>
                      <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg p-3 text-white mb-2">
                        <div className="text-lg font-bold">USD 10,000.00</div>
                        <div className="text-xs opacity-80">
                          **** **** **** 1234
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-lg p-3 text-white">
                        <div className="text-lg font-bold">USD 8,000.00</div>
                        <div className="text-xs opacity-80">
                          **** **** **** 5678
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Transactions */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">
                          Transactions
                        </span>
                        <Badge className="bg-blue-500 text-white">Pro</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">General Budget</span>
                          <span className="text-xs font-medium">-$18.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Bank Transfer</span>
                          <span className="text-xs font-medium text-green-600">
                            +$2,570
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black rounded-lg p-4 text-white">
                      <div className="text-xs mb-2">Bank Transfer</div>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                          >
                            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Badge variant="secondary" className="text-blue-600">
                  Keng Ekrandan Foydalanish
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="space-y-6">
          {/* Asosiy Xususiyatlar */}
          <Card className="p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl flex items-center">
                <Grid3X3 className="mr-3 text-blue-600" size={24} />
                Asosiy Xususiyatlar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="text-blue-600 mr-3" size={20} />
                  <div className="flex-1">
                    <div className="font-medium">
                      Chap tomonda vertikal navigatsiya paneli
                    </div>
                    <div className="text-sm text-gray-600">
                      Asosiy bo'limlar tezkor kirish
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="text-green-600 mr-3" size={20} />
                  <div className="flex-1">
                    <div className="font-medium">
                      Katta ekranda ko'proq ma'lumotlarni ko'rsatish
                    </div>
                    <div className="text-sm text-gray-600">
                      2-3 ustun layout
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <CheckCircle className="text-purple-600 mr-3" size={20} />
                  <div className="flex-1">
                    <div className="font-medium">
                      Jadvallar va grafiklarni to'liq ko'rinishda namoyish etish
                    </div>
                    <div className="text-sm text-gray-600">
                      Keng formatda ma'lumotlar
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <CheckCircle className="text-orange-600 mr-3" size={20} />
                  <div className="flex-1">
                    <div className="font-medium">
                      Bir vaqtning o'zida bir nechta modullarni ko'rish
                      imkoniyati
                    </div>
                    <div className="text-sm text-gray-600">
                      Multi-panel view
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tugmalar Joylashuvi */}
          <Card className="p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl flex items-center">
                <Monitor className="mr-3 text-blue-600" size={24} />
                Tugmalar Joylashuvi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <ArrowRight className="text-blue-600 mr-3" size={16} />
                    <span className="font-medium">Asosiy navigatsiya</span>
                  </div>
                  <Badge variant="outline">Chap tomonda vertikal panel</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <ArrowRight className="text-green-600 mr-3" size={16} />
                    <span className="font-medium">Qo'shimcha tugmalar</span>
                  </div>
                  <Badge variant="outline">
                    Yuqori qismda gorizontal joylashgan
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <ArrowRight className="text-purple-600 mr-3" size={16} />
                    <span className="font-medium">Amallar tugmalari</span>
                  </div>
                  <Badge variant="outline">O'ng tomonda joylashgan</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobil va Planshet Sinxronizatsiyasi */}
          <Card className="p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl flex items-center">
                <RefreshCw className="mr-3 text-blue-600" size={24} />
                Mobil va Planshet Sinxronizatsiyasi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                Foydalanuvchilar bir xil akkauntdan turli qurilmalarda
                foydalanishlari mumkin, barcha ma'lumotlar avtomatik ravishda
                sinxronizatsiya qilinadi.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Smartphone
                    className="mx-auto text-blue-600 mb-2"
                    size={32}
                  />
                  <div className="font-medium">Mobil</div>
                  <div className="text-sm text-gray-600">Touch optimized</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Monitor className="mx-auto text-purple-600 mb-2" size={32} />
                  <div className="font-medium">Planshet</div>
                  <div className="text-sm text-gray-600">
                    Wide screen layout
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Button className="w-full">
                  <RefreshCw className="mr-2" size={16} />
                  Sinxronizatsiya Sozlamalari
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TabletDashboard;
