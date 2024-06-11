import { initializeDatabaseConnection } from ".";

export const connectDB = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    /* === Deployed on vercel (serverless function connection is not always to db) */
    await initializeDatabaseConnection();
    next();
  }
  next();
};
