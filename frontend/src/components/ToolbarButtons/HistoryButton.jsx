import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToolbarElement } from '../../constants';

const HistoryButton = ({ showConfirm, history, revertHistory }) => {
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setSelect(0);
  }, [show]);

  return (
    <>
      <ToolbarElement onClick={handleShow}>History 📜</ToolbarElement>
      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Revert changes to:</Form.Label>
            <Form.Control
              as='select'
              value={select}
              onChange={(e) => {
                setSelect(e.target.value);
              }}
            >
              {history.map((item, index) => {
                return (
                  <option key={index} value={index}>
                    {index === 0 ? 'Current' : item.timestamp}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger'
            onClick={() => {
              showConfirm();
              handleClose();
            }}
          >
            Clear history
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              handleClose();
              revertHistory(select);
            }}
            disabled={Number(select) === 0}
          >
            Revert
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryButton;
