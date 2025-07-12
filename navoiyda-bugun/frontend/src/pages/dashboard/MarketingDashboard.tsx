import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Hash,
  FileText,
  Megaphone,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  DollarSign,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Bell,
  Play,
  Pause,
  Settings,
  Globe,
  Zap,
  Award,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface CampaignMetric {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  startDate: string;
  endDate: string;
  platform: string[];
}

interface SocialMediaMetric {
  platform: string;
  followers: number;
  growth: number;
  engagement: number;
  reach: number;
  impressions: number;
  color: string;
  icon: string;
}

interface ContentMetric {
  id: string;
  title: string;
  type: "post" | "video" | "article" | "story" | "reel";
  platform: string;
  scheduledDate: string;
  status: "draft" | "scheduled" | "published" | "archived";
  performance: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    engagement: number;
  };
}

interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  percentage: number;
  conversionRate: number;
  avgOrderValue: number;
  color: string;
  characteristics: string[];
}

interface MarketingKPI {
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  target: string;
  progress: number;
  color: string;
}

const MarketingDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "today" | "week" | "month" | "quarter"
  >("month");
  const [selectedPlatform, setSelectedPlatform] = useState<
    "all" | "instagram" | "facebook" | "youtube" | "telegram"
  >("all");

  // Marketing KPIs
  const [marketingKPIs, setMarketingKPIs] = useState<MarketingKPI[]>([
    {
      title: "Jami ROI",
      value: "245%",
      change: 18.5,
      changeType: "increase",
      target: "250%",
      progress: 98,
      color: "bg-green-500",
    },
    {
      title: "Konversiya darajasi",
      value: "3.2%",
      change: 0.8,
      changeType: "increase",
      target: "4%",
      progress: 80,
      color: "bg-blue-500",
    },
    {
      title: "Mijozlar jalb qilish narxi",
      value: "125,000 so'm",
      change: -12.3,
      changeType: "decrease",
      target: "100,000 so'm",
      progress: 80,
      color: "bg-orange-500",
    },
    {
      title: "Brend ongini oshirish",
      value: "78%",
      change: 5.2,
      changeType: "increase",
      target: "85%",
      progress: 92,
      color: "bg-purple-500",
    },
  ]);

  // Active campaigns
  const [campaigns, setCampaigns] = useState<CampaignMetric[]>([
    {
      id: "1",
      name: "Yangi mahsulot e'loni",
      status: "active",
      budget: 15000000,
      spent: 12800000,
      impressions: 450000,
      clicks: 14400,
      conversions: 432,
      roi: 285,
      startDate: "2024-04-01",
      endDate: "2024-05-31",
      platform: ["instagram", "facebook", "youtube"],
    },
    {
      id: "2",
      name: "Yozgi chegirmalar",
      status: "active",
      budget: 8000000,
      spent: 6200000,
      impressions: 320000,
      clicks: 9600,
      conversions: 288,
      roi: 195,
      startDate: "2024-04-15",
      endDate: "2024-06-15",
      platform: ["instagram", "telegram"],
    },
    {
      id: "3",
      name: "Brend ongini oshirish",
      status: "paused",
      budget: 12000000,
      spent: 8500000,
      impressions: 680000,
      clicks: 20400,
      conversions: 612,
      roi: 320,
      startDate: "2024-03-01",
      endDate: "2024-05-01",
      platform: ["facebook", "youtube"],
    },
  ]);

  // Social media metrics
  const [socialMediaMetrics, setSocialMediaMetrics] = useState<
    SocialMediaMetric[]
  >([
    {
      platform: "Instagram",
      followers: 8200,
      growth: 12.5,
      engagement: 8.7,
      reach: 45000,
      impressions: 125000,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: "instagram",
    },
    {
      platform: "Facebook",
      followers: 5100,
      growth: 8.2,
      engagement: 6.4,
      reach: 32000,
      impressions: 89000,
      color: "bg-blue-600",
      icon: "facebook",
    },
    {
      platform: "YouTube",
      followers: 1900,
      growth: 25.3,
      engagement: 12.8,
      reach: 18000,
      impressions: 67000,
      color: "bg-red-600",
      icon: "youtube",
    },
    {
      platform: "Telegram",
      followers: 3200,
      growth: 18.7,
      engagement: 15.2,
      reach: 28000,
      impressions: 52000,
      color: "bg-blue-500",
      icon: "telegram",
    },
  ]);

  // Content calendar
  const [contentCalendar, setContentCalendar] = useState<ContentMetric[]>([
    {
      id: "1",
      title: "Mahsulot taqdimoti video",
      type: "video",
      platform: "YouTube",
      scheduledDate: "2024-05-15T14:00:00",
      status: "scheduled",
      performance: {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0,
        engagement: 0,
      },
    },
    {
      id: "2",
      title: "Instagram Story: Kundalik hayot",
      type: "story",
      platform: "Instagram",
      scheduledDate: "2024-05-14T10:00:00",
      status: "published",
      performance: {
        views: 2800,
        likes: 245,
        shares: 18,
        comments: 32,
        engagement: 10.5,
      },
    },
    {
      id: "3",
      title: "Facebook post: Mijozlar fikri",
      type: "post",
      platform: "Facebook",
      scheduledDate: "2024-05-16T09:00:00",
      status: "draft",
      performance: {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0,
        engagement: 0,
      },
    },
  ]);

  // Customer segments
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([
    {
      id: "1",
      name: "Yosh professional",
      size: 2847,
      percentage: 35,
      conversionRate: 4.2,
      avgOrderValue: 850000,
      color: "bg-blue-500",
      characteristics: ["25-35 yosh", "Yuqori daromad", "Texnologiya sevuvchi"],
    },
    {
      id: "2",
      name: "Oila a'zolari",
      size: 1923,
      percentage: 28,
      conversionRate: 3.8,
      avgOrderValue: 1200000,
      color: "bg-green-500",
      characteristics: ["30-45 yosh", "Oila bilan", "Sifat muhim"],
    },
    {
      id: "3",
      name: "Yoshlar",
      size: 1456,
      percentage: 22,
      conversionRate: 2.9,
      avgOrderValue: 450000,
      color: "bg-purple-500",
      characteristics: ["18-25 yosh", "Narx muhim", "Trend quvuvchi"],
    },
    {
      id: "4",
      name: "Katta yosh",
      size: 985,
      percentage: 15,
      conversionRate: 5.1,
      avgOrderValue: 950000,
      color: "bg-orange-500",
      characteristics: ["45+ yosh", "Sodiqlik", "Sifat va xizmat"],
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const updateTimer = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate metric updates
      setMarketingKPIs((prev) =>
        prev.map((kpi) => ({
          ...kpi,
          change: kpi.change + (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(updateTimer);
    };
  }, []);

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "paused":
        return "bg-orange-500";
      case "completed":
        return "bg-blue-500";
      case "draft":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getContentStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "draft":
        return "bg-gray-500";
      case "archived":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
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
    <div className="space-y-8">
      {/* Marketing Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Megaphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Marketing Dashboard</h1>
              <p className="text-pink-100 text-lg">
                Kampaniyalar, analitika va mijozlar segmentatsiyasi
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-pink-100 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Oxirgi yangilanish: {lastUpdated.toLocaleTimeString("uz-UZ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Yangilash
              </button>
              <button className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                <Bell className="w-4 h-4" />
                Ogohlantirishlar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range & Platform Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200">
          <span className="text-sm font-medium text-gray-700">
            Vaqt oralig'i:
          </span>
          {(["today", "week", "month", "quarter"] as const).map((timeRange) => (
            <button
              key={timeRange}
              onClick={() => setSelectedTimeRange(timeRange)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeRange === timeRange
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {timeRange === "today"
                ? "Bugun"
                : timeRange === "week"
                ? "Hafta"
                : timeRange === "month"
                ? "Oy"
                : "Kvartal"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200">
          <span className="text-sm font-medium text-gray-700">Platform:</span>
          {(
            ["all", "instagram", "facebook", "youtube", "telegram"] as const
          ).map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlatform === platform
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {platform === "all"
                ? "Barchasi"
                : platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Marketing KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketingKPIs.map((kpi, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center`}
              >
                {index === 0 && <DollarSign className="w-6 h-6 text-white" />}
                {index === 1 && <Target className="w-6 h-6 text-white" />}
                {index === 2 && <Users className="w-6 h-6 text-white" />}
                {index === 3 && <Award className="w-6 h-6 text-white" />}
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                  kpi.changeType === "increase"
                    ? "bg-green-100 text-green-700"
                    : kpi.changeType === "decrease"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {kpi.changeType === "increase" ? (
                  <ArrowUp className="w-3 h-3" />
                ) : kpi.changeType === "decrease" ? (
                  <ArrowDown className="w-3 h-3" />
                ) : null}
                {Math.abs(kpi.change).toFixed(1)}%
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Maqsad: {kpi.target}</span>
                  <span>{kpi.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${kpi.color} transition-all duration-500`}
                    style={{ width: `${kpi.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Faol kampaniyalar</h3>
          <Link
            to="/campaigns"
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 text-sm font-medium"
          >
            <Target className="w-4 h-4" />
            Barchasini ko'rish
          </Link>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 ${getCampaignStatusColor(
                      campaign.status
                    )} rounded-full`}
                  ></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {campaign.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {campaign.platform.join(", ")} •{" "}
                      {new Date(campaign.endDate).toLocaleDateString("uz-UZ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {campaign.roi}%
                    </p>
                    <p className="text-xs text-gray-500">ROI</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {campaign.status === "active" ? (
                      <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Byudjet</p>
                  <p className="text-sm font-medium">
                    {formatCurrency(campaign.budget)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sarflangan</p>
                  <p className="text-sm font-medium">
                    {formatCurrency(campaign.spent)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ko'rishlar</p>
                  <p className="text-sm font-medium">
                    {formatNumber(campaign.impressions)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Konversiya</p>
                  <p className="text-sm font-medium">{campaign.conversions}</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getCampaignStatusColor(
                    campaign.status
                  )} transition-all duration-500`}
                  style={{
                    width: `${(campaign.spent / campaign.budget) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Performance & Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Media Performance */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Ijtimoiy tarmoqlar
            </h3>
            <Link
              to="/social-media"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              <Hash className="w-4 h-4" />
              Batafsil
            </Link>
          </div>

          <div className="space-y-4">
            {socialMediaMetrics.map((social, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center`}
                    >
                      <Hash className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {social.platform}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatNumber(social.followers)} obunachi
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {social.engagement}%
                    </p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">O'sish</p>
                    <p className="text-sm font-medium text-green-600">
                      +{social.growth}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Qamrov</p>
                    <p className="text-sm font-medium">
                      {formatNumber(social.reach)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ko'rishlar</p>
                    <p className="text-sm font-medium">
                      {formatNumber(social.impressions)}
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${social.color} transition-all duration-500`}
                    style={{ width: `${social.engagement * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Mijozlar segmentatsiyasi
            </h3>
            <Link
              to="/customers"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Users className="w-4 h-4" />
              Tahlil
            </Link>
          </div>

          <div className="space-y-4">
            {customerSegments.map((segment) => (
              <div key={segment.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${segment.color} rounded-lg flex items-center justify-center`}
                    >
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {segment.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatNumber(segment.size)} mijoz •{" "}
                        {segment.percentage}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {segment.conversionRate}%
                    </p>
                    <p className="text-xs text-gray-500">Konversiya</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">O'rtacha buyurtma</p>
                    <p className="text-sm font-medium">
                      {formatCurrency(segment.avgOrderValue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Xususiyatlari</p>
                    <p className="text-sm font-medium">
                      {segment.characteristics[0]}
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${segment.color} transition-all duration-500`}
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Kontent kalendari</h3>
          <Link
            to="/content"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
          >
            <Calendar className="w-4 h-4" />
            Kalendar
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contentCalendar.map((content) => (
            <div key={content.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-3 h-3 ${getContentStatusColor(
                    content.status
                  )} rounded-full`}
                ></div>
                <span className="text-xs text-gray-500 capitalize">
                  {content.status}
                </span>
              </div>

              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-1">
                  {content.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {content.platform} • {content.type}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(content.scheduledDate).toLocaleDateString("uz-UZ")}{" "}
                  -{" "}
                  {new Date(content.scheduledDate).toLocaleTimeString("uz-UZ", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {content.status === "published" && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-gray-400" />
                    <span>{formatNumber(content.performance.views)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-gray-400" />
                    <span>{formatNumber(content.performance.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-3 h-3 text-gray-400" />
                    <span>{formatNumber(content.performance.shares)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-gray-400" />
                    <span>{formatNumber(content.performance.comments)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/campaigns"
          className="group bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Kampaniyalar</h3>
              <p className="text-pink-100 text-sm">Reklama boshqaruvi</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">{campaigns.length} faol kampaniya</span>
            <ArrowUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/analytics"
          className="group bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Analitika</h3>
              <p className="text-purple-100 text-sm">Batafsil tahlil</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">ROI: 245%</span>
            <BarChart3 className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/audience"
          className="group bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Auditoriya</h3>
              <p className="text-blue-100 text-sm">Mijozlar tahlili</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {customerSegments.reduce((sum, seg) => sum + seg.size, 0)} mijoz
            </span>
            <Users className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MarketingDashboard;
