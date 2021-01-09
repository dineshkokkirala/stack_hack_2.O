import React, { useEffect, useState } from 'react'

const PendingLeaves = (props) => {

    const [pending,setPending] = useState({
        p_leaves:null,
        loading:false,
        error:"",
        modal:false,
        pending_leave:null
    });

    // const [leaves,setLeaves]=useState([]);

    const {p_leaves,error,loading,modal,pending_leave} = pending;

    const getPendingLeaves = ()=>{
        let token = JSON.parse(localStorage.getItem("token")).token;
        return fetch("http://localhost:5000/api/leave/pending_all",{
            method:"GET",
            headers:{
                "Authorization":token
            }
        }).then((res)=>{
            return res.json()
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        // p_leaves && p_leaves.map((l) => {
        //     setLeaves([...leaves,getLeaveDetail(l._id)])
        // })
        getPendingLeaves().then((data)=>{
            if(data.err){
                setPending({
                    ...pending,
                    error:data.err,
                    loading:true
                })
            }else{
                //console.log(data)
                setPending({
                    ...pending,
                    loading:true,
                    p_leaves:data
                })
            }
        })
    },[loading])


    const getLeaveDetail =(id)=>{
        let token = JSON.parse(localStorage.getItem("token")).token;
        return fetch(`http://localhost:5000/api/leave/${id}`,{
            method:"GET",
            headers:{
                "Authorization":token
            }
        }).then(res=>{
            return res.json()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const getLeave=(id)=>{
        getLeaveDetail(id).then((data)=>{
            //console.log(data)
            if(data.err){
               console.log(data.err)
            }else{
                //props.history.push("/getLeave",data)
                setPending({
                    ...pending,
                    modal:true,
                    pending_leave:data,
                    loading:true
                })
            }
        })
    }

    const approvingLeave=(id)=>{
        return fetch(`http://localhost:5000/api/leave/approve/${id}`,{
            method:"POST",
            headers:{
                "Authorization":JSON.parse(localStorage.getItem("token")).token,
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            return res.json()
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    const approveLeave =(id)=>{
        approvingLeave(id).then((data)=>{
            if(data.err){
                setPending({
                    ...pending,
                    error:data.err,
                    loading:true
                })
            }else{
               // console.log(data)
                props.history.push("/admin")
            }
        })
    }

    const rejectingLeave=(id)=>{
        return fetch(`http://localhost:5000/api/leave/reject/${id}`,{
            method:"POST",
            headers:{
                "Authorization":JSON.parse(localStorage.getItem("token")).token,
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            return res.json()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const rejectLeave =(id)=>{
        rejectingLeave(id).then((data)=>{
            if(data.err){
                setPending({
                    ...pending,
                    error:data.err,
                    loading:true
                })
            }else{
               // console.log(data)
                props.history.push("/admin")
            }
        })
    }

    return (
        <div>
            {/* {modalView()} */}
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Pending Leaves</h3>
                        {
                            (p_leaves&&loading)?(
                                p_leaves.map((l)=>(
                                    <div className="card shadow p-3 mb-3" style={{backgroundColor:l.leavetype==="Emergency"?"red":""}}> 
                                         <div className="row">
                                            <div className="col-6 col-md-6">
                                                <h5>{l.username}</h5>
                                            </div>
                                            <div className="col-6 col-md-6 d-flex flex-row justify-content-end">
                                                <h6>
                                                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary" onClick={()=>getLeave(l._id)}>View</button>
                                                </h6>
                                                {(pending_leave)&&(
                                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Leave Details</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>Username  : <span style={{color:"#000"}}>{pending_leave.user.username}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>Employee ID  : <span style={{color:"#000"}}>{pending_leave.user.employeid}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>Email  : <span style={{color:"#000"}}>{pending_leave.user.email}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>Department  : <span style={{color:"#000"}}>{pending_leave.user.department}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>Role  : <span style={{color:"#000"}}>{pending_leave.user.role}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>Leave Type  : <span style={{color:"#000"}}>{pending_leave.leave.leavetype}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>Period Type  : <span style={{color:"#000"}}>{pending_leave.leave.periodtype}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>From  : <span style={{color:"#000"}}>{pending_leave.leave.fromdate}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>To  : <span style={{color:"#000"}}>{pending_leave.leave.todate}</span></h3> 
                                                            <h3 style={{color:"#9e1559",textAlign:"left"}}>Reason  : <span style={{color:"#000"}}>{pending_leave.leave.reason}</span></h3> 
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={()=>approveLeave(pending_leave.leave._id)}>Approve</button>
                                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>rejectLeave(pending_leave.leave._id)}>Reject</button>
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )}
                                            </div>   
                                        </div>     
                                    </div>
                                ))
                                
                            ):(
                                <p>Loading...</p>
                            )
                        }
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default PendingLeaves
