import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import employeRoutes from "./routes/emplyeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
dotenv.config();

const app = express();

// PORT
const PORT = process.env.PORT;

//DB Connection
// &w=majorityt
//URI = "mongodb+srv://stackhack:Stackhack123456@stackhack.hrj84.mongodb.net/stackhack?retryWrites=true&w=majority"
//URI = mongodb://localhost:27017/hr_management

// DataBase Connection
dbConnection();


//Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", employeRoutes);
app.use("/api/leave", leaveRoutes);

app.get("/test", (req, res) => {
  res.send("Ready to Rock!!!");
});


// Listening to the PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgRed.bold);
});
