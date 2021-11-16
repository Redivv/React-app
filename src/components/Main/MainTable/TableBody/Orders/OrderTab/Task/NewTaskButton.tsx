import { Fragment, useState } from "react";
import classes from "./NewTaskButton.module.css";
import TaskModal from "./TaskModal/TaskModal";
import Task from "../../../../../../../types/task";

const NewTaskButton: React.FC<{
  parentId: string;
  handleNewTask: (taskObject: Task) => void;
}> = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div className={classes.newTask} onClick={handleShow}>
        <main>
          <p>Add new task</p>
          <i className="fas fa-plus"></i>
        </main>
      </div>
      <TaskModal
        handleNewTask={props.handleNewTask}
        parentId={props.parentId}
        show={show}
        handleClose={handleClose}
      />
    </Fragment>
  );
};

export default NewTaskButton;
