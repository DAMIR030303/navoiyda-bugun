import React from "react";
import { Helmet } from "react-helmet-async";
import { Users, TrendingUp, Award, Plus } from "lucide-react";

const EmployeesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Xodimlar - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Xodimlar boshqaruvi va reytinglar
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Xodimlar ro'yxati, ularning KPI ko'rsatkichlari, ball tizimi va
              reytinglar
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={20} className="mr-2" />
            Yangi xodim
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jami xodimlar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  45
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  O'rtacha KPI
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  87%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
                <Award size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Top xodimlar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  12
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Faol xodimlar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  38
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top xodimlar ro'yxati
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">AK</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Aziza Karimova
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Marketing menejeri
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  KPI: 95%
                </p>
                <p className="text-sm text-green-600">Top performer</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">DR</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Dilshod Rahimov
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Loyiha menejeri
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  KPI: 92%
                </p>
                <p className="text-sm text-green-600">Excellent</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">MY</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Malika Yusupova
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sotuv menejeri
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  KPI: 89%
                </p>
                <p className="text-sm text-blue-600">Good</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Xodimlar reytingi
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Reyting grafiklari tez orada qo'shiladi
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesPage;
