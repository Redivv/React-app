import React from "react";
import { NotificationContextProvider } from "../../../store/notification-context";
import ArchiveLink from "./MenuLink/ArchiveLink";
import LogoutLink from "./MenuLink/LogoutLink";
import NotificationsLink from "./MenuLink/NotificationsLink";
import SearchLink from "./MenuLink/SearchLink";
import UsersLink from "./MenuLink/UsersLink";
import classes from "./SidebarMenu.module.css";

const SidebarMenu: React.FC<{ className: string }> = (props) => {
  return (
    <aside
      className={`${props.className} ${classes.sidebarMenu} position-relative`}
    >
      <NotificationContextProvider>
        <NotificationsLink />
        <UsersLink />
        <SearchLink />
        <ArchiveLink />
        <LogoutLink />
      </NotificationContextProvider>
    </aside>
  );
};

export default SidebarMenu;
