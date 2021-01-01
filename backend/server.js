import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import colors from "colors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//DB Connection
dbConnection();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Ready to Rock!!!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgRed.bold);
});
