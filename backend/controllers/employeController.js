import Employe from "../models/employeModel.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const addEmploye = async (req, res) => {
  //res.send("Adding Employe...");
  const {username,firstname,lastname,email,gender,dateofbirth,contactnumber,role,address,salary,bloodgroup,maritialstatus,nationality,department,worktype,joiningdate,password,team} = req.body;
    

    if(!username||!firstname||!lastname||!email||!gender||!dateofbirth||!contactnumber||!role||!address||!salary||!bloodgroup||!maritialstatus||!nationality||!department||!worktype||!joiningdate||!password){
        return res.status(400).json({err:"Please fill all fields"})
    }

  const employeExists = await Employe.findOne({email});

  if(employeExists){
      return res.status(400).json({err:"Employe already exists"});
  }

  let salt = await bcryptjs.genSalt(10);
  let hashed_password = await bcryptjs.hash(password,salt);


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
      password:hashed_password
  })

  if(employe){
      res.status(201).json({
          _id:employe._id,
          username:employe.username,
          email:employe.email,
          isadmin:employe.isadmin,
          token:generateToken(employe._id)
      })
  }else{
      return res.status(400).json({
          err:"Error to save employe"
      })
  }

  
};

export { addEmploye };
