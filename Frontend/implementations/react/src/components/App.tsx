import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

const App: React.FC = () => {
    console.log("App component rendered!");
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
