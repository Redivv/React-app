import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import classes from "./MenuLink.module.css";

const ArchiveLink = () => {
  const [isActive, setIsActive] = useState(false);
  const handleActivate = () => {
    setIsActive((prevState) => !prevState);
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
