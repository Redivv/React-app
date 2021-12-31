import classes from "./TableHeader.module.css";

const TableHeader = () => {
  return (
    <header className={`row ${classes.tableHeader}`}>
      <div className={`col-3 ${classes.tableColumnHeader}`}>NEW</div>
      <div className={`col-3 ${classes.tableColumnHeader}`}>ACTIVE</div>
      <div className={`col-3 ${classes.tableColumnHeader}`}>VALIDATION</div>
      <div className={`col-3 ${classes.tableColumnHeader}`}>DONE</div>
    </header>
  );
};

export default TableHeader;
