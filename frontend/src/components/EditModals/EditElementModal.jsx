import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ColorPicker from '../ColorPicker';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MainButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const EditModal = ({ show, handleClose, editModal, elem, deleteElem }) => {
  // Populate state with properties of the selected text element
  const [textDisplay, setTextDisplay] = useState('');
  const [fontSize, setFontSize] = useState(0);
  const [hexCode, setHexCode] = useState('');
  const [fontFamily, setFontFamily] = useState('');

  // Reset the modal
  useEffect(() => {
    if (show) {
      setTextDisplay(elem.data.text);
      setFontSize(elem.data.fontSize);
      setHexCode(elem.data.color);
      setFontFamily(elem.data.font);
    }
  }, [show]);

  // Update properties of the selected text element
  const editElement = async (event) => {
    event.preventDefault();

    const newTextBox = {
      type: 'text',
      pos: { x: elem.pos.x, y: elem.pos.y },
      size: { height: elem.size.height, width: elem.size.width },
      data: { font: fontFamily, text: textDisplay, fontSize: Number(fontSize), color: hexCode }
    };

    editModal(newTextBox);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Text Box</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editElement}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type='text'
                placeholder='Textbox content'
                value={textDisplay}
                onChange={(e) => setTextDisplay(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Font Size</Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  min={0}
                  placeholder='Font size'
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
                <InputGroup.Text>em</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Font Family</Form.Label>
              <Form.Control as='select' value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                <option value=''>Inter</option>
                <option value='Times New Roman'>Times New Roman</option>
                <option value='Comic Sans MS'>Comic Sans</option>
                <option value='Papyrus'>Papyrus</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Text color</Form.Label>
              <ColorPicker color={hexCode} setColor={setHexCode} />
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
                <Button variant='primary' type='submit' onClick={handleClose} disabled={!textDisplay || !fontSize}>
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

export default EditModal;
