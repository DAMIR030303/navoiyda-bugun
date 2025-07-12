import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  QrCode,
  Camera,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Smartphone,
  Wifi,
  WifiOff,
} from "lucide-react";

const QRAttendancePage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<
    "none" | "checkin" | "checkout"
  >("none");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleQRScan = () => {
    setIsScanning(true);
    // Simulate QR scanning
    setTimeout(() => {
      setIsScanning(false);
      if (attendanceStatus === "none") {
        setAttendanceStatus("checkin");
      } else if (attendanceStatus === "checkin") {
        setAttendanceStatus("checkout");
      }
    }, 2000);
  };

  const getLocationInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(
            "Location:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.log("Location error:", error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">QR Kod Davomat</h1>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Badge variant="secondary" className="text-green-600">
                <Wifi size={12} className="mr-1" />
                Onlayn
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-red-600">
                <WifiOff size={12} className="mr-1" />
                Oflayn
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Time */}
        <Card className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-0">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">
                {currentTime.toLocaleTimeString("uz-UZ")}
              </div>
              <div className="text-sm opacity-90">
                {currentTime.toLocaleDateString("uz-UZ", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Scanner */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-center">QR Kod Skaneri</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {isScanning ? (
                  <div className="absolute inset-0 bg-blue-500 opacity-20 animate-pulse"></div>
                ) : null}
                <QrCode size={80} className="text-gray-400" />
                {isScanning && (
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl animate-pulse"></div>
                )}
              </div>

              <Button
                onClick={handleQRScan}
                disabled={isScanning}
                className="w-full py-3"
                size="lg"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Skanerlash...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2" size={18} />
                    QR Kodni Skanerlash
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Status */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base">Bugungi Davomat</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  {attendanceStatus === "checkin" ||
                  attendanceStatus === "checkout" ? (
                    <CheckCircle className="text-green-600 mr-3" size={20} />
                  ) : (
                    <Clock className="text-gray-400 mr-3" size={20} />
                  )}
                  <div>
                    <p className="font-medium">Kelish vaqti</p>
                    <p className="text-sm text-gray-600">
                      {attendanceStatus === "checkin" ||
                      attendanceStatus === "checkout"
                        ? "09:00"
                        : "Hali belgilanmagan"}
                    </p>
                  </div>
                </div>
                {attendanceStatus === "checkin" ||
                attendanceStatus === "checkout" ? (
                  <Badge variant="secondary" className="text-green-600">
                    Belgilandi
                  </Badge>
                ) : (
                  <Badge variant="outline">Kutilmoqda</Badge>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  {attendanceStatus === "checkout" ? (
                    <CheckCircle className="text-green-600 mr-3" size={20} />
                  ) : (
                    <Clock className="text-gray-400 mr-3" size={20} />
                  )}
                  <div>
                    <p className="font-medium">Ketish vaqti</p>
                    <p className="text-sm text-gray-600">
                      {attendanceStatus === "checkout"
                        ? "18:00"
                        : "Hali belgilanmagan"}
                    </p>
                  </div>
                </div>
                {attendanceStatus === "checkout" ? (
                  <Badge variant="secondary" className="text-green-600">
                    Belgilandi
                  </Badge>
                ) : (
                  <Badge variant="outline">Kutilmoqda</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Features */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base">Mobil Xususiyatlar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-3"
                onClick={getLocationInfo}
              >
                <MapPin className="mr-3" size={18} />
                <div className="text-left">
                  <div className="font-medium">Geolokatsiya</div>
                  <div className="text-xs text-gray-600">
                    Joylashuvni aniqlash
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-3">
                <Camera className="mr-3" size={18} />
                <div className="text-left">
                  <div className="font-medium">Kamera orqali</div>
                  <div className="text-xs text-gray-600">
                    Hujjatlarni skanerlash
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-3">
                <Smartphone className="mr-3" size={18} />
                <div className="text-left">
                  <div className="font-medium">Oflayn rejim</div>
                  <div className="text-xs text-gray-600">
                    Internetisiz ishlash
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base">Bugungi Xulosa</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">8.5h</div>
                <div className="text-xs text-gray-600">Ishlangan vaqt</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">5</div>
                <div className="text-xs text-gray-600">
                  Bajarilgan vazifalar
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRAttendancePage;
