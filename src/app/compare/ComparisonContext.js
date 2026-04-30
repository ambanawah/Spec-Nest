'use client';

import React, { createContext, useState, useContext } from 'react';

const ComparisonContext = createContext();

export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState([]);

  const addToComparison = (product) => {
    setComparisonList((prevList) => {
      if (prevList.find((p) => p.id === product.id)) {
        return prevList;
      }
      return [...prevList, product];
    });
  };

  const removeFromComparison = (productId) => {
    setComparisonList((prevList) => prevList.filter((p) => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <ComparisonContext.Provider value={{ comparisonList, addToComparison, removeFromComparison, clearComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
};
