import React  from "react";
import { Route, Redirect } from "react-router-dom";
import {isAuthenticated_true} from "../authHelpers/index"

const PrivateRoute = ({ component: Component, ...rest }) => {
  
 

  return (
    <Route
      {...rest}
      render={(props) => {
        //console.log(isAuthenticated, loading);

        return !isAuthenticated_true() ? (
          <Redirect to="/" />
        ) : (
          // <Redirect to={{
          //   pathname:"/",
          //   state:{from:props.location}
          // }} />
          <Component {...props} />
        );
      }}
    />
  );
};

export default PrivateRoute;
