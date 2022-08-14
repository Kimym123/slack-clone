import React from 'react';
import LogIn from '@pages/Login';
import SignUp from '@pages/SignUp';
import { Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
