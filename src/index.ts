import dotenv from "dotenv";
import express from "express";
import { buildDataSource } from "./db";

// Start the web service
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

const server = app.listen(port, async () => {
  console.log(`Listening on ${port}: ${app.get("env")}`);
  console.log(`  Press CTRL-C to stop\n`);
});

void initializeDatabaseConnection();

async function initializeDatabaseConnection() {
  const DBInternal = await buildDataSource();
  console.log("Database connections established.");
}
