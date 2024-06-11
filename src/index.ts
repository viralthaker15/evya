import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { buildDataSource } from "./db";
import cors from "cors";

const port = process.env.PORT || 5000;
const app = express();

async function initializeDatabaseConnection() {
  const dataSource = await buildDataSource();
  console.log("Database connections established.");

  return dataSource;
}

initializeDatabaseConnection();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* --- Static files from the Vite build directory --- */
app.use(express.static(path.join(__dirname, "../client")));

/* --- Route handlers ---  */
app.use("/members", require("./controllers/members").default);

app.get("/ping", (req, res) => {
  res.status(200).send("Ok !");
});

// Catch-all route to serve the frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

const server = app.listen(port, async () => {
  console.log(`Listening on ${port}: ${app.get("env")}`);
  console.log(`  Press CTRL-C to stop\n`);
});

export default app;
