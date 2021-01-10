import React from "react";
import { Route, Redirect } from "react-router-dom";
import {isadmin_true,isAuthenticated_true} from "../authHelpers/index"

const AdminPrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) => {
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
