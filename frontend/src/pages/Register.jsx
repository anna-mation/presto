import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_PORT } from '../constants';
import { Context, useContext } from '../context';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const RegisterHeader = styled.div`
  display: flex;
  min-height: 70px;
  background-color: #0c6dfd;
  font-size: 2.5em;
  padding-left: 10px;
  padding-top: 3px;
  color: white;
`;

const RegisterFormat = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 8%;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
`;

const Register = () => {
  const { getters, setters } = useContext(Context);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const navigate = useNavigate();

  if (getters.token !== null) {
    return <Navigate to='/dashboard' />;
  }
  const register = async (event) => {
    event.preventDefault();

    if (!email || !password || !name || !confirmPwd) {
      setters.setErrorMsg('Please make sure all fields are filled in.');
      return;
    }

    if (password !== confirmPwd) {
      setters.setErrorMsg("Passwords don't match");
    } else {
      try {
        const response = await axios.post(`http://localhost:${BACKEND_PORT}/admin/auth/register`, {
          email,
          password,
          name
        });
        setters.setToken(response.data.token);
        navigate('/dashboard');
      } catch (err) {
        setters.setErrorMsg(err.response.data.error);
      }
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <RegisterHeader>Presto</RegisterHeader>
      <RegisterFormat>
        <Form onSubmit={register}>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='register-name'
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='register-email'
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='register-password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='register-password-confirm'
              placeholder='Confirm password'
              onChange={(e) => setConfirmPwd(e.target.value)}
              value={confirmPwd}
            />
          </Form.Group>
          <StyledButton
            name='register-button'
            variant='primary'
            type='submit'
            disabled={!email || !password || !name || !confirmPwd}
          >
            Register
          </StyledButton>
          <StyledButton variant='link' onClick={goToLogin}>
            Login
          </StyledButton>
        </Form>
      </RegisterFormat>
    </>
  );
};

export default Register;
