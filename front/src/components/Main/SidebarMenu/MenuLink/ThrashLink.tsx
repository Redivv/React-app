import React from "react";
import { useState } from "react";
import MenuLink from "./MenuLink";
import TrashModal from "./MenuModals/TrashModal";

const TrashLink = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <MenuLink onClick={handleShow} isLinkActive={show}>
        <i className="fas fa-trash-alt"></i>
        <span>Trash</span>
      </MenuLink>
      <TrashModal show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default TrashLink;
