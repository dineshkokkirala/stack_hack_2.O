import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URI, {
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
