import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context, initialValue } from './context';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorModal from './components/ErrorModal';
import Edit from './pages/Edit';
import Preview from './pages/PreviewPres';

const App = () => {
  let lsToken = initialValue.token;
  if (localStorage.getItem('token')) {
    lsToken = localStorage.getItem('token');
  }

  const [token, setToken] = useState(lsToken);

  const setTokenFunction = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const [errorMsg, setErrorMsg] = useState(initialValue.errorMsg);

  // Global variables
  const getters = {
    token,
    errorMsg
  };
  const setters = {
    setToken: setTokenFunction,
    setErrorMsg
  };

  return (
    <>
      <Context.Provider value={{ getters, setters }}>
        <BrowserRouter>
          <ErrorModal errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/preview/:presentationId/:slideId' element={<Preview />} />
            <Route path='/edit/:presentationId/' element={<Edit />} />
            <Route path='/edit/:presentationId/:slideId' element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
};

export default App;
