import Employe from "../models/employeModel.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import gravatar from "gravatar";

// route POST /api/admin/add
// access   Private(only admin)
// desc     Adding employe
const addEmploye = async (req, res) => {
  //res.send("Adding Employe...");
  const {
    username,
    firstname,
    lastname,
    email,
    gender,
    dateofbirth,
    contactnumber,
    role,
    address,
    salary,
    bloodgroup,
    maritialstatus,
    nationality,
    department,
    worktype,
    joiningdate,
    team,
  } = req.body;

  if (
    !username ||
    !firstname ||
    !lastname ||
    !email ||
    !gender ||
    !dateofbirth ||
    !contactnumber ||
    !role ||
    !address ||
    !salary ||
    !bloodgroup ||
    !maritialstatus ||
    !nationality ||
    !department ||
    !worktype ||
    !joiningdate
  ) {
    return res.status(400).json({ err: "Please fill all fields" });
  }

  let employeEmailExists = await Employe.findOne({ email });
  let employeUsernameExists = await Employe.findOne({ username });

  if (employeEmailExists || employeUsernameExists) {
    return res.status(400).json({ err: "Employee already exists" });
  }

  let salt = await bcryptjs.genSalt(10);
  let hashed_password = await bcryptjs.hash("stackhack", salt);

  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  let username_id_string = username;
  //console.log(emp_id[0]);
  let contact_number_first_three_digits = contactnumber.slice(0, 3);
  let employe_id = username_id_string + contact_number_first_three_digits;

  const employe = await Employe.create({
    username,
    firstname,
    lastname,
    email,
    gender,
    dateofbirth,
    contactnumber,
    role,
    address,
    salary,
    bloodgroup,
    maritialstatus,
    nationality,
    department,
    worktype,
    joiningdate,
    team,
    password: hashed_password,
    photo: avatar,
    employeid: employe_id,
  });

  if (employe) {
    res.status(201).json({
      _id: employe._id,
      username: employe.username,
      email: employe.email,
      isadmin: employe.isadmin,
      token: generateToken(employe._id),
      employeid: employe.employeid,
    });
  } else {
    return res.status(400).json({
      err: "Error to save employe",
    });
  }
};

const displayEmployee = async (req, res) => {
  const all = await Employe.find({isadmin:false});

  if (all) {
    return res.json(all);
  } else {
    return res.status(400).json({ err: "Error to get all employees" });
  }
};

const getEmployeeDetails = async(req,res) =>{
  const employee = await Employe.findById(req.params.id)
  if(employee){
    return res.json(employee);
  }else{
    return res.status(400).json({err:"Cannot get Employee details"})
  }
}

const changePassword = async(req,res)=>{
  const user = await Employe.findById(req.params.id);
  const {old_password,new_password,confirm_password} = req.body;
  if(!old_password||!new_password||!confirm_password){
    return res.status(400).json({err:"All fields are required"})
  }
  const ismatch = await bcryptjs.compare(old_password,user.password);
  if(!ismatch){
    return res.status(400).json({err:"Old Password is Wrong"})
  }
  if(new_password!==confirm_password){
    return res.status(400).json({err:"New password & Confirm password must be same"})
  }
  const hashed = await bcryptjs.hash(new_password,10)
  user.password = hashed;
  await user.save()
  return res.json({
    msg:"Password changed Successfully"
  })

}


export { addEmploye, displayEmployee,getEmployeeDetails,changePassword };
