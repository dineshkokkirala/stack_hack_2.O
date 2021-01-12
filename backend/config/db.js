import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// DB Connection function
const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://stackhack:Stackhack123456@stackhack.hrj84.mongodb.net/stackhack?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB Connection Success".bgBlue.underline);
  } catch (err) {
    console.log(`${err.message}`.red.underline);
    process.exit(1);
  }
};

export default dbConnection;
