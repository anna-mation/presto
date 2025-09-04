import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const BackToDashboardButton = () => {
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Button variant='primary' onClick={goToDashboard}>
      ⬅️ Back
    </Button>
  );
};

export default BackToDashboardButton;
