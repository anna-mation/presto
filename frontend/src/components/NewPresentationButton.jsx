import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { checkImage } from '../helpers';

const NewPresentationButton = ({ onPresentationCreate, setErrorMsg }) => {
  const [showModal, setShowModal] = useState(false);
  const [presentationName, setPresentationName] = useState('');
  const [presentationDesc, setPresentationDesc] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');

  const handleCreatePresentation = async (event) => {
    event.preventDefault();
    if (!(await checkImage(thumbnailImage))) {
      setErrorMsg('Invalid image url.');
      return;
    }
    onPresentationCreate(presentationName, presentationDesc, thumbnailImage);
  };

  // Reset presentationName state when showModal changes to true
  useEffect(() => {
    if (showModal) {
      setPresentationName('');
      setPresentationDesc('');
      setThumbnailImage('');
    }
  }, [showModal]);

  return (
    <>
      <Button variant='primary' onClick={() => setShowModal(true)}>
        New presentation
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new presentation</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreatePresentation}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='presentation-title'
                placeholder='Enter your title'
                value={presentationName}
                onChange={(e) => setPresentationName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                name='presentation-description'
                placeholder='Enter your description (optional)'
                value={presentationDesc}
                onChange={(e) => setPresentationDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                type='text'
                name='presentation-thumbnail'
                placeholder='Enter image url (optional)'
                value={thumbnailImage}
                onChange={(e) => setThumbnailImage(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button name='presentation-create' variant='primary' type='submit' onClick={() => setShowModal(false)} disabled={!presentationName}>
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NewPresentationButton;
