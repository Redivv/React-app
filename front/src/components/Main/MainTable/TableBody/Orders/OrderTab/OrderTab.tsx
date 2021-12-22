import React, {
  DragEvent,
  Fragment,
  useContext,
  useState,
  useEffect,
} from "react";
import { Accordion, Spinner } from "react-bootstrap";
import TaskRequestService from "../../../../../../services/TaskRequestService";
import AuthContext from "../../../../../../store/auth-context";
import OrderContext from "../../../../../../store/order-context";
import Order from "../../../../../../types/order";
import OrderModal from "./OrderModal/OrderModal";
import classes from "./OrderTab.module.css";
import NewTaskButton from "./Task/NewTaskButton";
import TaskBlock from "./Task/TaskBlock";
import Task from "../../../../../../types/task";

const OrderTab: React.FC<{
  order: Order;
  ordinalNumber: number;
}> = (props) => {
  const orderContext = useContext(OrderContext);
  const authContext = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [childTasks, setChildTasks] = useState<
    [Task[], Task[], Task[], Task[]] | []
  >([]);

  const handleClose = () => setShow(false);
  const handleShow = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShow(true);
  };

  const handleDeleteOrder = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    orderContext.deleteOrderById(props.ordinalNumber, props.order.id!);
  };

  const handleArchiveOrder = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    orderContext.archiveOrderById(props.ordinalNumber, props.order.id!);
  };

  const handleUnArchiveOrder = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    orderContext.unArchiveOrderById(props.ordinalNumber, props.order.id!);
  };

  const getAllTasks = () => {
    if (childTasks.length !== 0) {
      return;
    }
    let retrivedTasks: [Task[], Task[], Task[], Task[]] = [
      [] as Task[],
      [] as Task[],
      [] as Task[],
      [] as Task[],
    ];
    TaskRequestService.getAllTasksByOrderID(
      authContext.accessToken!,
      props.order.id!
    )
      .then((response) => {
        for (const taskId in response.data!) {
          let currentTask = response.data[taskId];
          const currentTaskColumnNumber = currentTask.column_number;
          retrivedTasks[currentTaskColumnNumber].push(currentTask);
        }
        setChildTasks(retrivedTasks);
      })
      .catch((error) => console.log(error.response));
  };

  const handleNewTask = (taskObject: Task) => {
    let displayedTasksHelper = childTasks;
    displayedTasksHelper[taskObject.column_number] = [
      taskObject,
      ...displayedTasksHelper[taskObject.column_number],
    ];
    setChildTasks([...displayedTasksHelper]);
  };
  const handleEditTask = (taskObject: Task, ordinalNumber: number) => {
    let displayedTasksHelper = childTasks;
    displayedTasksHelper[taskObject.column_number][ordinalNumber] = taskObject;
    setChildTasks([...displayedTasksHelper]);
  };
  const handleDeleteTask = (
    taskId: string,
    parentId: string,
    columnNumber: number,
    ordinalNumber: number
  ) => {
    if (!window.confirm("Confirm deleting the task")) {
      return;
    }
    let displayedTasksHelper = childTasks;
    displayedTasksHelper[columnNumber].splice(ordinalNumber, 1);
    setChildTasks([...displayedTasksHelper]);
    TaskRequestService.deleteTaskById(
      authContext.accessToken!,
      parentId,
      taskId
    ).catch(() => alert("Invalid data. Changes not saved"));
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleTaskDrop = (event: DragEvent<HTMLDivElement>) => {
    const sourceColumnNumber = Number(
      event.dataTransfer.getData("sourceColumn")
    );
    const taskOrdinalNumber = Number(event.dataTransfer.getData("taskNumber"));
    const targetColumnNumber = Number(
      event.currentTarget.getAttribute("data-columnumber")
    );
    const taskParentId = event.dataTransfer.getData("taskParentId");
    let displayedTasksHelper = childTasks;
    const draggedTask =
      displayedTasksHelper[sourceColumnNumber][taskOrdinalNumber];
    draggedTask.column_number = targetColumnNumber;
    displayedTasksHelper[sourceColumnNumber].splice(taskOrdinalNumber, 1);
    displayedTasksHelper[targetColumnNumber] = [
      draggedTask,
      ...displayedTasksHelper[targetColumnNumber],
    ];
    setChildTasks([...displayedTasksHelper]);
    TaskRequestService.editTaskColumnNumber(
      authContext.accessToken!,
      taskParentId,
      draggedTask.id!,
      draggedTask.column_number
    ).catch(() => alert("Invalid data. Changes not saved"));
  };

  useEffect(() => {
    Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        "h2[class^='OrderTab']>.accordion-button:not(.collapsed), div[class*=' OrderTab']>.accordion-button:not(.collapsed)"
      )
    ).forEach((node) => node.click());
  }, []);
  return (
    <Fragment>
      <Accordion.Item eventKey={props.order.id!}>
        <Accordion.Header className={classes.orderTab} onClick={getAllTasks}>
          <span>{props.order.client} </span>-
          <span> {props.order.shipping_deadline}</span>
          {props.order.archived_at ? (
            <span
              className={classes.unArchiveOrderButton}
              onClick={handleUnArchiveOrder}
            >
              <i className="fas fa-redo-alt"></i>
            </span>
          ) : (
            <Fragment>
              <span className={classes.editOrderButton} onClick={handleShow}>
                <i className="fas fa-edit"></i>
              </span>
              <span
                className={classes.archiveOrderButton}
                onClick={handleArchiveOrder}
              >
                <i className="fas fa-file-alt"></i>
              </span>
              <span
                className={classes.deleteOrderButton}
                onClick={handleDeleteOrder}
              >
                <i className="fas fa-trash-alt"></i>
              </span>
            </Fragment>
          )}
        </Accordion.Header>
        <Accordion.Body>
          {childTasks.length !== 0 ? (
            <div className="d-flex">
              <div
                className={`col-3 ${classes.tableColumn}`}
                onDragOver={allowDrop}
                onDrop={handleTaskDrop}
                data-columnumber="0"
              >
                {childTasks[0].map((task, index) => (
                  <TaskBlock
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                    key={task.id}
                    ordinalNumber={index}
                    parentId={props.order.id!}
                    parentArchivedAt={props.order.archived_at}
                  />
                ))}
                {!props.order.archived_at && (
                  <NewTaskButton
                    handleNewTask={handleNewTask}
                    parentId={props.order.id!}
                  />
                )}
              </div>
              <div
                className={`col-3 ${classes.tableColumn}`}
                onDragOver={allowDrop}
                onDrop={handleTaskDrop}
                data-columnumber="1"
              >
                {childTasks[1].map((task, index) => (
                  <TaskBlock
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                    key={task.id}
                    ordinalNumber={index}
                    parentId={props.order.id!}
                    parentArchivedAt={props.order.archived_at}
                  />
                ))}
              </div>
              <div
                className={`col-3 ${classes.tableColumn}`}
                onDragOver={allowDrop}
                onDrop={handleTaskDrop}
                data-columnumber="2"
              >
                {childTasks[2].map((task, index) => (
                  <TaskBlock
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                    key={task.id}
                    ordinalNumber={index}
                    parentId={props.order.id!}
                    parentArchivedAt={props.order.archived_at}
                  />
                ))}
              </div>
              <div
                className={`col-3 ${classes.tableColumn}`}
                onDragOver={allowDrop}
                onDrop={handleTaskDrop}
                data-columnumber="3"
              >
                {childTasks[3].map((task, index) => (
                  <TaskBlock
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                    key={task.id}
                    ordinalNumber={index}
                    parentId={props.order.id!}
                    parentArchivedAt={props.order.archived_at}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Spinner
              animation="border"
              variant="primary"
              className="d-block mx-auto mt-3"
            />
          )}
        </Accordion.Body>
      </Accordion.Item>
      <OrderModal
        show={show}
        handleClose={handleClose}
        order={props.order}
        ordinalNumber={props.ordinalNumber}
      />
    </Fragment>
  );
};

export default OrderTab;
