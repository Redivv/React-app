import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import OrderContext from "../../../../store/order-context";
import classes from "./MenuLink.module.css";

const ArchiveLink = () => {
  const orderContext = useContext(OrderContext);
  const handleActivate = () => {
    orderContext.setOrdersAreBeingLoaded();
    if (orderContext.archiveActive) {
      orderContext.searchOrders(null, true, false);
      return;
    }
    orderContext.getArchivedOrders();
  };
  return (
    <React.Fragment>
      <Button
        className={
          (orderContext.archiveActive ? classes.active : "") +
          " " +
          classes.menuLink
        }
        onClick={handleActivate}
      >
        <i className="fas fa-file-alt"></i>
        <span>Archive</span>
      </Button>
    </React.Fragment>
  );
};

export default ArchiveLink;
