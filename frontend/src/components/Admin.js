import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";

const Admin = () => {
  const authContext = useContext(AuthContext);

  const { loaduser, isAuthenticated } = authContext;

  useEffect(() => {
    // loaduser();
  }, []);

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
          <tr>
            <th scope="row">1002</th>
            <td>Mern</td>
            <td>stack@stack.com</td>
            <td>
              <a href="/">view</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
