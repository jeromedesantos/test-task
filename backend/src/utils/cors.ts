import "dotenv/config";
import cors from "cors";

const CORS_URL = process.env.CORS_URL as string;

export const corsConfig = cors({
  origin: [CORS_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
