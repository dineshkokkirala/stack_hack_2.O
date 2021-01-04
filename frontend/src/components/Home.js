import React, { useState, useContext, useEffect } from "react";
import "./Home.css";
import AuthContext from "../context/auth/authContext";

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

  const authContext = useContext(AuthContext);

  const { login, isAuthenticated, error, isadmin, employeLogin } = authContext;

  useEffect(() => {
    //console.log(isAuthenticated, isadmin);
    if (isAuthenticated && isadmin) {
      props.history.push("/admin");
    } else if (isAuthenticated && !isadmin) {
      props.history.push("/employee");
    }
  }, [isAuthenticated, props.history, isadmin]);

  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const [employe, setEmploye] = useState(initialState);

  const { email, password } = user;

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const employeChangeHandler = (e) => {
    setEmploye({ ...employe, [e.target.name]: e.target.value });
  };

  const adminSubmitHandler = (e) => {
    e.preventDefault();
    //console.log(user);
    login(user);
    setUser(initialState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    employeLogin(employe);
    setEmploye(initialState);
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
              <form onSubmit={submitHandler}>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={employe.email}
                    onChange={employeChangeHandler}
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
                    value={employe.password}
                    onChange={employeChangeHandler}
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
    </div>
  );
};

export default Home;
