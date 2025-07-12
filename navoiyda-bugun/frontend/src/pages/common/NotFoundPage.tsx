import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Sahifa topilmadi</h2>
      <p className="text-gray-600 mb-6">Siz qidirayotgan sahifa mavjud emas</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default NotFoundPage;
