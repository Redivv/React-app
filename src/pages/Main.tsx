import React, { useContext, useEffect } from "react";
import CategoriesRequestService from "../services/CategoriesRequestService";
import AuthContext from "../store/auth-context";

const Main: React.FC = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    CategoriesRequestService.getAllCategories(authContext.tokenObject?.idToken!)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response));
  }, [authContext.tokenObject]);

  return <button onClick={authContext.logout}>Penis</button>;
};

export default Main;
