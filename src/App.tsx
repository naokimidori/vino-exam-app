import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from "@/pages/Login";
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
