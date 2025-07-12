import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Smartphone,
  CreditCard,
  ArrowRight,
  Sparkles,
  Shield,
} from "lucide-react";

const LoginPage: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<
    "username" | "email" | "telegram" | "employee_id"
  >("username");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let credentials;
    switch (authMethod) {
      case "email":
        credentials = { email, password };
        break;
      case "employee_id":
        credentials = { employeeId, password };
        break;
      default:
        credentials = { username, password };
    }

    await login(credentials);
  };

  const authMethods = [
    { key: "username", label: "Foydalanuvchi nomi", icon: User },
    { key: "email", label: "Email", icon: Mail },
    { key: "telegram", label: "Telegram", icon: Smartphone },
    { key: "employee_id", label: "Xodim ID", icon: CreditCard },
  ];

  return (
    <>
      <Helmet>
        <title>Kirish - Navoiyda Bugun</title>
        <meta
          name="description"
          content="Navoiyda Bugun boshqaruv tizimiga kirish"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="w-full max-w-md relative">
          {/* Main Login Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            {/* Card Header Gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Navoiyda Bugun
              </h1>
              <p className="text-gray-600">Boshqaruv tizimiga kirish</p>
            </div>

            {/* Auth Method Selector */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                {authMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <button
                      key={method.key}
                      type="button"
                      onClick={() => setAuthMethod(method.key as any)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        authMethod === method.key
                          ? "bg-white shadow-md text-blue-600 scale-105"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{method.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {authMethod === "username" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Foydalanuvchi nomi
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Foydalanuvchi nomini kiriting"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>
              )}

              {authMethod === "email" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email manzil
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email manzilingizni kiriting"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
              )}

              {authMethod === "employee_id" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Xodim ID
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="employee_id"
                      name="employee_id"
                      type="text"
                      placeholder="Xodim ID ni kiriting"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      autoComplete="employee-id"
                      required
                    />
                  </div>
                </div>
              )}

              {authMethod !== "telegram" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Parol
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Parolni kiriting"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Meni eslab qol</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Parolni unutdingizmi?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Kirish</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Demo hisoblar:
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>Founder:</strong> founder / 123456
                </p>
                <p>
                  <strong>CEO:</strong> ceo / 123456
                </p>
                <p>
                  <strong>HR:</strong> hr_manager / 123456
                </p>
                <p>
                  <strong>Admin:</strong> admin / 123456
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
