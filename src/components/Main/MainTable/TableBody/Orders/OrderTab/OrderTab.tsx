import React, { Fragment, useContext, useState } from "react";
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
      authContext.tokenObject?.idToken!,
      props.order.id!
    )
      .then((response) => {
        for (const taskId in response.data!) {
          let currentTask = response.data[taskId];
          currentTask.id = taskId;
          const currentTaskColumnNumber = currentTask.columnNumber;
          retrivedTasks[currentTaskColumnNumber].push(currentTask);
        }
        setChildTasks(retrivedTasks);
      })
      .catch((error) => console.log(error.response));
  };

  const handleNewTask = (taskObject: Task) => {
    let displayedTasksHelper = childTasks;
    displayedTasksHelper[taskObject.columnNumber] = [
      taskObject,
      ...displayedTasksHelper[taskObject.columnNumber],
    ];
    setChildTasks([...displayedTasksHelper]);
  };
  const handleEditTask = (taskObject: Task, ordinalNumber: number) => {
    let displayedTasksHelper = childTasks;
    displayedTasksHelper[taskObject.columnNumber][ordinalNumber] = taskObject;
    setChildTasks([...displayedTasksHelper]);
  };
  const handleDeleteTask = (
    taskId: string,
    parentId: string,
    columnNumber: number,
    ordinalNumber: number
  ) => {
    if (!window.confirm("Confirm deleting the order")) {
      return;
    }
    TaskRequestService.deleteTaskById(
      authContext.tokenObject?.idToken!,
      parentId,
      taskId
    )
      .then(() => {
        let displayedTasksHelper = childTasks;
        displayedTasksHelper[columnNumber].splice(ordinalNumber, 1);
        setChildTasks([...displayedTasksHelper]);
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <Fragment>
      <Accordion.Item eventKey={props.order.id!}>
        <Accordion.Header className={classes.orderTab} onClick={getAllTasks}>
          <span>{props.order.client} </span>-
          <span> {props.order.deadline}</span>
          <span className={classes.editOrderButton} onClick={handleShow}>
            <i className="fas fa-edit"></i>
          </span>
          <span
            className={classes.deleteOrderButton}
            onClick={handleDeleteOrder}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
          {/* TODO: deadline to human date / remaining */}
        </Accordion.Header>
        <Accordion.Body>
          {childTasks.length !== 0 ? (
            <div className="d-flex">
              <div className={`col-3 ${classes.tableColumn}`}>
                {childTasks[0].map((task, index) => (
                  <TaskBlock
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                    key={task.id}
                    ordinalNumber={index}
                    parentId={props.order.id!}
                  />
                ))}
                <NewTaskButton
                  handleNewTask={handleNewTask}
                  parentId={props.order.id!}
                />
              </div>
              <div className={`col-3 ${classes.tableColumn}`}>
                {childTasks[1].map((task, index) => (
                  <TaskBlock
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                    key={task.id}
                    ordinalNumber={index}
                    parentId={props.order.id!}
                  />
                ))}
              </div>
              <div className={`col-3 ${classes.tableColumn}`}>
                {childTasks[2].map((task, index) => (
                  <TaskBlock
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                    key={task.id}
                    ordinalNumber={index}
                    parentId={props.order.id!}
                  />
                ))}
              </div>
              <div className={`col-3 ${classes.tableColumn}`}>
                {childTasks[3].map((task, index) => (
                  <TaskBlock
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                    key={task.id}
                    ordinalNumber={index}
                    parentId={props.order.id!}
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
