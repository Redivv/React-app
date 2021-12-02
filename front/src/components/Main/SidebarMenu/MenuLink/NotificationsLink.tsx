import React from "react";
import { useState } from "react";
import MenuLink from "./MenuLink";
import NotificationsModal from "./MenuModals/NotificationsModal";

const NotificationsLink = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <MenuLink onClick={handleShow} isLinkActive={show}>
        <i className="fas fa-bell"></i>
        <span>Notifications</span>
      </MenuLink>
      <NotificationsModal show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default NotificationsLink;
