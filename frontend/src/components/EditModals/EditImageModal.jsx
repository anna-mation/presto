import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Context, useContext } from '../../context';
import { checkImage } from '../../helpers';
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

const EditImageModal = ({ show, handleClose, editImageModal, elem, deleteElem }) => {
  const { setters } = useContext(Context);
  const setErrorMsg = setters.setErrorMsg;

  // Populate state with properties of the selected text element
  const [urlImageBox, setUrlImageBox] = useState('');
  const [descImageBox, setDescImageBox] = useState('');

  // Reset the modal
  useEffect(() => {
    if (show) {
      setUrlImageBox(elem.data.url);
      setDescImageBox(elem.data.alt);
    }
  }, [show]);

  // Update properties of the selected text element
  const editElement = async (event) => {
    event.preventDefault();
    if (!(await checkImage(urlImageBox))) {
      setErrorMsg('Invalid image url.');
      return;
    }

    const newImageBox = {
      type: 'image',
      pos: { x: elem.pos.x, y: elem.pos.y },
      size: { height: elem.size.height, width: elem.size.width },
      data: { url: urlImageBox, alt: descImageBox }
    };

    editImageModal(newImageBox);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Image</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editElement}>
          <Modal.Body>
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
              <InputGroup>
                <Form.Control
                  type='text'
                  placeholder='Description'
                  value={descImageBox}
                  onChange={(e) => setDescImageBox(e.target.value)}
                />
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
                <Button variant='primary' type='submit' onClick={handleClose} disabled={!urlImageBox}>
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

export default EditImageModal;
