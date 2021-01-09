import React from 'react'

const GetLeave = (props) => {
    const data = props.location.state;
    const {leave,user} = data
    return (
        <div>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-12 card p-4">
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-row">
                                <h3 style={{color:"#9e1559",textAlign:"left"}}>Username</h3>  :
                                <h3 style={{textAlign:"right"}}>  {user.username}</h3>
                            </div>
                            <h3> <span style={{color:"#9e1559"}}>Employee ID</span>  : {user.employeid}</h3>
                            <h3><span style={{color:"#9e1559"}}>Email</span> : {user.email}</h3>
                            <h3><span style={{color:"#9e1559"}}>Department</span> : {user.department}</h3>
                            <h3><span style={{color:"#9e1559"}}>Role</span> : {user.role}</h3>
                            <h3><span style={{color:"#9e1559"}}>Leave Type</span> : {leave.leavetype}</h3>
                            <h3><span style={{color:"#9e1559"}}>Period Type</span> : {leave.periodtype}</h3>
                            <h3><span style={{color:"#9e1559"}}>From</span> : {leave.fromdate}</h3>
                            <h3><span style={{color:"#9e1559"}}>To</span> : {leave.todate}</h3>
                            <h3><span style={{color:"#9e1559"}}>Reason</span> : {leave.reason}</h3>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetLeave
