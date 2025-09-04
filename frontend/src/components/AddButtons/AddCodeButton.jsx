import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';
import { ToolbarElement } from '../../constants';

const Textarea = styled.textarea`
  resize: none;
  height: 50vh;
  white-space: pre-wrap;
`;

const AddCodeButton = ({ addCodeBox, statusForCodeBlock }) => {
  const [show, setShow] = useState(false);
  const [widthCodeBox, setWidthCodeBox] = useState('');
  const [heightCodeBox, setHeightCodeBox] = useState('');
  const [codeToDisplay, setCodeToDisplay] = useState('');
  const [fontSize, setFontSize] = useState('');

  const handleClose = () => { setShow(false); statusForCodeBlock(false) };
  const handleShow = () => { setShow(true); statusForCodeBlock(true) };

  const createCodeBlock = async (event) => {
    event.preventDefault();

    const newCodeBlock = {
      type: 'code',
      pos: { x: 0, y: 0 },
      size: { height: Number(heightCodeBox), width: Number(widthCodeBox) },
      data: { code: codeToDisplay, fontSize }
    };

    addCodeBox(newCodeBlock);
  };

  // Reset the modal
  useEffect(() => {
    if (setShow) {
      setWidthCodeBox('');
      setHeightCodeBox('');
      setFontSize('');
      setCodeToDisplay('');
    }
  }, [show]);

  return (
    <>
      <ToolbarElement onClick={handleShow}>Code ⌨️</ToolbarElement>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Code Block</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createCodeBlock}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Codebox Height</Form.Label>
              <Form.Control
                type='number'
                min={1}
                placeholder='Height'
                value={heightCodeBox}
                onChange={(e) => setHeightCodeBox(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Codebox Width</Form.Label>
              <Form.Control
                type='number'
                min={1}
                placeholder='Width'
                value={widthCodeBox}
                onChange={(e) => setWidthCodeBox(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Content</Form.Label>
              <Textarea
                placeholder='Python/Javascript/C code'
                value={codeToDisplay}
                className='form-control'
                onChange={(e) => setCodeToDisplay(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Font Size</Form.Label>
              <InputGroup>
                <Form.Control
                  min={0}
                  type='number'
                  placeholder='Font size'
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
                <InputGroup.Text>em</InputGroup.Text>
              </InputGroup>
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
              disabled={!widthCodeBox || !heightCodeBox || !fontSize || !codeToDisplay}
            >
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddCodeButton;
