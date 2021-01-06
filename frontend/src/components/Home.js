import React, { useState, useContext, useEffect } from "react";
import "./Home.css";
// import AuthContext from "../context/auth/authContext";
import axios from "axios";
import Employee from "./Employee";
import { Redirect } from "react-router-dom";

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

  // const authContext = useContext(AuthContext);

  // const { login, isAuthenticated, error, isadmin, employeLogin } = authContext;

  // useEffect(() => {
  //   //console.log(isAuthenticated, isadmin);
  //   if (isAuthenticated && isadmin) {
  //     props.history.push("/admin");
  //   } else if (isAuthenticated && !isadmin) {
  //     props.history.push("/employee");
  //   } else {
  //     //console.log("nul");
  //     props.history.push("/");
  //   }
  // }, [isAuthenticated, props.history, isadmin]);

  // const initialState = {
  //   email: "",
  //   password: "",
  // };

  // const [user, setUser] = useState(initialState);

  // const [employe, setEmploye] = useState(initialState);

  // const { email, password } = user;

  // const changeHandler = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  // const employeChangeHandler = (e) => {
  //   setEmploye({ ...employe, [e.target.name]: e.target.value });
  // };

  // const adminSubmitHandler = (e) => {
  //   e.preventDefault();
  //   //console.log(user);
  //   login(user);
  //   setUser(initialState);
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   employeLogin(employe);
  //   setEmploye(initialState);
  // };
  const [employee, setEmployee] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
    success: false,
  });
  const { email, password, error, loading, didRedirect } = employee;
  const changeHandler = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const elogin = async (user_data) => {
    return fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  const isAuthenticated_true = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  };

  const adminSubmitHandler = (e) => {
    e.preventDefault();
    setEmployee({ ...employee, error: false, loading: true });
    const adminDetails = { email, password };
    //console.log(adminDetails)
    //  const indata =  elogin(adminDetails)
    // console.log(indata)
    elogin(adminDetails)
      .then((data) => {
        if (data.msg) {
          setEmployee({
            ...employee,
            error: data.msg,
            loading: false,
          });
          //console.log(employee);
        } else {
          const admin_and_token = {
            isadmin: data.isadmin,
            token: data.token,
          };
          //console.log(admin_and_token);
          authenticate(admin_and_token);
        }
        //console.log(employee);
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

  const performRedirect = () => {
    if (didRedirect) {
      //console.log(employee);
      const bool = isAuthenticated_true();
      // console.log(bool);
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
              <h3 className="mb-5 main_heading">Employee Login</h3>
              <form>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
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
                    name="password"
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
    </div>
  );
};

export default Home;
