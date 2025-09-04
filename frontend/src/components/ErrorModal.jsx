import React, { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const ErrorModal = ({ errorMsg, setErrorMsg }) => {
  // If invalid token edge case, redirect to login page
  const navigate = useNavigate();
  useEffect(() => {
    if (errorMsg.toLowerCase().includes('invalid token')) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [errorMsg]);

  return (
    <>
      <Modal show={errorMsg !== ''} onHide={() => setErrorMsg('')}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMsg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => setErrorMsg('')}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ErrorModal;
