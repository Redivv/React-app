import React from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import MainTable from "../components/MainTable/MainTable";
import "../modals.css";

const Main: React.FC = () => {
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
