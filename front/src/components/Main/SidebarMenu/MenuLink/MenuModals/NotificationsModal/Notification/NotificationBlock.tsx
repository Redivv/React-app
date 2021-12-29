import { Button, ButtonGroup } from "react-bootstrap";
import classes from "./Notification.module.css";
import React, { useContext } from "react";
import OrderContext from "../../../../../../../store/order-context";
import Notification from "../../../../../../../types/notification";
import NotificationContext from "../../../../../../../store/notification-context";

const NotificationBlock: React.FC<{
  notification: Notification;
  ordinalNumber: number;
  hideModal: () => void;
}> = (props) => {
  const orderContext = useContext(OrderContext);
  const notificationContext = useContext(NotificationContext);

  const handleNotificationSearch = () => {
    if (!props.notification.order_id) {
      return;
    }
    orderContext.setOrdersAreBeingLoaded();
    orderContext.searchOrders(
      String(props.notification.order_id),
      false,
      false
    );
    props.hideModal();
  };

  const handleDeleteNotification = () => {
    notificationContext.deleteNotificationById(
      props.notification.id,
      props.ordinalNumber
    );
  };
  return (
    <ButtonGroup className={classes.notification}>
      <Button
        className={classes.notificationSegment}
        onClick={handleNotificationSearch}
      >
        <span>{props.notification.created_at}</span>
        <span>{props.notification.content}</span>
      </Button>
      <Button
        className={classes.notificationSegment}
        onClick={handleDeleteNotification}
      >
        <i className="fas fa-times"></i>
      </Button>
    </ButtonGroup>
  );
};

export default NotificationBlock;
