import React, { createContext, useContext } from 'react';
import BucketItemsRepository from '../Repository/Repo';

//using createContext in order to initialize one Repo for each of my 3 pages, to avoid having to pass any changes between them. These children get passed in App.js where the separate pages
//are initialized.
const BucketContext = createContext();

//initialize the repository class, and pass it to children.
export const BucketProvider = ({ children }) => {
  const repository = new BucketItemsRepository();
  
  return (
    <BucketContext.Provider value={repository}>
      {children}
    </BucketContext.Provider>
  );
};

//creates a custom hook for our action for easier calling.
export const useBucket = () => {
  return useContext(BucketContext);
};
