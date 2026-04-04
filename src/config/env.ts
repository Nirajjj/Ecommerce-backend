import { config } from "dotenv";
config();
export const JWT_SECRET = process.env.JWT_SECRET_KEY!;
export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
export const CLOUD_KEY = process.env.CLOUDINARY_API_KEY!;
export const CLOUD_SECRET = process.env.CLOUDINARY_API_SECRET!;
export const RAZORPAY_ID = process.env.RAZORPAY_KEY_ID!;
export const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

if (
  !JWT_SECRET ||
  !CLOUD_NAME ||
  !CLOUD_KEY ||
  !CLOUD_SECRET ||
  !RAZORPAY_ID ||
  !RAZORPAY_SECRET
) {
  const missingVars: string[] = [];
  if (!JWT_SECRET) missingVars.push("JWT_SECRET_KEY");
  if (!CLOUD_NAME) missingVars.push("CLOUDINARY_CLOUD_NAME");
  if (!CLOUD_KEY) missingVars.push("CLOUDINARY_API_KEY");
  if (!CLOUD_SECRET) missingVars.push("CLOUDINARY_API_SECRET");
  if (!RAZORPAY_ID) missingVars.push("RAZORPAY_KEY_ID");
  if (!RAZORPAY_SECRET) missingVars.push("RAZORPAY_KEY_SECRET");
  throw new Error(
    `The following required environment variables are missing: ${missingVars.join(", ")}`,
  );
}
