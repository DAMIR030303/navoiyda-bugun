import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Target,
  Zap,
  Brain,
  Eye,
  RefreshCw,
  Filter,
  Download,
  Share2,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react";
import AnalyticsChart from "../../components/charts/AnalyticsChart";

interface MetricCard {
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
  color: string;
  trend: number[];
}

interface PredictionData {
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: "up" | "down" | "stable";
  timeframe: string;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: "opportunity" | "risk" | "trend" | "optimization";
  confidence: number;
  impact: "high" | "medium" | "low";
  actionable: boolean;
  timestamp: Date;
}

const AdvancedAnalyticsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "day" | "week" | "month" | "quarter"
  >("week");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);

  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: "Umumiy daromad",
      value: "2.4M so'm",
      change: 12.5,
      changeType: "increase",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-green-500",
      trend: [100, 120, 110, 140, 130, 160, 150],
    },
    {
      title: "Faol foydalanuvchilar",
      value: "1,234",
      change: 8.2,
      changeType: "increase",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500",
      trend: [800, 850, 900, 950, 1000, 1100, 1200],
    },
    {
      title: "Konversiya darajasi",
      value: "3.2%",
      change: -2.1,
      changeType: "decrease",
      icon: <Target className="w-6 h-6" />,
      color: "bg-orange-500",
      trend: [4.2, 4.0, 3.8, 3.5, 3.3, 3.2, 3.2],
    },
    {
      title: "Xodimlar samaradorligi",
      value: "87%",
      change: 5.3,
      changeType: "increase",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-purple-500",
      trend: [80, 82, 84, 85, 86, 87, 87],
    },
  ]);

  const [predictions, setPredictions] = useState<PredictionData[]>([
    {
      metric: "Daromad",
      currentValue: 2400000,
      predictedValue: 2850000,
      confidence: 85,
      trend: "up",
      timeframe: "Keyingi oy",
    },
    {
      metric: "Foydalanuvchilar",
      currentValue: 1234,
      predictedValue: 1456,
      confidence: 78,
      trend: "up",
      timeframe: "Keyingi oy",
    },
    {
      metric: "Konversiya",
      currentValue: 3.2,
      predictedValue: 3.8,
      confidence: 72,
      trend: "up",
      timeframe: "Keyingi oy",
    },
  ]);

  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: "1",
      title: "Marketing kampaniyasi samaradorligi",
      description:
        "Instagram reklamasi 23% yuqori konversiya ko'rsatmoqda. Byudjetni oshirish tavsiya etiladi.",
      type: "opportunity",
      confidence: 92,
      impact: "high",
      actionable: true,
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
      id: "2",
      title: "Xodimlar ish faolligida pasayish",
      description:
        "Oxirgi 2 haftada xodimlar produktivligi 8% kamaygan. HR bilan maslahatlashish kerak.",
      type: "risk",
      confidence: 87,
      impact: "medium",
      actionable: true,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "3",
      title: "Sezonli trend aniqlandi",
      description:
        "Oyning oxirida sotuv 15% oshadi. Inventar zaxirasini oshirish mumkin.",
      type: "trend",
      confidence: 79,
      impact: "medium",
      actionable: true,
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: "4",
      title: "Tizim optimizatsiyasi",
      description:
        "Ma'lumotlar bazasi so'rovlarini optimizatsiya qilish orqali 12% tezlik oshirish mumkin.",
      type: "optimization",
      confidence: 95,
      impact: "high",
      actionable: true,
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
    },
  ]);

  // Real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    let interval: NodeJS.Timeout;
    if (realTimeEnabled) {
      interval = setInterval(() => {
        setLastUpdated(new Date());
        // Simulate metric updates
        setMetrics((prev) =>
          prev.map((metric) => ({
            ...metric,
            change: metric.change + (Math.random() - 0.5) * 2,
          }))
        );
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [realTimeEnabled]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("UZS", "so'm");
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "risk":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "trend":
        return <Activity className="w-5 h-5 text-blue-500" />;
      case "optimization":
        return <Zap className="w-5 h-5 text-purple-500" />;
      default:
        return <Eye className="w-5 h-5 text-gray-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-l-green-500 bg-green-50";
      case "risk":
        return "border-l-red-500 bg-red-50";
      case "trend":
        return "border-l-blue-500 bg-blue-50";
      case "optimization":
        return "border-l-purple-500 bg-purple-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-orange-100 text-orange-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-32 bg-gray-200 rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Ilg'or Analitika - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Ilg'or Analitika</h1>
                <p className="text-indigo-100 text-lg">
                  AI-powered insights va real-time prognozlash
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-indigo-100 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Oxirgi yangilanish: {lastUpdated.toLocaleTimeString("uz-UZ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRealTimeEnabled(!realTimeEnabled)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    realTimeEnabled
                      ? "bg-white/20 hover:bg-white/30"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${
                      realTimeEnabled ? "animate-spin" : ""
                    }`}
                  />
                  Real-time
                </button>
                <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Vaqt oralig'i:
            </span>
            {(["day", "week", "month", "quarter"] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {timeframe === "day"
                  ? "Kun"
                  : timeframe === "week"
                  ? "Hafta"
                  : timeframe === "month"
                  ? "Oy"
                  : "Kvartal"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Share2 className="w-4 h-4" />
              Ulashish
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${metric.color} rounded-xl flex items-center justify-center text-white`}
                >
                  {metric.icon}
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                    metric.changeType === "increase"
                      ? "bg-green-100 text-green-700"
                      : metric.changeType === "decrease"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {metric.changeType === "increase" ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : metric.changeType === "decrease" ? (
                    <ArrowDown className="w-3 h-3" />
                  ) : null}
                  {Math.abs(metric.change).toFixed(1)}%
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                </div>

                {/* Mini trend chart */}
                <div className="h-8">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <polyline
                      points={metric.trend
                        .map(
                          (value, i) =>
                            `${i * 16.67},${
                              30 - (value / Math.max(...metric.trend)) * 25
                            }`
                        )
                        .join(" ")}
                      fill="none"
                      stroke={metric.color
                        .replace("bg-", "")
                        .replace("-500", "")}
                      strokeWidth="2"
                      className="opacity-60"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart
            type="line"
            title="Daromad va Foydalanuvchilar Trendi"
            realTime={realTimeEnabled}
            height={350}
          />
          <AnalyticsChart
            type="bar"
            title="Bo'limlar bo'yicha Samaradorlik"
            height={350}
          />
        </div>

        {/* Predictions & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Predictions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">AI Prognozlar</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Brain className="w-4 h-4" />
                Machine Learning
              </div>
            </div>

            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">
                      {prediction.metric}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          prediction.trend === "up"
                            ? "bg-green-100 text-green-700"
                            : prediction.trend === "down"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {prediction.trend === "up"
                          ? "↗"
                          : prediction.trend === "down"
                          ? "↘"
                          : "→"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {prediction.confidence}% ishonch
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Hozirgi</p>
                      <p className="text-lg font-bold text-gray-900">
                        {prediction.metric === "Daromad"
                          ? formatCurrency(prediction.currentValue)
                          : prediction.metric === "Konversiya"
                          ? `${prediction.currentValue}%`
                          : prediction.currentValue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        {prediction.timeframe}
                      </p>
                      <p className="text-lg font-bold text-blue-900">
                        {prediction.metric === "Daromad"
                          ? formatCurrency(prediction.predictedValue)
                          : prediction.metric === "Konversiya"
                          ? `${prediction.predictedValue}%`
                          : prediction.predictedValue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">AI Tavsiyalar</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap className="w-4 h-4" />
                Smart Insights
              </div>
            </div>

            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-4 rounded-xl border-l-4 ${getInsightColor(
                    insight.type
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {insight.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(
                              insight.impact
                            )}`}
                          >
                            {insight.impact === "high"
                              ? "Yuqori"
                              : insight.impact === "medium"
                              ? "O'rta"
                              : "Past"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {insight.confidence}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(insight.timestamp).toLocaleString("uz-UZ")}
                        </span>
                        {insight.actionable && (
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            Harakat qilish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalyticsChart
            type="doughnut"
            title="Vazifalar Taqsimoti"
            height={300}
          />
          <div className="lg:col-span-2">
            <AnalyticsChart
              type="line"
              title="Real-time Faollik Monitoring"
              realTime={realTimeEnabled}
              height={300}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedAnalyticsPage;
