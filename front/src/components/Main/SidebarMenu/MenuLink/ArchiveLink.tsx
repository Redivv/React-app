import React, { useContext } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import OrderContext from "../../../../store/order-context";
import classes from "./MenuLink.module.css";

const ArchiveLink = () => {
  const [isActive, setIsActive] = useState(false);
  const orderContext = useContext(OrderContext);
  const handleActivate = () => {
    setIsActive((prevState) => !prevState);
    orderContext.setOrdersAreBeingLoaded();
    if (isActive) {
      orderContext.setArchiveIsInactive();
      orderContext.searchOrders(null, true, true);
      return;
    }
    orderContext.getArchivedOrders();
  };
  return (
    <React.Fragment>
      <Button
        className={(isActive ? classes.active : "") + " " + classes.menuLink}
        onClick={handleActivate}
      >
        <i className="fas fa-file-alt"></i>
        <span>Archive</span>
      </Button>
    </React.Fragment>
  );
};

export default ArchiveLink;
