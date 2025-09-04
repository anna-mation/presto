import React from 'react';
import axios from 'axios';
import { BACKEND_PORT } from '../constants';
import { useContext, Context } from '../context';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const Logout = () => {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post(
        `http://localhost:${BACKEND_PORT}/admin/auth/logout`,
        {},
        {
          headers: {
            Authorization: getters.token
          }
        }
      );
      setters.setToken(null);
      localStorage.removeItem('token');
    } catch (err) {
      setters.setErrorMsg(err.response.data.error);
    }
    navigate('/login');
  };

  return (
    <Button variant='primary' onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;
