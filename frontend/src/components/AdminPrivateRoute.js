import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading, isadmin } = authContext;

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(isAuthenticated, loading);

        return !isAuthenticated && !loading && !isadmin ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default AdminPrivateRoute;
