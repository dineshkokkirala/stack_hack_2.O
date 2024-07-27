import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// DB Connection function

//rYe8Wwe6d3WEeGfh
//dineshkokkirala369
//mongodb+srv://dineshkokkirala369:rYe8Wwe6d3WEeGfh@stackhack2.esclzsk.mongodb.net/?retryWrites=true&w=majority&appName=stackhack2  - NEW
//mongodb+srv://stackhack:Stackhack123456@stackhack.hrj84.mongodb.net/stackhack?retryWrites=true&w=majority - OLD
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// }
const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://dineshkokkirala369:rYe8Wwe6d3WEeGfh@stackhack2.esclzsk.mongodb.net/?retryWrites=true&w=majority&appName=stackhack2");
    console.log("DB Connection Success".bgBlue.underline);
  } catch (err) {
    console.log(`${err.message}`.red.underline);
    process.exit(1);
  }
};

export default dbConnection;
