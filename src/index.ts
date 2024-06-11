import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { buildDataSource } from "./db";
import cors from "cors";

const port = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* --- Route handlers ---  */
app.use("/members", require("./controllers/members").default);

const server = app.listen(port, async () => {
  console.log(`Listening on ${port}: ${app.get("env")}`);
  console.log(`  Press CTRL-C to stop\n`);
});

async function initializeDatabaseConnection() {
  const dataSource = await buildDataSource();
  console.log("Database connections established.");

  return dataSource;
}

initializeDatabaseConnection();
