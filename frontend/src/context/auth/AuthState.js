import React, { useReducer } from "react";
import AuthContext from "./authContext.js";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import authReducer from "./authReducer.js";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERRORS,
  USER_LOADED,
} from "../types";

const url = "http://localhost:5000";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
    isadmin: null,
    token: localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loaduser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(url + "/api/users/profile");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(url + "/api/users/login", formData, config);
      //res.data.isadmin=true;
      if (res.data.isadmin) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        //console
        loaduser();
      } else alert("You are not an Admin");
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const employeLogin = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(url + "/api/users/login", formData, config);
      //res.data.isadmin=false;
      //console.log(res.data.isadmin);
      if (!res.data.isadmin) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        loaduser();
      } else alert("You are not an Employee");
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        isadmin: state.isadmin,
        login,
        employeLogin,
        loaduser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
