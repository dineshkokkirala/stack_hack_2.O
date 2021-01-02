import Employe from "../models/employeModel.js";
import Leave from "../models/leaveModel.js";

const addLeave = async(req,res) =>{
    const {leavetype,reason,fromdate,todate,noofdays,periodtype}  = req.body;
    if(!leavetype||!reason||!fromdate||!todate||!noofdays||!periodtype){
        return res.status(400).json({err:"Please fill all fields"})
    }

    const userId = req.user.id;
    const leave = await Leave.create({
        userId,
        leavetype,
        reason,
        fromdate,
        todate,
        noofdays,
        periodtype
    })
    
    if(leave){
        return res.json({
            userId:leave.userId,
            leavetype:leave.leavetype,
            reason:leave.reason,
            fromdate:leave.fromdate,
            todate:leave.todate,
            noofdays:leave.noofdays,
            periodtype:leave.periodtype,
            approvedstatus:leave.approvedstatus
        })
    }else{
        return res.json({
            err:"Failed to apply leave. Try Again"
        })
    }

}


const getAllPending = async(req,res) =>{

    const pending_leaves = await Leave.find({approvedstatus:0});

    if(pending_leaves){
        return res.json({pending_leaves});
    }else{
        return res.status(400).json({err:"Error to get all pending leaves"})
    }

}


const leaveApproval = async(req,res) =>{

    const user = await Employe.findById(req.params.id);

    const leave = await Leave.findOne({userId:user._id});

    leave.approvedstatus=1;
    await leave.save();

    if(leave.approvedstatus===1){
        return res.json(leave);
    }else{
        return res.status(400).json({err:"Error to approve leave"})
    }

}

const leaveRejection = async(req,res) =>{

    const user = await Employe.findById(req.params.id);

    const leave = await Leave.findOne({userId:user._id});

    leave.approvedstatus=2;
    await leave.save();

    if(leave.approvedstatus===2){
        return res.json(leave);
    }else{
        return res.status(400).json({err:"Error to reject leave"})
    }

}


// const my_leaves_pending = async(req,res) =>{

//     const my_pending = await Leave.find({userId:req.user._id,approvedstatus:0})
//     if(my_pending){
//         return res.json(my_pending)
//     }else{
//         return res.status(400).json({err:"Error to get my pending leaves"})
//     }
// }
// const my_leaves_approved = async(req,res) =>{

//     const my_pending = await Leave.find({userId:req.user._id,approvedstatus:1})
//     if(my_pending){
//         return res.json(my_pending)
//     }else{
//         return res.status(400).json({err:"Error to get my approved leaves"})
//     }

// }

const get_all_my_leaves = async(req,res) =>{

    const leaves = await Leave.find({userId:req.user._id});
    if(leaves){
        return res.json(leaves);
    }else{
        return res.status(400).json({err:"Error to get all leaves"})
    }

}




export {addLeave,getAllPending,leaveApproval,leaveRejection,get_all_my_leaves}