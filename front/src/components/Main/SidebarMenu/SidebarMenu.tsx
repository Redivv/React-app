import React from "react";
import ArchiveLink from "./MenuLink/ArchiveLink";
import FilesLink from "./MenuLink/FilesLink";
import LogoutLink from "./MenuLink/LogoutLink";
import NotificationsLink from "./MenuLink/NotificationsLink";
import SearchLink from "./MenuLink/SearchLink";
import TrashLink from "./MenuLink/ThrashLink";
import UsersLink from "./MenuLink/UsersLink";
import classes from "./SidebarMenu.module.css";

const SidebarMenu: React.FC<{ className: string }> = (props) => {
  return (
    <aside
      className={`${props.className} ${classes.sidebarMenu} position-relative`}
    >
      <NotificationsLink />
      <UsersLink />
      <SearchLink />
      <ArchiveLink />
      <LogoutLink />
    </aside>
  );
};

export default SidebarMenu;
