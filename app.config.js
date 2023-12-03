import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    baseUrl: process.env.BASE_URL,
  },
});