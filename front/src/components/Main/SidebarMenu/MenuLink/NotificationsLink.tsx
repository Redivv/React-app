import React, { useContext } from "react";
import { useState } from "react";
import { Badge } from "react-bootstrap";
import MenuLink from "./MenuLink";
import NotificationsModal from "./MenuModals/NotificationsModal/NotificationsModal";
import classes from "./MenuLink.module.css";
import NotificationContext from "../../../../store/notification-context";

const NotificationsLink = () => {
  const notificationContext = useContext(NotificationContext);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    notificationContext.getAllNotifications();
  };
  return (
    <React.Fragment>
      <MenuLink onClick={handleShow} isLinkActive={show}>
        {notificationContext.notifications.length > 0 && (
          <Badge className={classes.badge}>
            {notificationContext.notifications.length}
          </Badge>
        )}
        <i className="fas fa-bell"></i>
        <span>Notifications</span>
      </MenuLink>
      <NotificationsModal show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default NotificationsLink;
