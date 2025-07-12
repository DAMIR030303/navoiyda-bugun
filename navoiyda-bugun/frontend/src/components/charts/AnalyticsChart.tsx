import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { format, subDays, startOfDay } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler
);

interface AnalyticsChartProps {
  type: "line" | "bar" | "doughnut";
  title: string;
  data?: any;
  height?: number;
  realTime?: boolean;
  className?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  type,
  title,
  data: externalData,
  height = 300,
  realTime = false,
  className = "",
}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate sample data based on chart type
  const generateSampleData = () => {
    const labels = Array.from({ length: 7 }, (_, i) =>
      format(subDays(new Date(), 6 - i), "MMM dd")
    );

    switch (type) {
      case "line":
        return {
          labels,
          datasets: [
            {
              label: "Vazifalar bajarilishi",
              data: [65, 72, 68, 75, 82, 78, 85],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Davomat",
              data: [88, 92, 85, 90, 95, 88, 92],
              borderColor: "rgb(34, 197, 94)",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        };

      case "bar":
        return {
          labels: [
            "Marketing",
            "Sotuv",
            "IT",
            "HR",
            "Moliya",
            "Ishlab chiqarish",
          ],
          datasets: [
            {
              label: "Samaradorlik (%)",
              data: [92, 88, 95, 85, 90, 87],
              backgroundColor: [
                "rgba(59, 130, 246, 0.8)",
                "rgba(34, 197, 94, 0.8)",
                "rgba(168, 85, 247, 0.8)",
                "rgba(249, 115, 22, 0.8)",
                "rgba(236, 72, 153, 0.8)",
                "rgba(14, 165, 233, 0.8)",
              ],
              borderColor: [
                "rgb(59, 130, 246)",
                "rgb(34, 197, 94)",
                "rgb(168, 85, 247)",
                "rgb(249, 115, 22)",
                "rgb(236, 72, 153)",
                "rgb(14, 165, 233)",
              ],
              borderWidth: 2,
            },
          ],
        };

      case "doughnut":
        return {
          labels: ["Bajarilgan", "Jarayonda", "Kutilayotgan", "Bekor qilingan"],
          datasets: [
            {
              data: [65, 25, 8, 2],
              backgroundColor: [
                "rgba(34, 197, 94, 0.8)",
                "rgba(59, 130, 246, 0.8)",
                "rgba(249, 115, 22, 0.8)",
                "rgba(239, 68, 68, 0.8)",
              ],
              borderColor: [
                "rgb(34, 197, 94)",
                "rgb(59, 130, 246)",
                "rgb(249, 115, 22)",
                "rgb(239, 68, 68)",
              ],
              borderWidth: 2,
            },
          ],
        };

      default:
        return null;
    }
  };

  // Real-time data updates
  useEffect(() => {
    const loadData = () => {
      if (externalData) {
        setData(externalData);
      } else {
        setData(generateSampleData());
      }
      setIsLoading(false);
    };

    loadData();

    if (realTime) {
      const interval = setInterval(() => {
        loadData();
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [externalData, realTime, type]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: 20,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales:
      type !== "doughnut"
        ? {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                color: "rgba(0, 0, 0, 0.6)",
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "rgba(0, 0, 0, 0.6)",
              },
            },
          }
        : undefined,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  if (isLoading) {
    return (
      <div
        className={`bg-white rounded-2xl p-6 border border-gray-200 ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={options} height={height} />;
      case "bar":
        return <Bar data={data} options={options} height={height} />;
      case "doughnut":
        return <Doughnut data={data} options={options} height={height} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 ${className}`}
    >
      <div style={{ height: `${height}px` }}>{renderChart()}</div>
      {realTime && (
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Real-time yangilanish
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;
