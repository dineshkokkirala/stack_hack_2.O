import React, { useContext, useEffect, useState } from "react";
import { isadmin_true } from "../authHelpers";
import AuthContext from "../context/auth/authContext";


const Admin = () => {
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
    })
    
  }, [employees.loading]);

  



  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <table className="table">
        <thead className="thead table-dark">
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Preview</th>
          </tr>
        </thead>
        <tbody>    
        {employees.all && 
          employees.all.map((emp) => (
            <tr key={emp._id}>
              <th scope="row">{emp.employeid}</th>
              <td>{emp.username}</td>
              <td>{emp.email}</td>
              <td>
                <a href="/">view</a>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
