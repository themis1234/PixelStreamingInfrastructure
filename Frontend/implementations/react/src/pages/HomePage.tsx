// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PixelStreamingContainer from '../components/PixelStreamingContainer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  return <PixelStreamingContainer />;
};

export default HomePage;
