import Employe from "../models/employeModel.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const userLogin = async(req, res) => {

    const {email,password} = req.body;
    //console.log(email);
    const user = await Employe.findOne({email});
    //console.log(user);
    if(!user){
        return res.status(404).json({msg:"Invalid Credentials"})
    }

    let isMatch = await bcryptjs.compare(password,user.password);

    if(!isMatch){
        return res.status(404).json({msg:"Invalid Credentials"})
    }else{
        return res.json({
            _id:user._id,
            isadmin:user.isadmin,
            token:generateToken(user._id),
            email:user.email,
            username:user.username
        })
    }

};


const getUserProfile =async(req,res)=>{

    const user = await Employe.findById(req.user._id);

    if(user){
        return res.json({
            _id:user._id,
            username:user.username,
            email:user.email,
            isadmin:user.isadmin
        })
    }else{
        return res.status(404).json({err:"User not found"});
    }

}




export { userLogin,getUserProfile };

