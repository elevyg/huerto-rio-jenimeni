export const Constants = {
  baseUrl:
    `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}` ??
    "http://localhost:3000",
};
