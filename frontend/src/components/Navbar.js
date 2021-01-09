import React, { useEffect } from "react";
import image2 from "../assets/image2.png";
import { Link,withRouter } from "react-router-dom";
import { isadmin_true, isAuthenticated_true,logout } from "../authHelpers";

const Navbar = () => {
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={isadmin_true()?"/admin":isAuthenticated_true()?"/employee":"/"} className="navbar-brand" href="#">
            <img src={image2} alt="Logo" height="50px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={isadmin_true()?"/admin":isAuthenticated_true()?"/employee":"/"} className="nav-link active" aria-current="page">
                  <h1 className="logo_heading">HR Management</h1>
                </Link>
              </li>
            </ul>
            {
              isadmin_true() && (
                <ul className="navbar-nav">
                  <li>
                    <Link to="/add" className="nav-link">
                      Add Employee
                    </Link>
                  </li>
                  <li>
                    <Link onClick={logout} className="nav-link">
                      Logout
                    </Link>
                  </li>
              </ul>
              )
            }
             {
              (isAuthenticated_true()&&!isadmin_true()) && (
                <ul className="navbar-nav">
                  <li>
                    <Link to="/my_leaves" className="nav-link">
                      My Leaves
                    </Link>
                  </li>
                  <li>
                    <Link to="/apply_leave" className="nav-link">
                      Apply Leave
                    </Link>
                  </li>
                  <li>
                    <Link onClick={logout} className="nav-link">
                      Logout
                    </Link>
                  </li>
              </ul>
              )
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default  withRouter(Navbar);
