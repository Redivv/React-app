import React from "react";
import { useState } from "react";
import MenuLink from "./MenuLink";
import UsersModal from "./MenuModals/UsersModal/UsersModal";

const UsersLink = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <MenuLink onClick={handleShow} isLinkActive={show}>
        <i className="fas fa-users"></i>
        <span>Users</span>
      </MenuLink>
      <UsersModal show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default UsersLink;
