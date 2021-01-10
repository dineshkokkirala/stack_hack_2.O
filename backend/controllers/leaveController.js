import Employe from "../models/employeModel.js";
import Leave from "../models/leaveModel.js";


//  Route   -   /api/leave/addleave
//  Desc    -   Apply Leave
//  Access  -   Private (Employee)
//  Method  -   POST
const addLeave = async(req,res) =>{
    const {leavetype,reason,fromdate,todate,periodtype}  = req.body;
    if(!leavetype||!reason||!fromdate||!todate||!periodtype){
        return res.status(400).json({err:"Please fill all fields"})
    }

    const userId = req.user.id;
    const from_date_modified = fromdate.split("-");
    const to_date_modified = todate.split("-");
    const final_from = from_date_modified[2]+"-"+from_date_modified[1]+"-"+from_date_modified[0];
    const final_to = to_date_modified[2]+"-"+to_date_modified[1]+"-"+to_date_modified[0];
    let user = await Employe.findById(userId);
    const leave = await Leave.create({
        userId,
        leavetype,
        reason,
        fromdate:final_from,
        todate:final_to,
        periodtype,
        username:user.username
    })
    
    if(leave){
        return res.json({
            userId:leave.userId,
            leavetype:leave.leavetype,
            reason:leave.reason,
            fromdate:leave.fromdate,
            todate:leave.todate,
            periodtype:leave.periodtype,
            approvedstatus:leave.approvedstatus,
            username:leave.username
        })
    }else{
        return res.json({
            err:"Failed to apply leave. Try Again"
        })
    }

}

//  Route   -   /api/leave/pending_all
//  Descc   -   Get all pending leaves to admin
//  Access  -   Private (Admin)
//  Method  -   GET
const getAllPending = async(req,res) =>{
    let pending_leaves={}
    pending_leaves = await Leave.find({approvedstatus:0});
    if(pending_leaves){
        return res.json(pending_leaves);
    }else{
        return res.status(400).json({err:"Error to get all pending leaves"})
    }

}

//  Route   -   /api/leave/approve/${leaveID}
//  Desc    -   Approving Employee Leave
//  Private -   Private (Admin)
// Method   -   POST
const leaveApproval = async(req,res) =>{
    const leave = await Leave.findById(req.params.id);
    leave.approvedstatus=1;
    await leave.save();
    if(leave.approvedstatus===1){
        return res.json(leave);
    }else{
        return res.status(400).json({err:"Error to approve leave"})
    }

}

//  Route   -   /api/leave/reject/${leaveID}
//  Desc    -   Rejecting Employee Leave
//  Private -   Private (Admin)
//  Method  -   POST
const leaveRejection = async(req,res) =>{
    const leave = await Leave.findById(req.params.id);
    leave.approvedstatus=2;
    await leave.save();

    if(leave.approvedstatus===2){
        return res.json(leave);
    }else{
        return res.status(400).json({err:"Error to reject leave"})
    }

}

//  Route   -   /api/leave/my_leaves
//  Desc    -   Get all Employee leaves
//  Private -   Private (Employee)
//  Method  -   GET
const get_all_my_leaves = async(req,res) =>{

    const leaves = await Leave.find({userId:req.user._id});
    if(leaves){
        return res.json(leaves);
    }else{
        return res.status(400).json({err:"Error to get all leaves"})
    }
}

//  Route   -   /api/leave/${leave_id}
//  Desc    -   Get Leave by ID
//  Private -   Private (Admin)
//  Method  -   GET
const individualLeave=async(req,res)=>{
    const leave = await Leave.findById(req.params.id);
    if(leave){
        let user = await Employe.findById(leave.userId).select("-password");
       // leave.userDetails = user;
        return res.json({leave,user})
    }
    return res.status(404).json({err:"Leave not found"})
}




export {addLeave,getAllPending,leaveApproval,leaveRejection,get_all_my_leaves,individualLeave}