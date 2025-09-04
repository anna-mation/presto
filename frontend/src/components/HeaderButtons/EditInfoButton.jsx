import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { checkImage } from '../../helpers';

const EditInfoButton = ({ presentation, onPresentationEdit }) => {
  const { setters } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [presentationName, setPresentationName] = useState('');
  const [presentationDesc, setPresentationDesc] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');

  const handleEditPresentation = async (event) => {
    event.preventDefault();
    if (!(await checkImage(thumbnailImage))) {
      setters.setErrorMsg('Invalid image url.');
      return;
    }
    onPresentationEdit(presentationName, presentationDesc, thumbnailImage);
  };

  // Reset presentationName state when showModal changes to true
  useEffect(() => {
    if (showModal) {
      setPresentationName(presentation.title);
      setPresentationDesc(presentation.desc);
      setThumbnailImage(presentation.thumbnail);
    }
  }, [showModal]);

  return (
    <>
      <Button variant='primary' onClick={() => setShowModal(true)}>
        Edit
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit presentation</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditPresentation}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your title'
                value={presentationName}
                onChange={(e) => setPresentationName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your description (optional)'
                value={presentationDesc}
                onChange={(e) => setPresentationDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                type='text'
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
            <Button variant='primary' type='submit' onClick={() => setShowModal(false)} disabled={!presentationName}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditInfoButton;
