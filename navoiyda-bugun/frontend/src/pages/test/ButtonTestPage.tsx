import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Play,
  Pause,
  Download,
  Upload,
  Save,
  Trash2,
  Edit3,
  Send,
  Heart,
  Star,
  Gift,
  Rocket,
  Zap,
  Crown,
  Sparkles,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const ButtonTestPage: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleButtonClick = (buttonId: string, action: string) => {
    setLoadingStates((prev) => ({ ...prev, [buttonId]: true }));

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonId]: false }));
      alert(`${action} tugmasi bosildi! ✅`);
    }, 2000);
  };

  const buttonVariants = [
    {
      variant: "default" as const,
      label: "Default",
      description: "Standart ko'rinish",
    },
    {
      variant: "gradient" as const,
      label: "Gradient",
      description: "Gradientli rang",
    },
    {
      variant: "success" as const,
      label: "Success",
      description: "Muvaffaqiyat rangi",
    },
    {
      variant: "warning" as const,
      label: "Warning",
      description: "Ogohlantirish rangi",
    },
    {
      variant: "destructive" as const,
      label: "Destructive",
      description: "O'chirish rangi",
    },
    {
      variant: "outline" as const,
      label: "Outline",
      description: "Konturli ko'rinish",
    },
    {
      variant: "secondary" as const,
      label: "Secondary",
      description: "Ikkinchi darajali",
    },
    {
      variant: "ghost" as const,
      label: "Ghost",
      description: "Shaffof ko'rinish",
    },
    {
      variant: "premium" as const,
      label: "Premium",
      description: "Premium xususiyat",
    },
  ];

  const buttonSizes = [
    { size: "sm" as const, label: "Small" },
    { size: "default" as const, label: "Default" },
    { size: "lg" as const, label: "Large" },
    { size: "xl" as const, label: "Extra Large" },
  ];

  return (
    <>
      <Helmet>
        <title>Tugmalar Test - Navoiyda Bugun</title>
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Tugmalar Test Sahifasi</h1>
              <p className="text-purple-100 text-lg">
                Yangi tugma variantlari va funksiyalarni sinab ko'ring
              </p>
            </div>
          </div>
        </div>

        {/* Tugma Variantlari */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            Tugma Variantlari
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buttonVariants.map((variant) => (
              <div
                key={variant.variant}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {variant.label}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {variant.description}
                </p>
                <Button
                  variant={variant.variant}
                  className="w-full"
                  loading={loadingStates[variant.variant]}
                  onClick={() =>
                    handleButtonClick(variant.variant, variant.label)
                  }
                  leftIcon={
                    variant.variant === "premium" ? (
                      <Gift className="w-4 h-4" />
                    ) : undefined
                  }
                  rightIcon={
                    variant.variant === "gradient" ? (
                      <Rocket className="w-4 h-4" />
                    ) : undefined
                  }
                >
                  {variant.label} Tugma
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Tugma O'lchamlari */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-500" />
            Tugma O'lchamlari
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            {buttonSizes.map((size) => (
              <Button
                key={size.size}
                variant="gradient"
                size={size.size}
                loading={loadingStates[size.size]}
                onClick={() => handleButtonClick(size.size, size.label)}
              >
                {size.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Iconli Tugmalar */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-purple-500" />
            Iconli Tugmalar
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button
              variant="success"
              leftIcon={<Play className="w-4 h-4" />}
              loading={loadingStates["play"]}
              onClick={() => handleButtonClick("play", "Play")}
            >
              Boshlash
            </Button>

            <Button
              variant="warning"
              leftIcon={<Pause className="w-4 h-4" />}
              loading={loadingStates["pause"]}
              onClick={() => handleButtonClick("pause", "Pause")}
            >
              To'xtatish
            </Button>

            <Button
              variant="outline"
              leftIcon={<Download className="w-4 h-4" />}
              loading={loadingStates["download"]}
              onClick={() => handleButtonClick("download", "Download")}
            >
              Yuklab olish
            </Button>

            <Button
              variant="secondary"
              leftIcon={<Upload className="w-4 h-4" />}
              loading={loadingStates["upload"]}
              onClick={() => handleButtonClick("upload", "Upload")}
            >
              Yuklash
            </Button>

            <Button
              variant="default"
              leftIcon={<Save className="w-4 h-4" />}
              loading={loadingStates["save"]}
              onClick={() => handleButtonClick("save", "Save")}
            >
              Saqlash
            </Button>

            <Button
              variant="destructive"
              leftIcon={<Trash2 className="w-4 h-4" />}
              loading={loadingStates["delete"]}
              onClick={() => handleButtonClick("delete", "Delete")}
            >
              O'chirish
            </Button>
          </div>
        </div>

        {/* Right Icon Tugmalar */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Right Icon Tugmalar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="gradient"
              rightIcon={<Send className="w-4 h-4" />}
              loading={loadingStates["send"]}
              onClick={() => handleButtonClick("send", "Send")}
            >
              Yuborish
            </Button>

            <Button
              variant="premium"
              rightIcon={<Sparkles className="w-4 h-4" />}
              loading={loadingStates["premium"]}
              onClick={() => handleButtonClick("premium", "Premium")}
            >
              Premium Xususiyat
            </Button>

            <Button
              variant="success"
              rightIcon={<Edit3 className="w-4 h-4" />}
              loading={loadingStates["edit"]}
              onClick={() => handleButtonClick("edit", "Edit")}
            >
              Tahrirlash
            </Button>
          </div>
        </div>

        {/* Loading Test */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Loading Animatsiya Test
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="gradient"
              loading={true}
              leftIcon={<Heart className="w-4 h-4" />}
            >
              Doimiy Loading
            </Button>

            <Button
              variant="premium"
              loading={true}
              rightIcon={<Star className="w-4 h-4" />}
            >
              Premium Loading
            </Button>
          </div>
        </div>

        {/* Test Natijalari */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h2 className="text-xl font-bold text-green-900 mb-4">
            🎉 Test Natijalari
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                ✅ Yangi Xususiyatlar:
              </h3>
              <ul className="text-green-700 space-y-1">
                <li>• Gradient tugmalar</li>
                <li>• Premium animatsiyalar</li>
                <li>• Loading holatlari</li>
                <li>• Left va Right iconlar</li>
                <li>• Hover effektlari</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">
                🔥 Yangi Variantlar:
              </h3>
              <ul className="text-blue-700 space-y-1">
                <li>• Success (yashil)</li>
                <li>• Warning (sariq)</li>
                <li>• Premium (gradient)</li>
                <li>• XL o'lcham</li>
                <li>• Shadow effektlari</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonTestPage;
