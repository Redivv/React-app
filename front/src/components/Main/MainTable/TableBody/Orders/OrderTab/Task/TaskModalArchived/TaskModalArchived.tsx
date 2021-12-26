import React from "react";
import { Modal, Button, Form, Accordion } from "react-bootstrap";
import Task from "../../../../../../../../types/task";
import TaskModalArchivedBasic from "./Sections/TaskModalArchivedBasic";
import TaskModalArchivedNotes from "./Sections/TaskModalArchivedNotes";
import TaskModalArchivedUser from "./Sections/TaskModalArchivedUser";
import TaskModalArchivedValidation from "./Sections/TaskModalArchivedValidation";

const TaskModalArchived: React.FC<{
  show: boolean;
  handleClose: () => void;
  task?: Task;
}> = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Archived Task</Modal.Title>
      </Modal.Header>

      <Form id="taskForm">
        <Modal.Body>
          <Accordion defaultActiveKey="basic">
            <TaskModalArchivedBasic
              values={{
                title: props.task?.title,
                description: props.task?.description,
              }}
            />
            <TaskModalArchivedUser
              values={{
                userId: props.task?.user_id,
              }}
            />
            <TaskModalArchivedValidation
              values={{
                terms: props.task?.validation_terms,
                comments: props.task?.validation_comments,
              }}
            />
            <TaskModalArchivedNotes
              values={{ notes: props.task?.notes, files: props.task?.files! }}
            />
          </Accordion>
        </Modal.Body>
      </Form>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModalArchived;
