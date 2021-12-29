import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import NotificationContext from "../../../../../../store/notification-context";
import Notification from "../../../../../../types/notification";
import NotificationBlock from "./Notification/NotificationBlock";

const NotificationsModal: React.FC<{ show: boolean; handleClose: () => void }> =
  (props) => {
    const notificationContext = useContext(NotificationContext);
    const [notifications, setNotifications] = useState<Notification[] | []>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      setNotifications(notificationContext.notifications);
      setIsLoaded(notificationContext.areNotificationsLoaded);
      const interval = setInterval(() => {
        notificationContext.getAllNotifications();
      }, 60000);
      return () => clearInterval(interval);
    }, [
      notificationContext.notifications,
      notificationContext.areNotificationsLoaded,
    ]);

    const handleClearAllNotifications = () => {
      notificationContext.clearAllNotifications();
      props.handleClose();
    };
    return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoaded ? (
            <Fragment>
              {notifications.map((notification, index) => (
                <NotificationBlock
                  key={index}
                  notification={notification}
                  ordinalNumber={index}
                  hideModal={props.handleClose}
                />
              ))}
            </Fragment>
          ) : (
            <Spinner
              animation="border"
              variant="primary"
              className="mx-auto mt-5 d-block"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClearAllNotifications}>
            Clear All
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default NotificationsModal;
