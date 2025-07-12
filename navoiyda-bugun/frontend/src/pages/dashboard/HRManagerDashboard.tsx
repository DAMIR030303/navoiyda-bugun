import React, { useState } from "react";
import {
  Users,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserPlus,
  FileText,
  BarChart3,
  Star,
  Target,
  BookOpen,
} from "lucide-react";

const HRManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);

  const stats = [
    {
      title: "Jami xodimlar",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: Users,
      color: "blue",
    },
    {
      title: "Bugungi davomat",
      value: "142",
      change: "91%",
      changeType: "positive",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Kechikkanlar",
      value: "8",
      change: "-3",
      changeType: "positive",
      icon: Clock,
      color: "orange",
    },
    {
      title: "Yo'qlar",
      value: "6",
      change: "+2",
      changeType: "negative",
      icon: XCircle,
      color: "red",
    },
  ];

  const employees = [
    {
      id: 1,
      name: "Alisher Karimov",
      position: "Frontend Developer",
      department: "IT",
      attendance: "95%",
      kpi: 87,
      status: "active",
      lastSeen: "2 daqiqa oldin",
    },
    {
      id: 2,
      name: "Malika Tosheva",
      position: "Marketing Manager",
      department: "Marketing",
      attendance: "98%",
      kpi: 92,
      status: "active",
      lastSeen: "5 daqiqa oldin",
    },
    {
      id: 3,
      name: "Bobur Rahmonov",
      position: "Sales Manager",
      department: "Sales",
      attendance: "89%",
      kpi: 78,
      status: "leave",
      lastSeen: "1 kun oldin",
    },
    {
      id: 4,
      name: "Nodira Yusupova",
      position: "HR Specialist",
      department: "HR",
      attendance: "96%",
      kpi: 85,
      status: "active",
      lastSeen: "10 daqiqa oldin",
    },
  ];

  const attendanceData = [
    { day: "Dushanba", present: 145, absent: 11, late: 5 },
    { day: "Seshanba", present: 148, absent: 8, late: 3 },
    { day: "Chorshanba", present: 142, absent: 12, late: 8 },
    { day: "Payshanba", present: 150, absent: 6, late: 4 },
    { day: "Juma", present: 138, absent: 15, late: 9 },
  ];

  const developmentPrograms = [
    {
      id: 1,
      name: "Leadership Training",
      participants: 25,
      progress: 75,
      status: "active",
      startDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Technical Skills",
      participants: 40,
      progress: 60,
      status: "active",
      startDate: "2024-02-01",
    },
    {
      id: 3,
      name: "Communication Skills",
      participants: 30,
      progress: 90,
      status: "completed",
      startDate: "2024-01-01",
    },
  ];

  const handleViewEmployee = (employeeId: number) => {
    setSelectedEmployee(employeeId);
    // Xodim ma'lumotlarini ko'rish
  };

  const handleEditEmployee = (employeeId: number) => {
    setSelectedEmployee(employeeId);
    // Xodim ma'lumotlarini tahrirlash
  };

  const handleDeleteEmployee = (employeeId: number) => {
    if (window.confirm("Xodimni o'chirishga ishonchingiz komilmi?")) {
      // Xodimni o'chirish
      console.log("Xodim o'chirildi:", employeeId);
    }
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  const handleAddProgram = () => {
    setShowAddProgramModal(true);
  };

  const handleProgramDetails = (programId: number) => {
    // Dastur batafsil ma'lumotlari
    console.log("Dastur batafsil:", programId);
  };

  const handleEditProgram = (programId: number) => {
    // Dasturni tahrirlash
    console.log("Dastur tahrirlash:", programId);
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
                  <span className="text-sm text-gray-500 ml-1">bugun</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Haftalik davomat statistikasi
        </h3>
        <div className="space-y-4">
          {attendanceData.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900 w-20">
                  {day.day}
                </span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Kelgan: {day.present}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Kelmagan: {day.absent}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Kechikkan: {day.late}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">
                  {Math.round(
                    (day.present / (day.present + day.absent + day.late)) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Eng yaxshi xodimlar
        </h3>
        <div className="space-y-4">
          {employees.slice(0, 3).map((employee, index) => (
            <div
              key={employee.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {employee.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{employee.name}</p>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-gray-900">
                    {employee.kpi}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {employee.attendance} davomat
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Xodimlar ro'yxati
        </h3>
        <button
          onClick={handleAddEmployee}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yangi xodim</span>
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Xodim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bo'lim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Davomat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KPI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {employee.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.attendance}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900 mr-2">
                        {employee.kpi}
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${employee.kpi}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === "active"
                          ? "bg-green-100 text-green-800"
                          : employee.status === "leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.status === "active"
                        ? "Faol"
                        : employee.status === "leave"
                        ? "Ta'tilda"
                        : "Faol emas"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewEmployee(employee.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Ko'rish
                    </button>
                    <button
                      onClick={() => handleEditEmployee(employee.id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Tahrirlash
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      O'chirish
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

  const renderDevelopment = () => (
    <div className="space-y-6">
      {/* Development Programs */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Rivojlanish dasturlari
        </h3>
        <button
          onClick={handleAddProgram}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Yangi dastur</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developmentPrograms.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {program.name}
              </h4>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  program.status === "active"
                    ? "bg-green-100 text-green-800"
                    : program.status === "completed"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {program.status === "active"
                  ? "Faol"
                  : program.status === "completed"
                  ? "Tugallangan"
                  : "Kutilmoqda"}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ishtirokchilar:</span>
                <span className="font-medium">{program.participants}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Boshlangan:</span>
                <span className="font-medium">{program.startDate}</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Jarayon:</span>
                  <span className="font-medium">{program.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${program.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleProgramDetails(program.id)}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Batafsil
              </button>
              <button
                onClick={() => handleEditProgram(program.id)}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Tahrirlash
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Umumiy ko'rinish", icon: BarChart3 },
    { id: "employees", label: "Xodimlar", icon: Users },
    { id: "development", label: "Rivojlanish", icon: BookOpen },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">HR Menejer Paneli</h1>
        <p className="text-green-100 text-lg">
          Xodimlar boshqaruvi va rivojlanish monitoring
        </p>
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
          {activeTab === "employees" && renderEmployees()}
          {activeTab === "development" && renderDevelopment()}
        </div>
      </div>
    </div>
  );
};

export default HRManagerDashboard;
