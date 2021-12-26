import { Accordion, Form } from "react-bootstrap";
import React, { useContext } from "react";
import FileRequestService from "../../../../../../../../services/FileRequestService";
import AuthContext from "../../../../../../../../store/auth-context";
import classes from "./OrderModalArchivedNotes.module.css";
import Attachment from "../../../../../../../../types/attachment";
import FileDownload from "js-file-download";

const OrderModalArchivedNotes: React.FC<{
  values: {
    notes: string | undefined;
    files: Attachment[] | null;
  };
}> = (props) => {
  const authContext = useContext(AuthContext);
  const downloadFile = (event: React.MouseEvent<HTMLSpanElement>) => {
    const filename = event.currentTarget.innerText;
    FileRequestService.downloadFile(
      authContext.accessToken!,
      event.currentTarget.getAttribute("data-file-id")!
    )
      .then((response) => FileDownload(response.data, filename))
      .catch(() => alert("Error downloading file"));
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
            defaultValue={props.values?.notes}
            disabled
          />
        </Form.Group>
        <output>
          {props.values.files
            ? props.values.files.map((file, index) => (
                <div className={classes.attachmentFile} key={index}>
                  <i className="fas fa-file"></i>
                  <span onClick={downloadFile} data-file-id={file.id}>
                    {file.original_filename}
                  </span>
                </div>
              ))
            : ""}
        </output>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalArchivedNotes;
