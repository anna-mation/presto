import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToolbarElement } from '../../constants';

const AddVidButton = ({ addVidBox, statusForVidBlock }) => {
  const [show, setShow] = useState(false);
  const [heightVidBox, setHeightVidBox] = useState('');
  const [urlVidBox, setUrlVidBox] = useState('');
  const [autoplayVidBox, setAutoplayVidBox] = useState(false);

  const handleClose = () => { setShow(false); statusForVidBlock(false) };
  const handleShow = () => { setShow(true); statusForVidBlock(true) };

  const createVidBox = async (event) => {
    event.preventDefault();

    const newUrl = urlVidBox.replaceAll('embed/', 'v=').replaceAll('?si=', 'v=');
    const videoId = newUrl.split('v=')[1];

    const newVidBox = {
      type: 'video',
      pos: { x: 0, y: 0 },
      size: { height: Number(heightVidBox), width: '' },
      data: { url: videoId, autoplay: autoplayVidBox }
    };
    addVidBox(newVidBox);
  };

  // Reset the modal
  useEffect(() => {
    if (setShow) {
      setHeightVidBox('');
      setUrlVidBox('');
      setAutoplayVidBox(false);
    }
  }, [show]);

  return (
    <>
      <ToolbarElement onClick={handleShow}>Video 🎬</ToolbarElement>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Video</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createVidBox}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Video Size</Form.Label>
              <Form.Control
                type='number'
                min={1}
                placeholder='Size'
                value={heightVidBox}
                onChange={(e) => setHeightVidBox(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Video Url</Form.Label>
              <Form.Control
                type='text'
                placeholder='Link to YouTube video'
                value={urlVidBox}
                onChange={(e) => setUrlVidBox(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Toggle video autoplay?</Form.Label>
              <div>
                <Form.Check
                  inline
                  label='Yes'
                  type='radio'
                  id='yes'
                  name='autoplay'
                  checked={autoplayVidBox}
                  onChange={() => setAutoplayVidBox(true)}
                />
                <Form.Check
                  inline
                  label='No'
                  type='radio'
                  id='no'
                  name='autoplay'
                  checked={!autoplayVidBox}
                  onChange={() => setAutoplayVidBox(false)}
                />
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit' onClick={handleClose} disabled={!heightVidBox || !urlVidBox}>
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddVidButton;
