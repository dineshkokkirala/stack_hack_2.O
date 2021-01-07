import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import {isadmin_true,isAuthenticated_true} from "../authHelpers/index"

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading, isadmin } = authContext;

  return (
    <Route
      {...rest}
      render={(props) => {
        //console.log(isAuthenticated, loading);

        return (!isAuthenticated_true())? (
          <Redirect to="/" />
        ) :!isadmin_true()?(
          <Redirect to="/employee" />
        ): (
          <Component {...props} />
        );
      }}
    />
  );
};

export default AdminPrivateRoute;
