import React from "react";
import classes from "./MenuLink.module.css";

const MenuLink: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLinkActive?: boolean;
  className?: string
}> = (props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    props.onClick(event);
  return (
    <button
      onClick={handleClick}
      className={`${classes.menuLink} btn ${
        props.isLinkActive ? classes.active : ""
      } ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default MenuLink;
