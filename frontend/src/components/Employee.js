import React, {  useEffect, useState } from "react";
import Spinner from "./Spinner";

const Employee = () => {  
  const [employee,setEmployee] = useState({error:"",loading:false,user:null});
  const [changePasswords,setChangePasswords] = useState({
    old_password:"",
    new_password:"",
    confirm_password:"",
    error2:"",
    success:""
  })
  const {old_password,new_password,confirm_password,error2,success} =changePasswords

  const changeHandler = (e)=>{
    setChangePasswords({...changePasswords,[e.target.name]:e.target.value})
  }
  const {loading,user}=employee;

  const changingPasswords = (input_fields)=>{
    let token = JSON.parse(localStorage.getItem("token2")).token;
    let userId = JSON.parse(localStorage.getItem("token2")).userId;
    return fetch(`https://deploy-backend-hr-management.onrender.com/api/admin/change/${userId}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },
      body:JSON.stringify(input_fields)
    }).then((res)=>{
      return res.json()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const submitHandler =(e)=>{
    e.preventDefault();
    const input_data={
      old_password,
      new_password,
      confirm_password
    }
    changingPasswords(input_data).then((data)=>{
      if(data.err){
        setChangePasswords({...changePasswords,error2:data.err})
      }else{
        setChangePasswords({
          ...changePasswords,
          error2:"",
          success:data.msg
        })
      }
    })
    setChangePasswords({
      old_password:"",
      new_password:"",
      confirm_password:"",
      error2:"",
      success:""
    })
  }

  // function myFunc1() {
  //   var x = document.getElementById("pass");

  //   var y = document.getElementById("show");
  //   if (x.type === "password") {
  //     y.className = "fa-eye fas img";
  //     x.type = "text";
  //   } else {
  //     y.className = "fa-eye-slash fas img";
  //     x.type = "password";
  //   }
  // }


  const getEmployee = (id) =>{
    let token =JSON.parse(localStorage.getItem("token2")).token;
    return fetch(`https://deploy-backend-hr-management.onrender.com/api/admin/${id}`,{
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

  const errorMessage = () => {
    return (
      <div className="row">
        <div
          className="alert alert-danger"
          style={{ display: error2 ? "" : "none" }}
        >
          {error2}
        </div>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          {success}
        </div>
      </div>
    );
  };

  let userId=JSON.parse(localStorage.getItem("token2")).userId;

  useEffect(() => {
    getEmployee(userId).then((data)=>{
      if(data.err){
       setEmployee({
        ...employee,
        error:data.err,
        loading:true
       })
      }else{
        setEmployee({
          ...employee,
          user:data,
          loading:true
        })
      }
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {(user&&loading)?(
        <div className="container mt-4">
        <div className="row">
            <div className="col-12 col-md-4 mt-4">
                <div className="card text-center shadow p-4">
                    <img src={user.photo} alt={user.username} style={{borderRadius:"50%"}} />
                    <h2 className="mt-3">{user.username}</h2>
                    <h3>{user.role}</h3>
                    <h3>{user.address}</h3>
                </div>
                <div className="card mt-5 shadow p-4">
                  {errorMessage()}
                  {successMessage()}
                    <form className="form-group" onSubmit={submitHandler}>
                        <label className="form-label"><h5>Change your password</h5></label>
                        <div className="form-group div2">
                          {/* <i className="fa-eye-slash fas img" id="show1" style={{ cursor: "pointer" }}></i> */}
                          <input type="password" placeholder="Old Password" name="old_password" value={old_password} onChange={changeHandler} className="form-control mb-2" />
                        </div>
                        <input type="password" placeholder="New Password" name="new_password" value={new_password} onChange={changeHandler} className="form-control mb-2" />
                        <input type="password" placeholder="Confirm Password" name="confirm_password" value={confirm_password} onChange={changeHandler} className="form-control mb-3" />
                        <button className="btn w-100 btn-success">Change Password</button>
                    </form>
                </div>
            </div>
            <div className="col-12 col-md-8 mt-4">
                <div className="card shadow p-3">
                    <div className="col-12">
                        <h5>Employee ID: <span style={{color:"gray"}}>{user.employeid}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Firstname: <span style={{color:"gray"}}>{user.firstname}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Lastname: <span style={{color:"gray"}}>{user.lastname}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Email: <span style={{color:"gray"}}>{user.email}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Phone: <span style={{color:"gray"}}>{user.contactnumber}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Date of Birth: <span style={{color:"gray"}}>{user.dateofbirth}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Address: <span style={{color:"gray"}}>{user.address}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Department: <span style={{color:"gray"}}>{user.department}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Role: <span style={{color:"gray"}}>{user.role}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Salary: <span style={{color:"gray"}}>{user.salary}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Joining Date: <span style={{color:"gray"}}>{user.joiningdate}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Gender: <span style={{color:"gray"}}>{user.gender}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Maritial Status: <span style={{color:"gray"}}>{user.maritialstatus}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Nationality: <span style={{color:"gray"}}>{user.nationality}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Blood Group: <span style={{color:"gray"}}>{user.bloodgroup}</span></h5>
                        <hr />
                    </div>
                    <div className="col-12">
                        <h5>Work Type: <span style={{color:"gray"}}>{user.worktype}</span></h5>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    </div>
      ):(
        <Spinner />
      )}
    </div>
  );
};

export default Employee;
