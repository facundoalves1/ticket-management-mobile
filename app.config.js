import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    baseUrl: process.env.BASE_URL,
    eas: {
      projectId: "9cf51dfb-561f-45f5-bde9-9b21231973b1"
    }
  },
  android: {
    package: "com.rosendoalves.ticket_management_mobile"
  }
});