import React  from "react";
import { Route, Redirect } from "react-router-dom";
import {isAuthenticated_true} from "../authHelpers/index"

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !isAuthenticated_true() ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PrivateRoute;
