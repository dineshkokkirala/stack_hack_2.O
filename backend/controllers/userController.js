import Employe from "../models/employeModel.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";



//  Route -  /api/users/login
//  Desc    -   Login as Employee or as Admin
//  Access  -   Public
//  Method  -   POST
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Employe.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  let isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  } else {
    return res.json({
      _id: user._id,
      isadmin: user.isadmin,
      token: generateToken(user._id),
      email: user.email,
      username: user.username,
    });
  }
};

//  Route   -   /api/users/profile
//  Desc    -   Get a profile of user
//  Access  -   Private (Employee)
//  Method  -   GET
const getUserProfile = async (req, res) => {
  const user = await Employe.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isadmin: user.isadmin,
    });
  } else {
    return res.status(404).json({ err: "User not found" });
  }
};

export { userLogin, getUserProfile };
