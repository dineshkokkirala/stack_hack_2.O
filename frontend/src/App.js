import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddEmploye from "./components/AddEmploye";
import Employee from "./components/Employee";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import GetEmployee from "./components/GetEmployee"
import AddLeave from "./components/AddLeave";
import MyLeaves from "./components/MyLeaves";
import PendingLeaves from "./components/PendingLeaves";

const App = () => {
 
  return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <AdminPrivateRoute exact path="/admin" component={Admin} />
          <AdminPrivateRoute exact path="/add" component={AddEmploye} />
          <AdminPrivateRoute exact path="/getEmployee" component={GetEmployee} />
          <PrivateRoute exact path="/employee" component={Employee} />
          <PrivateRoute exact path="/apply_leave" component={AddLeave} />
          <PrivateRoute exact path="/my_leaves" component={MyLeaves} />
          <AdminPrivateRoute exact path="/pending_leaves" component={PendingLeaves} />
        </Switch>
      </BrowserRouter>
  );
};

export default App;
