import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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

const EditVidModal = ({ show, editVideo, handleClose, elem, deleteElem }) => {
  const [urlVidBox, setUrlVidBox] = useState('');
  const [autoplayVidBox, setAutoplayVidBox] = useState(false);

  // Reset the modal
  useEffect(() => {
    if (show) {
      setUrlVidBox(`https://www.youtube.com/watch?v=${elem.data.url}`);
      setAutoplayVidBox(elem.data.autoplay);
    }
  }, [show]);

  const createVidBox = async (event) => {
    event.preventDefault();
    const newUrl = urlVidBox.replaceAll('embed/', 'v=').replaceAll('?si=', 'v=');
    const videoId = newUrl.split('v=')[1];

    const newVidBox = {
      type: 'video',
      pos: { x: elem.pos.x, y: elem.pos.y },
      size: { height: elem.size.height, width: elem.size.width },
      data: { url: videoId, autoplay: autoplayVidBox }
    };

    editVideo(newVidBox);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Video</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createVidBox}>
          <Modal.Body>
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
                <Button variant='primary' type='submit' onClick={handleClose} disabled={!urlVidBox}>
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

export default EditVidModal;
