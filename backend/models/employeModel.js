import mongoose from "mongoose";

const employeSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: String,
      required: true,
    },
    contactnumber: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    maritialstatus: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    worktype: {
      type: String,
      required: true,
    },
    joiningdate: {
      type: String,
      required: true,
    },
    employeid: {
      type: String,
      unique: true,
    },
    team: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      default: "stackhack",
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

const Employe = mongoose.model("Employeuser", employeSchema);

export default Employe;
