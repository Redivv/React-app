import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Main from "./pages/Main";
import ResetPassword from "./pages/ResetPassword";
import AuthContext from "./store/auth-context";

const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  const availableRoutes = authContext.accessToken ? (
    <Switch>
      <Route path="/main">
        <Main />
      </Route>
      <Redirect to="/main" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/forgot" exact>
        <ForgotPassword />
      </Route>
      <Route path="/reset" exact>
        <ResetPassword />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );

  return <Router>{availableRoutes}</Router>;
};

export default App;
