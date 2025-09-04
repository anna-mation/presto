// AddTextButton.js
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ColorPicker from '../ColorPicker';
import { ToolbarElement } from '../../constants';

const AddTextButton = ({ addTextBox, statusForTextBlock }) => {
  const [show, setShow] = useState(false);
  const [widthTextBoxSize, setWidthTextBoxSize] = useState('');
  const [heightTextBoxSize, setHeightTextBoxSize] = useState('');
  const [textDisplay, setTextDisplay] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [hexCode, setHexCode] = useState('');
  const [fontFamily, setFontFamily] = useState('');

  const handleClose = () => { setShow(false); statusForTextBlock(false) };
  const handleShow = () => { setShow(true); statusForTextBlock(true) };

  const createTextBox = async (event) => {
    event.preventDefault();
    const newTextBox = {
      type: 'text',
      pos: { x: 0, y: 0 },
      size: { height: Number(heightTextBoxSize), width: Number(widthTextBoxSize) },
      data: { font: fontFamily, text: textDisplay, fontSize: Number(fontSize), color: hexCode }
    };

    addTextBox(newTextBox);
  };

  // Reset the modal
  useEffect(() => {
    if (setShow) {
      setWidthTextBoxSize('');
      setHeightTextBoxSize('');
      setTextDisplay('');
      setFontSize('');
      setHexCode('#000000');
    }
  }, [show]);

  return (
    <>
      <ToolbarElement onClick={handleShow}>Text 🔤</ToolbarElement>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Text Box</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createTextBox}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Height</Form.Label>
              <Form.Control
                type='number'
                min={1}
                placeholder='Textbox height'
                value={heightTextBoxSize}
                onChange={(e) => setHeightTextBoxSize(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Width</Form.Label>
              <Form.Control
                type='number'
                min={1}
                placeholder='Textbox width'
                value={widthTextBoxSize}
                onChange={(e) => setWidthTextBoxSize(e.target.value)}
              />
            </Form.Group>
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
              <Form.Label>Font Family</Form.Label>
              <Form.Control as='select' value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                <option value=''>Inter</option>
                <option value='Times New Roman'>Times New Roman</option>
                <option value='Comic Sans MS'>Comic Sans</option>
                <option value='Papyrus'>Papyrus</option>
              </Form.Control>
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
              <Form.Label>Text color</Form.Label>
              <ColorPicker color={hexCode} setColor={setHexCode} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              variant='primary'
              type='submit'
              onClick={handleClose}
              disabled={!widthTextBoxSize || !heightTextBoxSize || !textDisplay || !fontSize}
            >
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddTextButton;
