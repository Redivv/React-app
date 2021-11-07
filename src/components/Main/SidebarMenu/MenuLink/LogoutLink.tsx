import React from "react";
import { useContext } from "react";
import AuthContext from "../../../../store/auth-context";
import MenuLink from "./MenuLink";

const LogoutLink = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <React.Fragment>
      <MenuLink className="position-absolute bottom-0" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Logout</span>
      </MenuLink>
    </React.Fragment>
  );
};

export default LogoutLink;
