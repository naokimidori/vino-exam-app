import React from 'react';
import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { routesConfig } from './routes';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Navigate to='/login' />} />
        {routesConfig.map((item) => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
