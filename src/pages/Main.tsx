import React, { useContext, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import MainTable from "../components/MainTable/MainTable";
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
    <div className="container-fluid vh-100 p-0">
      <div className="row h-inherit">
        <SidebarMenu className="col-3" />
        <MainTable className="col-9" />
      </div>
    </div>
  );
};

export default Main;
