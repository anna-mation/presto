import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';

const Textarea = styled.textarea`
  resize: none;
  height: 50vh;
  white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MainButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const EditCodeModal = ({ show, handleClose, editCodeModal, elem, deleteElem }) => {
  const [fontSize, setFontSize] = useState('');
  const [codeToDisplay, setCodeToDisplay] = useState('');

  // Reset the modal
  useEffect(() => {
    if (show) {
      setCodeToDisplay(elem.data.code);
      setFontSize(elem.data.fontSize);
    }
  }, [show]);

  const createCodeBlock = async (event) => {
    event.preventDefault();
    const newCodeBlock = {
      type: 'code',
      pos: { x: elem.pos.x, y: elem.pos.y },
      size: { height: elem.size.height, width: elem.size.width },
      data: { code: codeToDisplay, fontSize }
    };

    editCodeModal(newCodeBlock);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Code Block</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createCodeBlock}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Code</Form.Label>
              <Textarea
                placeholder='Python/Javascript/C code'
                value={codeToDisplay}
                onChange={(e) => setCodeToDisplay(e.target.value)}
                className='form-control'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Font Size</Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  min={0}
                  placeholder='Font Size'
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
                <InputGroup.Text>em</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <ButtonContainer>
              <Button
                variant='danger'
                onClick={() => {
                  handleClose();
                  deleteElem();
                }}
              >
                Delete
              </Button>
              <MainButtons>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' type='submit' onClick={handleClose} disabled={!fontSize || !codeToDisplay}>
                  Save
                </Button>
              </MainButtons>
            </ButtonContainer>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditCodeModal;
