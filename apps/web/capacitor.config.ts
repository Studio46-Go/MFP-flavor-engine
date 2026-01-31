import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.studio46.mfp.flavor",
  appName: "MFP Flavor Engine",
  webDir: "dist",
  server: {
    // Enable this for development with live reload
    // url: "http://YOUR_IP:5173",
    // cleartext: true,
  },
  ios: {
    contentInset: "automatic",
    backgroundColor: "#f7f5f2",
    preferredContentMode: "mobile",
  },
  android: {
    backgroundColor: "#f7f5f2",
  },
  plugins: {
    StatusBar: {
      style: "DARK",
      backgroundColor: "#2d2a26",
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
