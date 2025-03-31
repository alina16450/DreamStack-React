import React, { createContext, useContext } from 'react';
import BucketItemsRepository from '../Repository/Repo';

const BucketContext = createContext();

export const BucketProvider = ({ children }) => {
  const repository = new BucketItemsRepository();
  
  return (
    <BucketContext.Provider value={repository}>
      {children}
    </BucketContext.Provider>
  );
};

export const useBucket = () => {
  return useContext(BucketContext);
};