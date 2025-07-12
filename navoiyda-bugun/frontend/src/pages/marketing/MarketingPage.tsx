import React from "react";
import { Helmet } from "react-helmet-async";
import { BarChart3, Image, TrendingUp, Users } from "lucide-react";

const MarketingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Marketing - Navoiyda Bugun</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Marketing boshqaruvi
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Kampaniyalar, ijtimoiy tarmoqlar, kontent va analitika
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                <BarChart3 size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Kampaniyalar soni
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  8
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                <Image size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Ijtimoiy tarmoqlar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  5
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  ROI
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  156%
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
                  Auditoriya
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  12,500
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Faol kampaniyalar
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Yangi mahsulot kampaniyasi
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status: Faol
                </p>
              </div>
              <span className="text-sm text-blue-600">Ko'rish</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Email marketing
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status: Jarayonda
                </p>
              </div>
              <span className="text-sm text-blue-600">Ko'rish</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  SEO optimizatsiya
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status: Rejalashtirilgan
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

export default MarketingPage;
