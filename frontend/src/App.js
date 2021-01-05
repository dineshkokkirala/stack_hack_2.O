import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AuthState from "./context/auth/AuthState";
import Admin from "./components/Admin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import AddEmploye from "./components/AddEmploye";
import Employee from "./components/Employee"



if (localStorage.token) {
  // console.log(localStorage.token);
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/add" component={AddEmploye} />
          <PrivateRoute exact path="/employee" component={Employee} />
        </Switch>
      </BrowserRouter>
    </AuthState>
  );
};

export default App;
