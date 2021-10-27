import React, { useContext, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import CategoriesRequestService from "../services/CategoriesRequestService";
import AuthContext from "../store/auth-context";

const Main: React.FC = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    CategoriesRequestService.getAllCategories(authContext.tokenObject?.idToken!)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response));
  }, [authContext.tokenObject]);

  return (
    <div className="container-fluid vh-100">
      <div className="row h-inherit">
        <SidebarMenu className="col-3"></SidebarMenu>
        <div className="col-9">Duppa</div>
      </div>
    </div>
  );
};

export default Main;
