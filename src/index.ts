import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { buildDataSource } from "./db";
import cors from "cors";
import { checkDBConnection } from "./middleware";

const port = process.env.PORT || 5000;
const app = express();

export async function initializeDatabaseConnection() {
  const dataSource = await buildDataSource();
  console.log("Database connections established.");

  return dataSource;
}

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* --- Static files from the Vite build directory --- */
app.use(express.static(path.join(__dirname, "../client")));

/* --- Route handlers ---  */
app.get("/ping", (req, res) => {
  res.status(200).send("Ok !");
});

app.use(checkDBConnection);
app.use("/members", require("./controllers/members").default);

const server = app.listen(port, async () => {
  initializeDatabaseConnection();
  console.log(`Listening on ${port}: ${app.get("env")}`);
  console.log(`  Press CTRL-C to stop\n`);
});

export default app;
