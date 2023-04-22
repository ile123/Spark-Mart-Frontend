import React, { useState } from 'react';
import Button from '../Button/Button';
import Modal from 'react-bootstrap/Modal';
import Error from '../Error/Error';

export default function ErrorModal(props: any) {
  const [show, setShow] = useState(false);
  const [errors, setErrors]  = useState(props.errors);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
        <ul>
          {/* {errors.map((error: any, item: any) => {
              <Error key={item} message={error} />
          })} */}
          <h3>It Works!</h3>
        </ul>
        }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}