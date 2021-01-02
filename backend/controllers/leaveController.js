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
            periodtype:leave.periodtype
        })
    }else{
        return res.json({
            err:"Failed to apply leave. Try Again"
        })
    }



}

export {addLeave}