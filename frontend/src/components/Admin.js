import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { isadmin_true } from "../authHelpers";
import AuthContext from "../context/auth/authContext";
import Spinner from "./Spinner";


const Admin = (props) => {
  const authContext = useContext(AuthContext);
 

  const { loaduser, isAuthenticated } = authContext;
  const [employees,setEmployees]=useState({error:"",all:null,loading:false});

  const getAllEmployees = () =>{
    let token = JSON.parse(localStorage.token).token;
    return fetch("http://localhost:5000/api/admin/all",{
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


  const getEmployeeFullDetails = (id) =>{
    let token = JSON.parse(localStorage.getItem("token")).token;
    return fetch(`http://localhost:5000/api/admin/${id}`,{
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

  const getEmploye =(id)=>{
    //console.log(id)
    getEmployeeFullDetails(id).then((data)=>{
     // console.log(data)
      if(data.err){
        setEmployees({
          ...employees,
          error:data.err
        })
      }else{
        props.history.push("/getEmployee",data)
      }
    })
  }



 
  useEffect(() => {
    // loaduser();
    getAllEmployees().then((data)=>{
      // console.log(data)
      if(data.err){
       setEmployees({
        ...employees,
        loading:true,
        error:data.err,
       }       
       )
      }
      else{
       setEmployees({
         ...employees,
         loading:true,
         all:data
       }) 
      }
    }).catch((err)=>{
      console.log(err)
    })
    
  }, [employees.loading]);

  



  return (
    <div className="container" style={{ marginTop: "20px" }}>
      {/* <table className="table">
        <thead className="thead table-dark">
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Preview</th>
          </tr>
        </thead>
        <tbody>    
        {employees.all && employees.loading ? (
          employees.all.map((emp) => (
            <tr key={emp._id}>
              <th scope="row">{emp.employeid}</th>
              <td>{emp.username}</td>
              <td>{emp.email}</td>
              <td>
                <button className="btn btn-info" onClick={()=>{getEmploye(emp._id)}}>View</button>
              </td>
            </tr>
          ))
        ):(
          <Spinner />
        )
        }
        </tbody>
      </table> */}
      <div className="row">
        {employees.all && employees.loading ? (
            employees.all.map((emp) => (
              <div key={emp._id} className="col-12 col-md-4 col-lg-3">
                  <div className="card text-center shadow m-2 p-2 bg-danger text-white" >
                    <div className="col-12">
                      <img src={emp.photo} style={{borderRadius:"50%",height:"100px",width:"100px"}} />
                    </div>
                    <div className="col-12 mt-3">
                      {emp.employeid}
                    </div>
                    <div className="col-12">
                      {emp.department}
                    </div>
                    <div className="col-12">
                      {emp.worktype}
                    </div>
                    <button className="btn btn-info" onClick={()=>{getEmploye(emp._id)}}>View</button>
                  </div>
              </div>
            ))
          ):(
            <Spinner />
          )
          }
      </div>
    </div>
  );
};

export default withRouter(Admin);
