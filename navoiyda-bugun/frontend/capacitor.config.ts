import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.navoiydabugun.app",
  appName: "Navoiyda Bugun",
  webDir: "dist",
  server: {
    url: "http://192.168.1.100:5001",
    cleartext: true,
  },
  android: {
    backgroundColor: "#ffffff",
  },
};

export default config;
