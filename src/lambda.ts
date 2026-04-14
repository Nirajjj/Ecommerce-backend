import serverless from "serverless-http";
import app from "./app.js";
import connectToDb from "./config/db.js";

const server = serverless(app);
let isDbConnected = false;

export const handler = async (event: any, context: any) => {
  if (!isDbConnected) {
    await connectToDb();
    isDbConnected = true;
  }

  return server(event, context);
};
