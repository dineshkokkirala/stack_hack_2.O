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
        type:String,
        required:true
    },
    todate:{
        type:String,
        required:true
    },
    noofdays:{
        type:Number
    },
    periodtype:{
        type:String,
        required:true
    },
    approvedstatus: {
        type : Number,
        default : 0
    },
    username:{
        type:String
    }   
},{
    timestamp:true
})

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
 