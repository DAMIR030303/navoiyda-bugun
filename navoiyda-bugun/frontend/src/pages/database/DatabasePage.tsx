import React from "react";
import { Helmet } from "react-helmet-async";

const DatabasePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Ma'lumotlar bazasi - Navoiyda Bugun</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ma'lumotlar bazasi
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ma'lumotlar bazasi sahifasi
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ma'lumotlar bazasi ma'lumotlari
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Ma'lumotlar bazasi ma'lumotlari tez orada qo'shiladi
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatabasePage;
