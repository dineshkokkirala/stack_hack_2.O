import { Redirect } from "react-router-dom";

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


export const logout =()=>{
    if(localStorage.getItem("token")){
        localStorage.removeItem("token")
        return <Redirect to="/" />
    }
    if(localStorage.getItem("token2")){
        localStorage.removeItem("token2")
        return <Redirect to="/" />
    }
}