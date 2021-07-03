import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);

  React.useEffect(() => {
    (async function getImage() {
      const data = await fetch('./server/categories/index.get.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then((res) => res.json());
      console.log('CATEGORIES::', data);
      setCategoryData(data);
    })();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;