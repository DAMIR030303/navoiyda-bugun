import React from "react";
import { Helmet } from "react-helmet-async";
import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const FinancePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Moliya - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Moliyaviy ko'rsatkichlar
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Daromad va xarajatlar, byudjet rejalashtirish, moliyaviy
              prognozlar va tahlillar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jami daromad
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  125M so'm
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600">
                <TrendingDown size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jami xarajatlar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  85M so'm
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                <DollarSign size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Sof foyda
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  40M so'm
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
                <BarChart3 size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Foyda marjasi
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  32%
                </p>
              </div>
            </div>
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Byudjet rejalashtirish
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Marketing byudjeti
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rejalashtirilgan: 15M so'm
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Sarflangan: 12M so'm
                </p>
                <p className="text-sm text-green-600">80%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Xodimlar byudjeti
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rejalashtirilgan: 45M so'm
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Sarflangan: 42M so'm
                </p>
                <p className="text-sm text-yellow-600">93%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Operatsion xarajatlar
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rejalashtirilgan: 25M so'm
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Sarflangan: 23M so'm
                </p>
                <p className="text-sm text-green-600">92%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancePage;
