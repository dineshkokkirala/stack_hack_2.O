import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
} from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: true,
        isadmin: action.payload.isadmin,
      };

    case AUTH_ERROR:
    case LOGOUT:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: true,
        user: null,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
