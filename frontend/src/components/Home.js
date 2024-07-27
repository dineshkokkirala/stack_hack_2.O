import React, { useState } from "react";
import "./Home.css";

const Home = (props) => {
  function myFunc1() {
    var x = document.getElementById("pass");

    var y = document.getElementById("show");
    if (x.type === "password") {
      y.className = "fa-eye fas img";
      x.type = "text";
    } else {
      y.className = "fa-eye-slash fas img";
      x.type = "password";
    }
  }
  function myFunc2() {
    var x = document.getElementById("pass1");

    var y = document.getElementById("show1");
    if (x.type === "password") {
      y.className = "fa-eye fas img";
      x.type = "text";
    } else {
      y.className = "fa-eye-slash fas img";
      x.type = "password";
    }
  }

  const [employee, setEmployee] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
    success: false,
  });
  const [employee2, setEmployee2] = useState({
    email2: "",
    password2: "",
    error2: "",
    loading2: false,
    didRedirect2: false,
    success2: false,
  });
  const { email, password, error,  didRedirect } = employee;
  const { email2, password2, error2,  didRedirect2 } = employee2;
  const changeHandler = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  const changeHandler2 = (event) => {
    setEmployee2({ ...employee2, [event.target.name]:event.target.value });
  };

  const elogin = async (user_data) => {
    return fetch("https://deploy-backend-hr-management.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify(user_data),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authenticate = (data) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", JSON.stringify(data));
      setEmployee({
        ...employee,
        didRedirect: true,
      });
    }
  };

  const authenticate2 = (data) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token2", JSON.stringify(data));
      setEmployee2({
        ...employee2,
        didRedirect2: true,
      });
    }
  };

  const isAuthenticated_true = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("token")||localStorage.getItem("token2")) {
      if(localStorage.getItem("token")){
        return JSON.parse(localStorage.getItem("token"))
      }
      return JSON.parse(localStorage.getItem("token2"));
    } else {
      return false;
    }
  };

  const adminSubmitHandler = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, error: false, loading: true });
    const adminDetails = { email, password };
    elogin(adminDetails)
      .then((data) => {
        if (data.msg) {
          setEmployee({
            ...employee,
            error: data.msg,
            loading: false,
          });
        } else {
          const admin_and_token = {
            isadmin: data.isadmin,
            token: data.token,
            userId:data._id,
            username:data.username
          };
          if(data.isadmin)
          authenticate(admin_and_token);
          else{
            setEmployee({
              ...employee,
              error:"You are not an admin",
              loading:false
            })
          }
        }
      })
      .catch(() => console.log("Login failed"));

      setEmployee({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
        success: false,
      })
  };

  const employeSubmitHandler = (e) => {
    e.preventDefault();
    setEmployee2({ ...employee2, error2: false, loading2: true });
    const employeDetails = { email:email2, password:password2 };
    elogin(employeDetails)
      .then((data) => {
        if (data.msg) {
          setEmployee2({
            ...employee2,
            error2: data.msg,
            loading2: false,
          });
        } else {
          const admin_and_token = {
            isadmin: data.isadmin,
            token: data.token,
            userId:data._id,
            username:data.username
          };
          if(!data.isadmin)
          authenticate2(admin_and_token);
          else{
            setEmployee2({
              ...employee2,
              error2:"You are not an employee",
              loading2:false
            })
          }
        }
      })
      .catch(() => console.log("Login failed"));

      setEmployee2({
        email2: "",
        password2: "",
        error2: "",
        loading2: false,
        didRedirect2: false,
        success2: false,
      })
  };

  const performRedirect = () => {
    if (didRedirect) {
      const bool = isAuthenticated_true();
      if (bool && bool.isadmin) {
        props.history.push("/admin");
      } else {
        props.history.push("/employee");
      }
    }
  };
  const performRedirect2 = () => {
    if (didRedirect2) {
      const bool = isAuthenticated_true();
      if (bool && bool.isadmin) {
        props.history.push("/admin");
      } else {
        props.history.push("/employee");
      }
    }
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    );
  };

  const errorMessage2 = () => {
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

  return (
    <div className="bg-container">
      <div className="container">
        <div className="row"> 
        
          <div className="col-12 col-md-6 mt-5">
            <div
              className="card shadow text-center p-4"
              style={{
                opacity: "0.9",
                backgroundColor: "#1E97B1",
                maxWidth: "400px",
                margin: "100px auto",
              }}
            >
              {errorMessage()}
              <h3 className="mb-5 main_heading">Admin Login</h3>
              <form onSubmit={adminSubmitHandler}>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={changeHandler}
                  />
                </div>
                <div className="form-group div2">
                  <i
                    className="fa-eye-slash fas img"
                    id="show"
                    onClick={myFunc1}
                    style={{ cursor: "pointer" }}
                  ></i>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    id="pass"
                    value={password}
                    onChange={changeHandler}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-success mt-5 w-100 opac"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-5">
            <div
              className="card shadow text-center p-4"
              style={{
                opacity: "0.9",
                backgroundColor: "#294b71 ",
                maxWidth: "400px",
                margin: "100px auto",
              }}
            >
              {errorMessage2()}
              <h3 className="mb-5 main_heading">Employee Login</h3>
              <form onSubmit={employeSubmitHandler}>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    name="email2"
                    className="form-control"
                    placeholder="Email"
                    onChange={changeHandler2}
                    value={email2}
                  />
                </div>
                <div className="form-group div2">
                  <i
                    className="fa-eye-slash fas img"
                    id="show1"
                    onClick={myFunc2}
                    style={{ cursor: "pointer" }}
                  ></i>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="pass1"
                    name="password2"
                    onChange={changeHandler2}
                    value={password2}
                  />
                </div>
                <button
                  className="btn btn-block btn-success mt-5 w-100"
                  type="submit"
                  style={{ opacity: "1" }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {performRedirect()}
      {performRedirect2()}
    </div>
  );
};

export default Home;
