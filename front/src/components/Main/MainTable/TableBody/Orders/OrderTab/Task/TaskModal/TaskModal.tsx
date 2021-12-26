import React, { FormEvent, useContext, useRef, useState } from "react";
import { Modal, Button, Form, Accordion, Spinner } from "react-bootstrap";
import TaskRequestService from "../../../../../../../../services/TaskRequestService";
import TaskValidationService from "../../../../../../../../services/TaskValidationService";
import AuthContext from "../../../../../../../../store/auth-context";
import Attachment from "../../../../../../../../types/attachment";
import Task from "../../../../../../../../types/task";
import TaskModalBasic from "./Sections/TaskModalBasic";
import TaskModalNotes from "./Sections/TaskModalNotes";
import TaskModalUser from "./Sections/TaskModalUser";
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
  const [taskAttachments, setTaskAttachments] = useState<null | Attachment[]>(
    props.task ? props.task.files : null
  );
  const titleInput = useRef<HTMLInputElement>(null);
  const userInput = useRef<HTMLSelectElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const validationTermsInput = useRef<HTMLTextAreaElement>(null);
  const validationCommentsInput = useRef<HTMLTextAreaElement>(null);
  const notesInput = useRef<HTMLTextAreaElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const authContext = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const taskColumnNumber = props.task ? props.task.column_number : 0;
    const assignedUserId =
      userInput.current?.value === "" ? null : +userInput.current?.value!;
    const taskObject: Task = {
      title: titleInput.current?.value!,
      user_id: assignedUserId,
      description: descriptionInput.current?.value!,
      validation_terms: validationTermsInput.current?.value!,
      validation_comments: validationCommentsInput.current?.value!,
      notes: notesInput.current?.value!,
      column_number: taskColumnNumber,
      files: taskAttachments,
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
        .then((response) => {
          console.log(response.data);
          props.handleEditTask!(response.data, props.ordinalNumber!);
          alert("Task Changed");
          setIsProcessing(false);
          handleCloseModal();
        })
        .catch(() => {
          alert("Invalid data. Changes not saved");
          setIsProcessing(false);
        });
    } else {
      TaskRequestService.addNewTask(
        authContext.accessToken!,
        props.parentId,
        taskObject
      )
        .then((response) => {
          props.handleNewTask!(response.data);
          alert("Task Saved");
          setIsProcessing(false);
          handleCloseModal();
        })
        .catch((error) => {
          alert("Invalid data. Changes not saved");
          setIsProcessing(false);
        });
    }
  };

  const handleCloseModal = () => {
    props.handleClose();
  };

  const handleFileAdded = (attachments: Attachment[]) => {
    if (!taskAttachments) {
      setTaskAttachments(attachments);
      return;
    }
    let mergedArrays = taskAttachments.concat(attachments);
    mergedArrays = mergedArrays.filter((value, index, self) => {
      if (index === self.findIndex((t) => t.id === value.id)) {
        return true;
      }
      alert(
        "Duplicate file. File with contents of " +
          value.original_filename +
          " already attached"
      );
    });
    setTaskAttachments(mergedArrays);
  };
  const handleFileDeleted = (attachmentOrdinalNumber: number) => {
    let orderAttachmentsHelper = taskAttachments;
    orderAttachmentsHelper!.splice(attachmentOrdinalNumber, 1);
    setTaskAttachments([...orderAttachmentsHelper!]);
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
            <TaskModalUser
              refs={{
                user: userInput,
              }}
              values={{
                userId: props.task?.user_id,
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
              fileEvents={{
                onFileAdded: handleFileAdded,
                onFileDeleted: handleFileDeleted,
              }}
              refs={{ notes: notesInput }}
              values={{ notes: props.task?.notes, files: taskAttachments }}
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
