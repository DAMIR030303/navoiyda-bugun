import React, { useState } from "react";
import {
  DollarSign,
  Users,
  TrendingUp,
  ShoppingCart,
  Target,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Plus,
  Filter,
  Search,
  BarChart3,
  FileText,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const SalesManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Jami sotuv",
      value: "$125,430",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Faol mijozlar",
      value: "342",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "blue",
    },
    {
      title: "Oylik maqsad",
      value: "87%",
      change: "+12%",
      changeType: "positive",
      icon: Target,
      color: "purple",
    },
    {
      title: "Buyurtmalar",
      value: "156",
      change: "+23%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "orange",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Alisher Karimov",
      company: "Tech Solutions LLC",
      email: "alisher@techsolutions.uz",
      phone: "+998901234567",
      status: "active",
      lastOrder: "2024-01-15",
      totalSpent: 15000,
      orders: 8,
      source: "Website",
    },
    {
      id: 2,
      name: "Malika Tosheva",
      company: "Digital Marketing Pro",
      email: "malika@digitalmarketing.uz",
      phone: "+998901234568",
      status: "prospect",
      lastOrder: "2024-01-10",
      totalSpent: 8500,
      orders: 3,
      source: "Referral",
    },
    {
      id: 3,
      name: "Bobur Rahmonov",
      company: "Construction Group",
      email: "bobur@construction.uz",
      phone: "+998901234569",
      status: "lead",
      lastOrder: null,
      totalSpent: 0,
      orders: 0,
      source: "Social Media",
    },
    {
      id: 4,
      name: "Nodira Yusupova",
      company: "Fashion Boutique",
      email: "nodira@fashion.uz",
      phone: "+998901234570",
      status: "active",
      lastOrder: "2024-01-18",
      totalSpent: 22000,
      orders: 12,
      source: "Direct",
    },
  ];

  const salesPipeline = [
    {
      stage: "Yangi lead",
      count: 45,
      value: "$67,500",
      color: "blue",
    },
    {
      stage: "Aloqa",
      count: 28,
      value: "$42,000",
      color: "yellow",
    },
    {
      stage: "Taklif",
      count: 15,
      value: "$37,500",
      color: "orange",
    },
    {
      stage: "Muzokara",
      count: 8,
      value: "$28,000",
      color: "purple",
    },
    {
      stage: "Yopilgan",
      count: 12,
      value: "$45,000",
      color: "green",
    },
  ];

  const recentOrders = [
    {
      id: 1,
      customer: "Alisher Karimov",
      product: "Web Development Package",
      amount: 5000,
      status: "completed",
      date: "2024-01-20",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 2,
      customer: "Malika Tosheva",
      product: "Marketing Campaign",
      amount: 2500,
      status: "pending",
      date: "2024-01-19",
      paymentMethod: "Credit Card",
    },
    {
      id: 3,
      customer: "Nodira Yusupova",
      product: "E-commerce Platform",
      amount: 8000,
      status: "processing",
      date: "2024-01-18",
      paymentMethod: "PayPal",
    },
    {
      id: 4,
      customer: "Bobur Rahmonov",
      product: "Consultation Service",
      amount: 500,
      status: "completed",
      date: "2024-01-17",
      paymentMethod: "Cash",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Web Development Package",
      sales: 45,
      revenue: "$225,000",
      growth: "+25%",
    },
    {
      id: 2,
      name: "Marketing Campaign",
      sales: 32,
      revenue: "$96,000",
      growth: "+18%",
    },
    {
      id: 3,
      name: "E-commerce Platform",
      sales: 28,
      revenue: "$168,000",
      growth: "+12%",
    },
    {
      id: 4,
      name: "Consultation Service",
      sales: 67,
      revenue: "$33,500",
      growth: "+8%",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "prospect":
        return "bg-blue-100 text-blue-800";
      case "lead":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">bu oy</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Pipeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sotuv voronkasi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {salesPipeline.map((stage, index) => (
            <div key={index} className="text-center">
              <div className={`bg-${stage.color}-100 rounded-lg p-4 mb-2`}>
                <div
                  className={`w-12 h-12 bg-${stage.color}-500 rounded-full flex items-center justify-center mx-auto mb-2`}
                >
                  <span className="text-white font-bold">{stage.count}</span>
                </div>
                <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                <p className="text-sm text-gray-600 mt-1">{stage.value}</p>
              </div>
              {index < salesPipeline.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-400"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          So'nggi buyurtmalar
        </h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.product}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${order.amount.toLocaleString()}
                </p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getOrderStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status === "completed"
                      ? "Tugallangan"
                      : order.status === "processing"
                      ? "Jarayonda"
                      : order.status === "pending"
                      ? "Kutilmoqda"
                      : "Bekor qilingan"}
                  </span>
                  <span className="text-sm text-gray-500">{order.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Eng ko'p sotiladigan mahsulotlar
        </h3>
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">
                  {product.sales} ta sotilgan
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{product.revenue}</p>
                <p className="text-sm text-green-600">{product.growth}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Mijozlar bazasi</h3>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Yangi mijoz</span>
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mijoz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aloqa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jami xarid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyurtmalar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status === "active"
                        ? "Faol"
                        : customer.status === "prospect"
                        ? "Potensial"
                        : customer.status === "lead"
                        ? "Lead"
                        : "Faol emas"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${customer.totalSpent.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.orders}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Buyurtmalar</h3>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Yangi buyurtma</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyurtma ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mijoz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mahsulot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Miqdor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sana
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #ORD-{order.id.toString().padStart(4, "0")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.customer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${order.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status === "completed"
                        ? "Tugallangan"
                        : order.status === "processing"
                        ? "Jarayonda"
                        : order.status === "pending"
                        ? "Kutilmoqda"
                        : "Bekor qilingan"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Umumiy ko'rinish", icon: BarChart3 },
    { id: "customers", label: "Mijozlar", icon: Users },
    { id: "orders", label: "Buyurtmalar", icon: ShoppingCart },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Sotuv Menejer Paneli</h1>
        <p className="text-orange-100 text-lg">Mijozlar va sotuv boshqaruvi</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "customers" && renderCustomers()}
          {activeTab === "orders" && renderOrders()}
        </div>
      </div>
    </div>
  );
};

export default SalesManagerDashboard;
