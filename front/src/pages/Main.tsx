import React from "react";
import MainTable from "../components/Main/MainTable/MainTable";
import SidebarMenu from "../components/Main/SidebarMenu/SidebarMenu";
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
