import React, { useState } from 'react'

const AddLeave = (props) => {

    const [leave,setLeave] = useState({
        leave_type:"",
        period_type:"",
        from_date:"",
        to_date:"",
        reason:"",
        error:"",
        didRedirect:false
    })

    const {from_date,to_date,reason,leave_type,period_type,error} =leave;


    const changeHandler = (e) =>{
        setLeave({...leave,[e.target.name]:e.target.value})
    }

    const applyLeave =(data)=>{
        let token = JSON.parse(localStorage.getItem("token2")).token
        return fetch("http://localhost:5000/api/leave/addleave",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify(data)
        }).then((res)=>{
            return res.json()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const submitHandler =(e)=>{
        e.preventDefault();
        const leave_data = {
            leavetype:leave_type,
            reason,
            fromdate:from_date,
            todate:to_date,
            periodtype:period_type
        }
        applyLeave(leave_data)
        .then((data)=>{
            if(data.err){
                setLeave({
                    ...leave,
                    error:data.err
                })
            }else{
               props.history.push("/my_leaves")
            }
        }).catch((err)=>{
            console.log(err)
        })


        setLeave({
            leave_type:"",
            period_type:"",
            from_date:"",
            to_date:"",
            reason:""
        })
    }


    const errorMessage = () =>{
        return(
            <div className="row">
                <div className="alert alert-danger" style={{ display:error ? "" : "none" }}>
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="container mb-4 mt-4">
            <div className="row">
                {errorMessage()}
                <form className="form-group" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="leave_type" className="form-label">
                                <h5>Leave Type</h5>
                            </label>
                            <select
                                className="form-select"
                                name="leave_type"
                                value={leave_type}
                                onChange={changeHandler}
                            >
                                <option selected defaultValue="">Choose...</option>
                                <option value="Official">Official</option>
                                <option value="Personal">Personal</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="period_type" className="form-label">
                                <h5>Full or Half</h5>
                            </label>
                            <select
                                className="form-select"
                                name="period_type"
                                value={period_type}
                                onChange={changeHandler}
                            >
                                <option selected>Choose...</option>
                                <option value="Full Days">Full Days</option>
                                <option value="Half Days">Half Days</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-6 mt-4">
                            <label htmlFor="from_date" className="form-label">
                                <h5>From Date</h5>
                            </label>
                            <input type="date" name="from_date" className="form-control" value={from_date} onChange={changeHandler} />
                        </div>
                        <div className="col-12 col-md-6 mt-4">
                            <label htmlFor="to_date" className="form-label">
                                <h5>To Date</h5>
                            </label>
                            <input type="date" name="to_date" className="form-control" value={to_date} onChange={changeHandler} />
                        </div>
                        <div className="col-12 mt-4">
                            <label htmlFor="reason" className="form-label"><h5>Reason :</h5></label>
                            <textarea className="form-control" name="reason" value={reason} onChange={changeHandler} rows="8" placeholder="PLEASE GIVE YOUR DETAILED REASON" style={{border:"2px solid #000"}}></textarea>
                        </div>
                    </div>
                    <button className="btn w-100 mt-4" style={{backgroundColor:"green",color:"#fff"}}>Apply Leave</button>
                </form>
            </div>  
        </div>
    )
}

export default AddLeave
