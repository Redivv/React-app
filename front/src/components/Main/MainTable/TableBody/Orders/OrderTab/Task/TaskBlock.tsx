import { DragEvent, Fragment, useState } from "react";
import Task from "../../../../../../../types/task";
import classes from "./TaskBlock.module.css";
import TaskModal from "./TaskModal/TaskModal";
import TaskModalArchived from "./TaskModalArchived/TaskModalArchived";

const TaskBlock: React.FC<{
  task: Task;
  ordinalNumber: number;
  parentId: string;
  parentArchivedAt: string | null;
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
      props.task.column_number,
      props.ordinalNumber
    );
  };

  const handleDragTask = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(
      "sourceColumn",
      String(props.task.column_number)
    );
    event.dataTransfer.setData("taskNumber", String(props.ordinalNumber));
    event.dataTransfer.setData("taskParentId", props.parentId);
  };

  const taskCode = props.parentArchivedAt ? (
    <Fragment>
      <div className={classes.task}>
        <header>
          <span onClick={handleShow}>{props.task.title}</span>
        </header>
        <main>
          <div>
            <i className="fas fa-user"></i>
            <span>
              {props.task.user ? props.task.user.email! : "No user assigned"}
            </span>
          </div>
          <div>
            <i className="fas fa-paperclip"></i>
            <span>{props.task.files ? props.task.files.length : "0"}</span>
          </div>
        </main>
      </div>
      <TaskModalArchived
        task={props.task}
        show={show}
        handleClose={handleClose}
      />
    </Fragment>
  ) : (
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
            <span>
              {props.task.user ? props.task.user.email! : "No user assigned"}
            </span>
          </div>
          <div>
            <i className="fas fa-paperclip"></i>
            <span>{props.task.files ? props.task.files.length : "0"}</span>
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

  return taskCode;
};

export default TaskBlock;
