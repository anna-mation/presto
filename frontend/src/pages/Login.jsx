import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_PORT } from '../constants';
import { Context, useContext } from '../context';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const LoginHeader = styled.div`
  display: flex;
  min-height: 70px;
  background-color: #0c6dfd;
  font-size: 2.5em;
  padding-left: 10px;
  padding-top: 3px;
  color: white;
`;

const LoginFormat = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 15%;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
`;

const Login = () => {
  const { getters, setters } = useContext(Context);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  if (getters.token !== null) {
    return <Navigate to='/dashboard' />;
  }

  const login = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setters.setErrorMsg('Email and password are required');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:${BACKEND_PORT}/admin/auth/login`, {
        email,
        password
      });
      setters.setToken(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setters.setErrorMsg(err.response.data.error);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <LoginHeader>Presto</LoginHeader>
      <LoginFormat>
        <Form onSubmit={login}>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='login-email'
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='login-password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <StyledButton name='login-button' variant='primary' type='submit' disabled={!email || !password}>
              Login
            </StyledButton>
            <StyledButton name='register-button' variant='link' onClick={goToRegister}>
              Register
            </StyledButton>
          </Form.Group>
        </Form>
      </LoginFormat>
    </>
  );
};

export default Login;
