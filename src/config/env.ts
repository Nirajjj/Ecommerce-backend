// console.log("ENV VALUE:", process.env.JWT_SECRET_KEY, process.env.PORT);
import { config } from "dotenv";
config();
export const JWT_SECRET = process.env.JWT_SECRET_KEY!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET_KEY is missing");
}
// import "dotenv/config";
// const getEnv = (key: string) => {
//   const value = process.env[key]?.trim();
//   if (!value) {
//     throw new Error(`${key} is missing`);
//   }
//   return value.replace(/;$/, "");
// };
// export const JWT_SECRET = getEnv("JWT_SECRET_KEY");
// export const PORT = Number(process.env.PORT?.trim().replace(/;$/, "") || 3000);
// export const HOST_URL = process.env.HOSTURL?.trim().replace(/;$/, "") || "*";
