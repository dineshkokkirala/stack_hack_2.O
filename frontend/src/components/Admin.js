import React, {  useEffect, useState } from "react";
import {  withRouter } from "react-router-dom";
import Spinner from "./Spinner";
import "./Admin.css"

const Admin = (props) => {
  const [employees,setEmployees]=useState({error:"",all:null,loading:false});
  const [search, setSearch]=useState("");
  const [category,setCategory]=useState([]);

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
    getEmployeeFullDetails(id).then((data)=>{
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

  const searchHandler=(e)=>{
      if(e.target.checked){
      
      setCategory([...category, e.target.value])
      }
      else{
        const index = category.indexOf(e.target.value);
        if (index > -1) {
          category.splice(index, 1);
        }
         setCategory(category);
      }
      console.log(category);
  }



 
  useEffect(() => {
    getAllEmployees().then((data)=>{
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
    // eslint-disable-next-line
  }, [employees.loading]);

  



  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="row">
      <div class="form-check">
      <input class="form-check-input" type="checkbox" value="username" onChange={searchHandler}  />
    <label class="form-check-label" for="flexCheckChecked">
    Username
    </label>
      </div>
      <div class="form-check">
      <input class="form-check-input" type="checkbox" value="email" onChange={searchHandler}  />
      <label class="form-check-label" for="flexCheckChecked">
      Email
      </label>
    </div>
    <div class="form-check">
  <input class="form-check-input" type="checkbox" value="role" onChange={searchHandler}   />
  <label class="form-check-label" for="flexCheckChecked">
    role
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="department" onChange={searchHandler}  />
  <label class="form-check-label" for="flexCheckChecked">
    department
  </label>
</div>
      
      <div className="col-12 col-md-6">
                            
      <select
      className="form-select"
      onChange={(e)=>setCategory(e.target.value)}
      >
        <option selected>Select Category...</option>
        <option value="username">username</option>
        <option value="email">email</option>
        <option value="department">department</option>
        <option value="role">role</option>
      </select>
      </div>
          <div className="col-12 mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Search Employees by Username, Email, Department, Role"
                  onChange={(e)=>setSearch(e.target.value)}
                />
          </div>
        {employees.all && employees.loading ? (
            employees.all.filter((val)=>{
              if(search===""){
                return val;
              }
              else if(val.username.toLowerCase().includes(search.toLowerCase())){
                return val;
              }
              return null
            }).map((emp) => (
              
              <div key={emp._id} className="col-12 col-md-4 col-lg-3">
                  <div className="card text-center shadow m-2 p-2 bg-danger text-white" >
                    <div className="col-12">
                      <img src={emp.photo} style={{borderRadius:"50%",height:"100px",width:"100px"}} alt="image_of" />
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
                    <button className="btn btn-info emp_btn" onClick={()=>{getEmploye(emp._id)}}>View</button>
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
