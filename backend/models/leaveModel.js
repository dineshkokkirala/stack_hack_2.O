import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Employeuser"
    },
    leavetype:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    fromdate:{
        type:Date,
        required:true
    },
    todate:{
        type:Date,
        required:true
    },
    noofdays:{
        type:Number,
        required:true
    },
    periodtype:{
        type:String,
        required:true
    },
    approvedstatus: {
        type : Number,
        default : 0
    }   
},{
    timestamp:true
})

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
 