import { DragEvent, Fragment, useState } from "react";
import Task from "../../../../../../../types/task";
import classes from "./TaskBlock.module.css";
import TaskModal from "./TaskModal/TaskModal";

const TaskBlock: React.FC<{
  task: Task;
  ordinalNumber: number;
  parentId: string;
  handleEditTask: (taskObject: Task, ordinalNumber: number) => void;
  handleDeleteTask: (
    taskId: string,
    parentId: string,
    columnNumber: number,
    ordinalNumber: number
  ) => void;
}> = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleDeleteTask = () => {
    props.handleDeleteTask(
      props.task.id!,
      props.parentId,
      props.task.columnNumber,
      props.ordinalNumber
    );
  };

  const handleDragTask = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("sourceColumn", String(props.task.columnNumber));
    event.dataTransfer.setData("taskNumber", String(props.ordinalNumber));
    event.dataTransfer.setData("taskParentId", props.parentId);
  };

  return (
    <Fragment>
      <div
        draggable="true"
        onDragStart={handleDragTask}
        className={classes.task}
      >
        <header>
          <span onClick={handleShow}>{props.task.title}</span>
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
          <div className={classes.actionRow}>
            <i className="fas fa-trash-alt" onClick={handleDeleteTask}></i>
          </div>
        </main>
      </div>
      <TaskModal
        task={props.task}
        parentId={props.parentId}
        show={show}
        handleClose={handleClose}
        handleEditTask={props.handleEditTask}
        ordinalNumber={props.ordinalNumber}
      />
    </Fragment>
  );
};

export default TaskBlock;
