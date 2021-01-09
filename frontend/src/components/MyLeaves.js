import React, { useEffect, useState } from 'react'

const MyLeaves = () => {

    const [myLeaves,setMyLeaves] = useState({loading:false,error:"",leaves:null});
   

    const getMyLeaves = () =>{
        let token = JSON.parse(localStorage.getItem("token2")).token;
        return fetch("http://localhost:5000/api/leave/my_leaves",{
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
        getMyLeaves().then((data)=>{
            if(data.err){
                setMyLeaves({
                    ...myLeaves,
                    loading:true,
                    error:data.err
                })
            }else{
                setMyLeaves({
                    ...myLeaves,
                    loading:true,
                    leaves:data
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    },[myLeaves.loading])

    return (
        <div className="container mt-4 mb-4">
            <div className="row">
                <div className="col-12">
                    <h1>My Leaves</h1>
                    <p>
                        Note: Orange-Pending, Green-Approved, Red-Rejected
                    </p>
                    {
                        (myLeaves.leaves&&myLeaves.loading)?(
                            myLeaves.leaves.map((leave)=>(
                               <div className="card shadow p-3 mb-3">
                                   <div className="container">
                                        <div className="row">
                                            <div className="col-12 col-md-3">
                                                <h4>{leave.leavetype}</h4>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <h4>{leave.fromdate} to {leave.todate}</h4>
                                            </div>
                                            <div className="col-12 d-flex flex-row col-md-3">
                                                <div style={{border:"2px solid #000",width:"30px",height:"30px",borderRadius:"50%",marginRight:"20px",backgroundColor:leave.approvedstatus===0?"orange":""}}>

                                                 </div>   
                                                <div style={{border:"2px solid #000",width:"30px",height:"30px",borderRadius:"50%",marginRight:"20px",backgroundColor:leave.approvedstatus===1?"green":""}}>

                                                 </div>   
                                                <div style={{border:"2px solid #000",width:"30px",height:"30px",borderRadius:"50%",backgroundColor:leave.approvedstatus===2?"red":""}}>

                                                 </div>   
                                            </div>

                                        </div>    
                                    </div>
                                   
                                </div>
                            ))
                            
                        ):(
                            <p>Loading..</p>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default MyLeaves
