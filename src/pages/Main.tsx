import axios from "axios";
import React, { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";

const Main: React.FC = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        process.env
          .REACT_APP_FIREBASE_DB_API_ROUTE!.replace(
            "<DB_ROUTE>",
            "/orders.json"
          )
          .replace("<ID_TOKEN>", authContext.token!)
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response));
  }, [authContext.token]);

  return <button onClick={authContext.logout}>Penis</button>;
};

export default Main;
