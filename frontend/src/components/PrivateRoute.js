import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) => {
        //console.log(isAuthenticated, loading);

        return !isAuthenticated && !loading ? (
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
