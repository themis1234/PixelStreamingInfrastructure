import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import GettingStarted from '../pages/GettingStarted';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/get-started" element={<GettingStarted />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
