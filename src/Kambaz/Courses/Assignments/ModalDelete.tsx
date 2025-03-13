import { Modal, Button } from "react-bootstrap";
export default function ModalDelete({
  show,
  handleClose,
  confirmDelete,
}: {
  show: boolean;
  handleClose: () => void;
  confirmDelete: () => void;
  assignmentTitle: string;
}) {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <strong> Would you like to delete assignment?</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

