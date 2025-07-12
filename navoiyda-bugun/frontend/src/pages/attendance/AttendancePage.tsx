import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  MapPin,
  QrCode,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Filter,
  Search,
  UserCheck,
  UserX,
  Timer,
  BarChart3,
  Eye,
  Edit,
  Plus,
  RefreshCw,
  Smartphone,
  Wifi,
  Shield,
  Activity,
  Target,
  Award,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Settings,
  Bell,
  X,
  Save,
  Camera,
  Navigation,
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: "present" | "absent" | "late" | "early_leave" | "half_day";
  workingHours: number;
  location: {
    checkIn: string | null;
    checkOut: string | null;
  };
  method: "qr" | "gps" | "manual" | "auto";
  notes: string;
  approvedBy: string | null;
}

interface Employee {
  id: string;
  name: string;
  avatar: string;
  department: string;
  position: string;
  workingHours: number;
  isActive: boolean;
  lastSeen: string;
}

interface AttendanceStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  averageCheckIn: string;
  monthlyAttendance: number;
  workingHoursThisMonth: number;
  overtimeHours: number;
}

const AttendancePage: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    averageCheckIn: "08:45",
    monthlyAttendance: 95,
    workingHoursThisMonth: 1240,
    overtimeHours: 32,
  });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Sample data
  useEffect(() => {
    const sampleEmployees: Employee[] = [
      {
        id: "1",
        name: "Aziz Karimov",
        avatar: "/api/placeholder/40/40",
        department: "IT",
        position: "Senior Developer",
        workingHours: 8,
        isActive: true,
        lastSeen: "2024-07-12T14:30:00Z",
      },
      {
        id: "2",
        name: "Malika Tosheva",
        avatar: "/api/placeholder/40/40",
        department: "Design",
        position: "UI/UX Designer",
        workingHours: 8,
        isActive: true,
        lastSeen: "2024-07-12T14:25:00Z",
      },
      {
        id: "3",
        name: "Bobur Rahimov",
        avatar: "/api/placeholder/40/40",
        department: "Management",
        position: "Project Manager",
        workingHours: 8,
        isActive: false,
        lastSeen: "2024-07-12T12:00:00Z",
      },
      {
        id: "4",
        name: "Dildora Nazarova",
        avatar: "/api/placeholder/40/40",
        department: "Analytics",
        position: "Data Analyst",
        workingHours: 8,
        isActive: true,
        lastSeen: "2024-07-12T14:35:00Z",
      },
      {
        id: "5",
        name: "Jasur Abdullayev",
        avatar: "/api/placeholder/40/40",
        department: "Sales",
        position: "Sales Manager",
        workingHours: 8,
        isActive: true,
        lastSeen: "2024-07-12T14:20:00Z",
      },
    ];

    const sampleRecords: AttendanceRecord[] = [
      {
        id: "1",
        employeeId: "1",
        employeeName: "Aziz Karimov",
        employeeAvatar: "/api/placeholder/40/40",
        date: selectedDate,
        checkInTime: "08:30",
        checkOutTime: "17:45",
        status: "present",
        workingHours: 9.25,
        location: {
          checkIn: "Ofis, Toshkent",
          checkOut: "Ofis, Toshkent",
        },
        method: "qr",
        notes: "",
        approvedBy: null,
      },
      {
        id: "2",
        employeeId: "2",
        employeeName: "Malika Tosheva",
        employeeAvatar: "/api/placeholder/40/40",
        date: selectedDate,
        checkInTime: "08:45",
        checkOutTime: null,
        status: "present",
        workingHours: 5.5,
        location: {
          checkIn: "Ofis, Toshkent",
          checkOut: null,
        },
        method: "gps",
        notes: "",
        approvedBy: null,
      },
      {
        id: "3",
        employeeId: "3",
        employeeName: "Bobur Rahimov",
        employeeAvatar: "/api/placeholder/40/40",
        date: selectedDate,
        checkInTime: null,
        checkOutTime: null,
        status: "absent",
        workingHours: 0,
        location: {
          checkIn: null,
          checkOut: null,
        },
        method: "manual",
        notes: "Kasallik sabab",
        approvedBy: "HR Manager",
      },
      {
        id: "4",
        employeeId: "4",
        employeeName: "Dildora Nazarova",
        employeeAvatar: "/api/placeholder/40/40",
        date: selectedDate,
        checkInTime: "09:15",
        checkOutTime: "18:00",
        status: "late",
        workingHours: 8.75,
        location: {
          checkIn: "Ofis, Toshkent",
          checkOut: "Ofis, Toshkent",
        },
        method: "auto",
        notes: "Transport muammosi",
        approvedBy: null,
      },
      {
        id: "5",
        employeeId: "5",
        employeeName: "Jasur Abdullayev",
        employeeAvatar: "/api/placeholder/40/40",
        date: selectedDate,
        checkInTime: "08:00",
        checkOutTime: "15:30",
        status: "early_leave",
        workingHours: 7.5,
        location: {
          checkIn: "Ofis, Toshkent",
          checkOut: "Ofis, Toshkent",
        },
        method: "qr",
        notes: "Shaxsiy ishlar",
        approvedBy: "Manager",
      },
    ];

    setEmployees(sampleEmployees);
    setAttendanceRecords(sampleRecords);

    // Calculate stats
    const presentToday = sampleRecords.filter(
      (r) =>
        r.status === "present" ||
        r.status === "late" ||
        r.status === "early_leave"
    ).length;
    const absentToday = sampleRecords.filter(
      (r) => r.status === "absent"
    ).length;
    const lateToday = sampleRecords.filter((r) => r.status === "late").length;

    setStats({
      totalEmployees: sampleEmployees.length,
      presentToday,
      absentToday,
      lateToday,
      averageCheckIn: "08:45",
      monthlyAttendance: 95,
      workingHoursThisMonth: 1240,
      overtimeHours: 32,
    });
  }, [selectedDate]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocationEnabled(true);
        },
        (error) => {
          console.error("Location error:", error);
          setIsLocationEnabled(false);
        }
      );
    }
  }, []);

  // Filter records
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || record.status === filterStatus;
    const matchesDepartment =
      filterDepartment === "all" ||
      employees.find((emp) => emp.id === record.employeeId)?.department ===
        filterDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200";
      case "absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "late":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "early_leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "half_day":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "absent":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "late":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "early_leave":
        return <Timer className="w-4 h-4 text-yellow-600" />;
      case "half_day":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "qr":
        return <QrCode className="w-4 h-4 text-blue-600" />;
      case "gps":
        return <MapPin className="w-4 h-4 text-green-600" />;
      case "manual":
        return <Edit className="w-4 h-4 text-orange-600" />;
      case "auto":
        return <Smartphone className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleCheckIn = (employeeId: string) => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);

    setAttendanceRecords((prev) =>
      prev.map((record) =>
        record.employeeId === employeeId && record.date === selectedDate
          ? {
              ...record,
              checkInTime: timeString,
              status: "present",
              method: isLocationEnabled ? "gps" : "manual",
              location: {
                ...record.location,
                checkIn: isLocationEnabled ? "Ofis, Toshkent" : "Manual entry",
              },
            }
          : record
      )
    );
  };

  const handleCheckOut = (employeeId: string) => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);

    setAttendanceRecords((prev) =>
      prev.map((record) =>
        record.employeeId === employeeId && record.date === selectedDate
          ? {
              ...record,
              checkOutTime: timeString,
              method: isLocationEnabled ? "gps" : "manual",
              location: {
                ...record.location,
                checkOut: isLocationEnabled ? "Ofis, Toshkent" : "Manual entry",
              },
            }
          : record
      )
    );
  };

  const handleQRScan = () => {
    setShowModal("qr-scanner");
  };

  const handleManualEntry = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModal("manual-entry");
  };

  const closeModal = () => {
    setShowModal(null);
    setSelectedEmployee(null);
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {showModal === "qr-scanner" && "QR Kod Skaner"}
              {showModal === "manual-entry" && "Qo'lda kiritish"}
              {showModal === "location-settings" && "Joylashuv sozlamalari"}
            </h3>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {showModal === "qr-scanner" && (
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">QR kod skanerini yoqish uchun</p>
                  <p className="text-sm text-gray-500">kamerani yoqing</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => {
                    // Handle QR scan
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Skanerlash
                </button>
              </div>
            </div>
          )}

          {showModal === "manual-entry" && selectedEmployee && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {selectedEmployee.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {selectedEmployee.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {selectedEmployee.department}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelish vaqti
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ketish vaqti
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Holat
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="present">Kelgan</option>
                    <option value="absent">Kelmagan</option>
                    <option value="late">Kechikkan</option>
                    <option value="early_leave">Erta ketgan</option>
                    <option value="half_day">Yarim kun</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Izoh
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Izoh kiriting..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => {
                    // Handle manual entry
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Saqlash
                </button>
              </div>
            </div>
          )}

          {showModal === "location-settings" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Navigation className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">GPS Joylashuv</h4>
                  <p className="text-sm text-gray-500">
                    {isLocationEnabled ? "Yoqilgan" : "O'chirilgan"}
                  </p>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => setIsLocationEnabled(!isLocationEnabled)}
                    className={`w-12 h-6 rounded-full ${
                      isLocationEnabled ? "bg-blue-500" : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        isLocationEnabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Ofis joylashuvi:
                </p>
                <p className="text-sm text-gray-600">Toshkent, O'zbekiston</p>
                <p className="text-xs text-gray-500">Radius: 100 metr</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Yopish
                </button>
                <button
                  onClick={() => {
                    // Handle location settings
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Saqlash
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Davomat - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Davomat nazorati
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Xodimlar davomatini boshqarish va nazorat qilish
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleQRScan}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              QR Skan
            </button>
            <button
              onClick={() => setShowModal("location-settings")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Sozlamalar
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
                  <Users size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Bugungi davomat
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.presentToday}/{stats.totalEmployees}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">
                  {Math.round(
                    (stats.presentToday / stats.totalEmployees) * 100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
                  <Clock size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    O'rtacha kelish
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.averageCheckIn}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Standart: 09:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600">
                  <AlertTriangle size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Kechikishlar
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.lateToday}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-600 font-medium">
                  {Math.round((stats.lateToday / stats.totalEmployees) * 100)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
                  <Calendar size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Oylik davomat
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.monthlyAttendance}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">+2.5%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tezkor harakatlar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={handleQRScan}
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <QrCode className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">QR Kod Skan</p>
                <p className="text-sm text-gray-500">Tezkor davomat</p>
              </div>
            </button>

            <button
              onClick={() => setShowModal("location-settings")}
              className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <MapPin className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">GPS Tracking</p>
                <p className="text-sm text-gray-500">Joylashuv nazorati</p>
              </div>
            </button>

            <button
              onClick={() => setShowModal("manual-entry")}
              className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Edit className="w-6 h-6 text-orange-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Qo'lda kiritish</p>
                <p className="text-sm text-gray-500">Manual entry</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Download className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Hisobot</p>
                <p className="text-sm text-gray-500">Excel export</p>
              </div>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Xodimlarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Barcha holatlar</option>
              <option value="present">Kelgan</option>
              <option value="absent">Kelmagan</option>
              <option value="late">Kechikkan</option>
              <option value="early_leave">Erta ketgan</option>
              <option value="half_day">Yarim kun</option>
            </select>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Barcha bo'limlar</option>
              <option value="IT">IT</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
              <option value="Analytics">Analytics</option>
              <option value="Sales">Sales</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Yangilash
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Davomat jadvali ({filteredRecords.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Xodim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Kelish
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ketish
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ish soatlari
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Holat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Usul
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Harakatlar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {record.employeeName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {record.employeeName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {
                              employees.find(
                                (emp) => emp.id === record.employeeId
                              )?.department
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {record.checkInTime || "-"}
                      </div>
                      {record.location.checkIn && (
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {record.location.checkIn}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {record.checkOutTime || "-"}
                      </div>
                      {record.location.checkOut && (
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {record.location.checkOut}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {record.workingHours}h
                      </div>
                      <div className="text-xs text-gray-500">Standart: 8h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {getStatusIcon(record.status)}
                        {record.status === "present"
                          ? "Kelgan"
                          : record.status === "absent"
                          ? "Kelmagan"
                          : record.status === "late"
                          ? "Kechikkan"
                          : record.status === "early_leave"
                          ? "Erta ketgan"
                          : "Yarim kun"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {getMethodIcon(record.method)}
                        <span className="text-sm text-gray-500">
                          {record.method === "qr"
                            ? "QR"
                            : record.method === "gps"
                            ? "GPS"
                            : record.method === "manual"
                            ? "Manual"
                            : "Auto"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {!record.checkInTime && (
                          <button
                            onClick={() => handleCheckIn(record.employeeId)}
                            className="text-green-600 hover:text-green-900 text-xs px-2 py-1 bg-green-100 rounded"
                          >
                            Kelish
                          </button>
                        )}
                        {record.checkInTime && !record.checkOutTime && (
                          <button
                            onClick={() => handleCheckOut(record.employeeId)}
                            className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 bg-blue-100 rounded"
                          >
                            Ketish
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleManualEntry(
                              employees.find(
                                (emp) => emp.id === record.employeeId
                              )!
                            )
                          }
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Hech qanday davomat ma'lumoti topilmadi
              </p>
            </div>
          )}
        </div>

        {/* Render Modal */}
        {renderModal()}
      </div>
    </>
  );
};

export default AttendancePage;
