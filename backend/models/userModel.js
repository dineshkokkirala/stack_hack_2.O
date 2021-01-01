import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minnlength: 5,
    },
    isadmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
