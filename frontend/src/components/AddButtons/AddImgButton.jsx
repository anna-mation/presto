import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { checkImage } from '../../helpers';
import { ToolbarElement } from '../../constants';

const AddImgButton = ({ addImgBox, statusForImgBlock }) => {
  const { setters } = useContext(Context);
  const setErrorMsg = setters.setErrorMsg;
  const [show, setShow] = useState(false);
  const [heightImageBox, setHeightImageBox] = useState('');
  const [urlImageBox, setUrlImageBox] = useState('');
  const [descImageBox, setDescImageBox] = useState('');

  const handleClose = () => { setShow(false); statusForImgBlock(false) };
  const handleShow = () => { setShow(true); statusForImgBlock(true) };

  const createTextBox = async (event) => {
    event.preventDefault();
    if (!(await checkImage(urlImageBox))) {
      setErrorMsg('Invalid image url.');
      return;
    }

    const newImageBox = {
      type: 'image',
      pos: { x: 0, y: 0 },
      size: { height: Number(heightImageBox), width: '' },
      data: { url: urlImageBox, alt: descImageBox }
    };

    addImgBox(newImageBox);
  };

  // Reset the modal
  useEffect(() => {
    if (setShow) {
      setHeightImageBox('');
      setDescImageBox('');
      setUrlImageBox('');
    }
  }, [show]);

  return (
    <>
      <ToolbarElement onClick={handleShow}>Image 🖼️</ToolbarElement>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Image</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createTextBox}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Image Size</Form.Label>
              <Form.Control
                type='number'
                min={1}
                placeholder='Size'
                value={heightImageBox}
                onChange={(e) => setHeightImageBox(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type='text'
                placeholder='Link to image'
                value={urlImageBox}
                onChange={(e) => setUrlImageBox(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Image Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Description'
                value={descImageBox}
                onChange={(e) => setDescImageBox(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit' onClick={handleClose} disabled={!heightImageBox || !urlImageBox}>
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddImgButton;
