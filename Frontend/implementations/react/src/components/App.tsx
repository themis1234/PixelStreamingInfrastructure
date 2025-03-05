import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProjectSelection from '../pages/ProjectSelection';
import ConsumptionPage from '../pages/GraphTest';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectSelection />} />
        <Route path="/graph" element={<ConsumptionPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
