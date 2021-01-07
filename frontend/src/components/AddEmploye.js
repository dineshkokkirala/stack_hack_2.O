import React, { useState } from "react";

const AddEmploye = (props) => {
  const initialState = {
    firstname: "Dinesh",
    lastname: "kokkirala",
    username: "dineshthop",
    email: "dinesh@thop.com",
    gender: "male",
    dateofbirth: "08/05/2000",
    contactnumber: "65454555",
    maritialstatus: "single",
    address: "dkfjsdfn",
    role: "sdfds",
    salary: "10000000000",
    bloodgroup: "sdfds",
    nationality: "sdf",
    department: "sdf",
    worktype: "sdf",
    joiningdate: "15/5/6515",
    didRedirect:false,
    error:""
  };

  const [employee, setEmployee] = useState(initialState);

  const {
    firstname,
    lastname,
    username,
    email,
    gender,
    dateofbirth,
    contactnumber,
    maritialstatus,
    address,
    role,
    salary,
    bloodgroup,
    nationality,
    department,
    worktype,
    joiningdate,
  } = employee;

  const addEmployee = (data) =>{
    return fetch("http://localhost:5000/api/admin/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":localStorage.getItem("token")
      },
      body:JSON.stringify(data)
    }).then((res)=>{
      return res.json()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const changeHandler = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
   // console.log(employee);
    const input_data = {
      firstname,
      lastname,
      username,
      email,
      gender,
      dateofbirth,
      contactnumber,
      maritialstatus,
      address,
      role,
      salary,
      bloodgroup,
      nationality,
      department,
      worktype,
      joiningdate,
    } 
    //console.log(input_data)
    addEmployee(input_data)
    .then((data)=>{
      console.log(data)
      if(data.err){
        setEmployee({
          ...employee,
          error:data.err,
        })
      } else{
          props.history.push('/admin');
          setEmployee(initialState);
      }
    })
    .catch((err)=>{
      console.log(err)
    })
    setEmployee(initialState);

  };

  return (
    <div className="container mb-5 mt-3 p-4">
      <div className="row">
        <h1>Add Employee</h1>
        <form className="row g-3" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label forHtml="firstname" className="form-label">
              Firstname
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label forHtml="lastname" className="form-label">
              Lastname
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="username"
              value={username}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputPassword4"
              name="email"
              value={email}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">
              Gender
            </label>
            <select
              id="inputState"
              className="form-select"
              name="gender"
              value={gender}
              onChange={changeHandler}
            >
              <option selected>Choose...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="inputPassword4"
              name="dateofbirth"
              value={dateofbirth}
              onChange={changeHandler}
            />
          </div>

          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              name="address"
              value={address}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">
              Contact no
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="contactnumber"
              value={contactnumber}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputCity" className="form-label">
              Marital status
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              name="maritialstatus"
              value={maritialstatus}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputZip" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              name="role"
              value={role}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputZip" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              name="salary"
              value={salary}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputZip" className="form-label">
              Blood Group
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              name="bloodgroup"
              value={bloodgroup}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputZip" className="form-label">
              Nationality
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              name="nationality"
              value={nationality}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputZip" className="form-label">
              Department
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              name="department"
              value={department}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputZip" className="form-label">
              Work type
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              name="worktype"
              value={worktype}
              onChange={changeHandler}
            />
          </div>

          <div className="col-md-6">
            <label for="inputZip" className="form-label">
              Joining Date
            </label>
            <input
              type="date"
              className="form-control"
              id="inputZip"
              name="joiningdate"
              value={joiningdate}
              onChange={changeHandler}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmploye;
