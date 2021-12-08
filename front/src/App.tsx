import React, { Fragment, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import AuthContext from "./store/auth-context";

const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  const availableRoutes = authContext.accessToken ? (
    <Fragment>
      <Redirect to="/main" />
      <Route path="/main" strict>
        <Main />
      </Route>
    </Fragment>
  ) : (
    <Fragment>
      <Route path="/login" strict>
        <Login />
      </Route>
      <Redirect to="/login" />
    </Fragment>
  );

  return (
    <Router>
      <Switch>{availableRoutes}</Switch>
    </Router>
  );
};

export default App;
