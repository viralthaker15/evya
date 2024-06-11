import { initializeDatabaseConnection } from ".";

/* @ts-ignore */
export const checkDBConnection = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === "production") {
      /* === Deployed on vercel (serverless function connection is not always to) */
      await initializeDatabaseConnection();
    }
  } catch (e) {
    console.error("Error: ", e);
  } finally {
    next();
  }
};
