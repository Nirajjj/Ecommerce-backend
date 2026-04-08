import { config } from "dotenv";
config();
export const JWT_SECRET = process.env.JWT_SECRET_KEY!;
export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
export const CLOUD_KEY = process.env.CLOUDINARY_API_KEY!;
export const CLOUD_SECRET = process.env.CLOUDINARY_API_SECRET!;
export const RAZORPAY_ID = process.env.RAZORPAY_KEY_ID!;
export const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
export const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;
export const HOST_URL = process.env.HOST_URL!;
export const PORT = process.env.PORT!;
export const MONGODB_URI = process.env.MONGO_URI!;
export const NODE_ENV = process.env.NODE_ENV!;

if (
  !JWT_SECRET ||
  !CLOUD_NAME ||
  !CLOUD_KEY ||
  !CLOUD_SECRET ||
  !RAZORPAY_ID ||
  !RAZORPAY_SECRET ||
  !WEBHOOK_SECRET ||
  !HOST_URL ||
  !PORT ||
  !MONGODB_URI ||
  !NODE_ENV
) {
  const missingVars: string[] = [];
  if (!JWT_SECRET) missingVars.push("JWT_SECRET_KEY");
  if (!CLOUD_NAME) missingVars.push("CLOUDINARY_CLOUD_NAME");
  if (!CLOUD_KEY) missingVars.push("CLOUDINARY_API_KEY");
  if (!CLOUD_SECRET) missingVars.push("CLOUDINARY_API_SECRET");
  if (!RAZORPAY_ID) missingVars.push("RAZORPAY_KEY_ID");
  if (!RAZORPAY_SECRET) missingVars.push("RAZORPAY_KEY_SECRET");
  if (!WEBHOOK_SECRET) missingVars.push("RAZORPAY_KEY_SECRET");
  if (!HOST_URL) missingVars.push("HOST_URL");
  if (!PORT) missingVars.push("PORT");
  if (!MONGODB_URI) missingVars.push("MONGODB_URI");
  if (!NODE_ENV) missingVars.push("NODE_ENV");
  throw new Error(
    `The following required environment variables are missing: ${missingVars.join(", ")}`,
  );
}
