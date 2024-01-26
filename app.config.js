import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    eas: {
      //projectId: "9cf51dfb-561f-45f5-bde9-9b21231973b1"
    }
  },
  android: {
    package: "com.facundoalves.ticket_management_mobile",
    packageType: "APK",
  }
});