import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

export const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulando una pequeña latencia de red (como una llamada a API real)
        await new Promise((resolve) => setTimeout(resolve, 300));
        setData(portfolioData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del portfolio');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};