import React from "react";
import { Helmet } from "react-helmet-async";
import { TrendingUp, Activity, CheckSquare, Users } from "lucide-react";

const OperationsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Operatsion ko'rsatkichlar - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Joriy operatsion ko'rsatkichlar
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              KPI ko'rsatkichlari, tahliliy grafiklar va diagrammalar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Operatsion xarajatlar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  45M so'm
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                <Activity size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Loyihalar progressi
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  78%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                <CheckSquare size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Vazifalar bajarilishi
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  86%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Xodimlar faolligi
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  94%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Loyihalar holati
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Marketing kampaniyasi
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status: Faol
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  85%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Yangi mahsulot ishlab chiqish
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status: Jarayonda
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  65%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Mijozlar sodiqlik dasturi
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status: Rejalashtirilgan
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  25%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Bo'limlar samaradorligi
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Marketing
              </h4>
              <p className="text-2xl font-bold text-green-600">92%</p>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Sotuv
              </h4>
              <p className="text-2xl font-bold text-blue-600">88%</p>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Kontent
              </h4>
              <p className="text-2xl font-bold text-purple-600">85%</p>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">HR</h4>
              <p className="text-2xl font-bold text-orange-600">90%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            So'nggi hisobotlar
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Haftalik marketing hisoboti
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2 soat oldin
                </p>
              </div>
              <span className="text-sm text-blue-600">Ko'rish</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Sotuv ko'rsatkichlari tahlili
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1 kun oldin
                </p>
              </div>
              <span className="text-sm text-blue-600">Ko'rish</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Xodimlar samaradorligi hisoboti
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  3 kun oldin
                </p>
              </div>
              <span className="text-sm text-blue-600">Ko'rish</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OperationsPage;
