import { Accordion, Form, Spinner } from "react-bootstrap";
import React, { RefObject, useRef, useContext, useState } from "react";
import FileRequestService from "../../../../../../../../services/FileRequestService";
import AuthContext from "../../../../../../../../store/auth-context";
import classes from "./OrderModalNotes.module.css";
import Attachment from "../../../../../../../../types/attachment";

const OrderModalNotes: React.FC<{
  fileEvents: {
    onFileAdded: (attachments: Attachment[]) => void;
    onFileDeleted: (attachmentId: number) => void;
  };
  refs: {
    notes: RefObject<HTMLTextAreaElement>;
  };
  values: {
    notes: string | undefined;
  };
}> = (props) => {
  const [filesUploading, setFilesUploading] = useState(false);
  const authContext = useContext(AuthContext);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileAdded = () => {
    const attachments = fileRef.current?.files!;
    if (attachments.length === 0) {
      return;
    }
    const formData = new FormData();
    for (var i = 0; i < attachments.length; i++) {
      formData.append("attachments[]", attachments[i]);
    }
    setFilesUploading(true);
    FileRequestService.sendNewFile(authContext.accessToken!, formData)
      .then((response) => {
        fileRef.current!.value = "";
        setFilesUploading(false);
        props.fileEvents.onFileAdded(response.data);
      })
      .catch(() => {
        alert("Error uploading files. Some files may not be saved");
        fileRef.current!.value = "";
        setFilesUploading(false);
      });
  };
  return (
    <Accordion.Item eventKey="notes">
      <Accordion.Header>Notes & Attachments</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="notesInput">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Notes"
            style={{ height: "100px" }}
            ref={props.refs.notes}
            defaultValue={props.values?.notes}
          />
        </Form.Group>
        <Form.Group controlId="attachments" className="mb-3">
          <Form.Label>Attachments</Form.Label>
          <Form.Control
            className={classes.fileInput}
            type="file"
            multiple
            onChange={handleFileAdded}
            ref={fileRef}
            disabled={filesUploading}
            accept=".doc,.docx,.pdf,.jpg.png.jpeg,.txt"
          />
        </Form.Group>
        <Spinner
          className={filesUploading ? "" : "d-none"}
          animation="border"
          variant="primary"
        />
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalNotes;
