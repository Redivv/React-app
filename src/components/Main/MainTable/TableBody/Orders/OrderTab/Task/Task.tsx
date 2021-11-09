import { Fragment, useState } from "react";
import classes from "./Task.module.css";
import TaskModal from "./TaskModal/TaskModal";

const Task = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <div className={classes.task}>
        <header>
          <span onClick={handleShow}>Certyfikat Jakości</span>
        </header>
        <main>
          <div>
            <i className="fas fa-user"></i>
            <span>Random User</span>
          </div>
          <div>
            <i className="fas fa-comment"></i>
            <span>420</span>
          </div>
          <div>
            <i className="fas fa-paperclip"></i>
            <span>5</span>
          </div>
        </main>
      </div>
      <TaskModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default Task;
