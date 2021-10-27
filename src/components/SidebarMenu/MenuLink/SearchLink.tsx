import React from "react";
import { useState } from "react";
import MenuLink from "./MenuLink";
import SearchModal from "./MenuModals/SearchModal";

const SearchLink = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <MenuLink onClick={handleShow} isLinkActive={show}>
        <i className="fas fa-search"></i>
        <span> Search</span>
      </MenuLink>
      <SearchModal show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default SearchLink;
