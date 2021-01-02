import jwt from "jsonwebtoken";
import Employe from "../models/employeModel.js";

const protect = async(req,res,next) =>{

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded =  jwt.verify(token,process.env.JWT_SECRET);
            req.user = await Employe.findById(decoded.id).select("-password");
            //console.log(req.headers);
            next()  
            
        } catch (err) {
            console.log(err.message);
            return res.status(401).json({err:"Not Authorized, token failed"});
        }
    }

    if(!token){
        //console.log(err.message);
        return res.status(401).json({err:"Not Authorized, token failed"});
    }

}

export {protect};