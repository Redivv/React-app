import OffersContainer from "./Offers/OffersContainer";
import classes from "./TableBody.module.css";

const TableBody = () => {
  return (
    <main className={`row m-0 ${classes.tableColumns}`}>
      <OffersContainer />
      <div className={`col-3 ${classes.tableColumn}`}></div>
      <div className={`col-3 ${classes.tableColumn}`}></div>
      <div className={`col-3 ${classes.tableColumn}`}></div>
      <div className={`col-3 ${classes.tableColumn}`}></div>
    </main>
  );
};

export default TableBody;
