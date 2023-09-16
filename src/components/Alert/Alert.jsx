import Modal from 'react-bootstrap/Modal';

function MyAlert({ show, shangeShow }) {
  return (
    <>
      {show && (
        <Modal
          size="sm"
          show={show}
          onHide={() => shangeShow(false)}
          aria-labelledby="This number is in the list"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">Sorry</Modal.Title>
          </Modal.Header>
          <Modal.Body>This number is in the list</Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default MyAlert;
