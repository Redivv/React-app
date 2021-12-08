import React, { FormEvent, useContext, useRef, useState } from "react";
import { Modal, Button, Form, Accordion, Spinner } from "react-bootstrap";
import TaskRequestService from "../../../../../../../../services/TaskRequestService";
import TaskValidationService from "../../../../../../../../services/TaskValidationService";
import AuthContext from "../../../../../../../../store/auth-context";
import Task from "../../../../../../../../types/task";
import TaskModalBasic from "./Sections/TaskModalBasic";
import TaskModalNotes from "./Sections/TaskModalNotes";
import TaskModalValidation from "./Sections/TaskModalValidation";

const TaskModal: React.FC<{
  show: boolean;
  handleClose: () => void;
  handleNewTask?: (taskObject: Task) => void;
  handleEditTask?: (taskObject: Task, ordinalNumber: number) => void;
  task?: Task;
  ordinalNumber?: number;
  parentId: string;
}> = (props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const validationInput = useRef<HTMLTextAreaElement>(null);
  const notesInput = useRef<HTMLTextAreaElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const authContext = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const taskColumnNumber = props.task ? props.task.columnNumber : 0;
    const taskObject: Task = {
      title: titleInput.current?.value!,
      description: descriptionInput.current?.value!,
      terms: validationInput.current?.value!,
      notes: notesInput.current?.value!,
      columnNumber: taskColumnNumber,
    };
    try {
      TaskValidationService.validateInsert(taskObject);
    } catch (e) {
      alert(e);
      return;
    }
    setIsProcessing(true);
    if (props.task) {
      taskObject["id"] = props.task.id!;
      TaskRequestService.editTask(
        authContext.accessToken!,
        props.parentId,
        taskObject
      )
        .then(() => {
          props.handleEditTask!(taskObject, props.ordinalNumber!);
          alert("Task Changed");
          setIsProcessing(false);
          handleCloseModal();
        })
        .catch((error) => {
          alert("KURWA");
          console.log(error.response);
          setIsProcessing(false);
        });
    } else {
      TaskRequestService.addNewTask(
        authContext.accessToken!,
        props.parentId,
        taskObject
      )
        .then((response) => {
          taskObject["id"] = response.data.name;
          props.handleNewTask!(taskObject);
          alert("Task Saved");
          setIsProcessing(false);
          handleCloseModal();
        })
        .catch((error) => {
          alert("KURWA");
          console.log(error.response);
          setIsProcessing(false);
        });
    }
  };

  const handleCloseModal = () => {
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.task ? "Edit Task" : "New Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="taskForm" onSubmit={handleSubmit}>
          {isProcessing ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Accordion defaultActiveKey="basic">
              <TaskModalBasic
                refs={{ title: titleInput, description: descriptionInput }}
                values={{
                  title: props.task?.title,
                  description: props.task?.description,
                }}
              />
              <TaskModalValidation
                refs={{ terms: validationInput }}
                values={{
                  terms: props.task?.terms,
                }}
              />
              <TaskModalNotes
                refs={{ notes: notesInput }}
                values={{ notes: props.task?.notes }}
              />
            </Accordion>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
