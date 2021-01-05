import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";

const Employee = () => {
  const authContext = useContext(AuthContext);

  const { loaduser, isAuthenticated } = authContext;

  useEffect(() => {
    loaduser();
  }, []);

  return (
    <div>
      <h1>Employee Page</h1>
    </div>
  );
};

export default Employee;
