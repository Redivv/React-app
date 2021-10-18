import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
