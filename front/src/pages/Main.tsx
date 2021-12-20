import React from "react";
import MainTable from "../components/Main/MainTable/MainTable";
import SidebarMenu from "../components/Main/SidebarMenu/SidebarMenu";
import "../modals.css";
import { OrderContextProvider } from "../store/order-context";
import { UserContextProvider } from "../store/user-context";

const Main: React.FC = () => {
  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-inherit">
        <OrderContextProvider>
          <UserContextProvider>
            <SidebarMenu className="col-3" />
            <MainTable className="col-9" />
          </UserContextProvider>
        </OrderContextProvider>
      </div>
    </div>
  );
};

export default Main;
