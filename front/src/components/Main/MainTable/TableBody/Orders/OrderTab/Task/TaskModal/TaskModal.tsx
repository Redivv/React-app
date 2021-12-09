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
  const validationTermsInput = useRef<HTMLTextAreaElement>(null);
  const validationCommentsInput = useRef<HTMLTextAreaElement>(null);
  const notesInput = useRef<HTMLTextAreaElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const authContext = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const taskColumnNumber = props.task ? props.task.column_number : 0;
    const taskObject: Task = {
      title: titleInput.current?.value!,
      description: descriptionInput.current?.value!,
      validation_terms: validationTermsInput.current?.value!,
      validation_comments: validationCommentsInput.current?.value!,
      notes: notesInput.current?.value!,
      column_number: taskColumnNumber,
    };
    try {
      TaskValidationService.validateInsert(taskObject);
    } catch (e) {
      alert(e);
      return;
    }
    setIsProcessing(true);
    if (props.task?.id) {
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
          console.log(error.response.data);
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
          console.log(error.response.data);
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
        <Modal.Title>{props.task?.id ? "Edit Task" : "New Task"}</Modal.Title>
      </Modal.Header>

      <Form id="taskForm" onSubmit={handleSubmit}>
        <Modal.Body>
          <Spinner
            className={isProcessing ? "" : "d-none"}
            animation="border"
            variant="primary"
          />
          <Accordion
            defaultActiveKey="basic"
            className={isProcessing ? "d-none" : ""}
          >
            <TaskModalBasic
              refs={{ title: titleInput, description: descriptionInput }}
              values={{
                title: props.task?.title,
                description: props.task?.description,
              }}
            />
            <TaskModalValidation
              refs={{
                terms: validationTermsInput,
                comments: validationCommentsInput,
              }}
              values={{
                terms: props.task?.validation_terms,
                comments: props.task?.validation_comments,
              }}
            />
            <TaskModalNotes
              refs={{ notes: notesInput }}
              values={{ notes: props.task?.notes }}
            />
          </Accordion>
        </Modal.Body>
      </Form>
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
