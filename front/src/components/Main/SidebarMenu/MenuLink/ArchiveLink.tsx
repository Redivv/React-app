import React from "react";
import { useState } from "react";
import MenuLink from "./MenuLink";
import ArchiveModal from "./MenuModals/ArchiveModal";

const ArchiveLink = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <MenuLink onClick={handleShow} isLinkActive={show}>
        <i className="fas fa-file-alt"></i>
        <span>Archive</span>
      </MenuLink>
      <ArchiveModal show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default ArchiveLink;
