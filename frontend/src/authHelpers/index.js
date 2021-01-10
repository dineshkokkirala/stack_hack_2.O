import { Redirect } from "react-router-dom";

// Checking authenticated or not
  export const isAuthenticated_true = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("token")||localStorage.getItem("token2")) {
      if(localStorage.getItem("token")){
        return JSON.parse(localStorage.getItem("token"))
      }
      return JSON.parse(localStorage.getItem("token2"));
    } else {
      return false;
    }
  };

  //Check admin or not
  export const isadmin_true = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  };

// Logout 
export const logout =()=>{
    if(localStorage.getItem("token")){
        window.localStorage.removeItem("token")
        return <Redirect to="/" />
    }
    if(localStorage.getItem("token2")){
        window.localStorage.removeItem("token2")
        return <Redirect to="/" />
    }
}