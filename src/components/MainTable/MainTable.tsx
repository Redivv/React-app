import React from "react";
import classes from "./MainTable.module.css";
import TableBody from "./TableBody/TableBody";
import TableHeader from "./TableHeader/TableHeader";

const MainTable: React.FC<{ className: string }> = (props) => {
  return (
    <main className={`${props.className} p-0 ${classes.mainTable}`}>
      <TableHeader />
      <TableBody />
    </main>
  );
};

export default MainTable;
