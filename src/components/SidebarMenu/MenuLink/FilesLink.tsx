import React from "react";
import { useState } from "react";
import MenuLink from "./MenuLink";
import ArchiveModal from "./MenuModals/ArchiveModal";
import FilesModal from "./MenuModals/FilesModal";

const FilesLink = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <MenuLink onClick={handleShow} isLinkActive={show}>
        <i className="fas fa-folder-open"></i>
        <span> Files</span>
      </MenuLink>
      <FilesModal show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default FilesLink;
