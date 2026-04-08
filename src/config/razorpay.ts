import Razorpay from "razorpay";
import { RAZORPAY_ID, RAZORPAY_SECRET } from "./env.js";

export const razorpay = new Razorpay({
  key_id: RAZORPAY_ID!,
  key_secret: RAZORPAY_SECRET!,
});
