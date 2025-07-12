import React from "react";
import { Helmet } from "react-helmet-async";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

const StatisticsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Statistika - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Barcha bo'limlar statistikasi
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Xodimlar samaradorligi, davomat, marketing kampaniyalar va sotuv
              ko'rsatkichlari
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Xodimlar samaradorligi
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  92%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                <BarChart3 size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Davomat ko'rsatkichi
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
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Marketing ROI
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  156%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600">
                <DollarSign size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Sotuv hajmi
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  125M so'm
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            KPI ko'rsatkichlari dinamikasi (so'nggi 6 oy)
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Grafiklar tez orada qo'shiladi
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daromad va xarajatlar (so'nggi 6 oy)
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Moliyaviy grafiklar tez orada qo'shiladi
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsPage;
