import { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.js";
import {
  addCollectionAndDocuments,
  getCategoryAndDocuments,
} from "../utils/firebase/fireabse.utils.js";
export const CategoriesContext = createContext({
  categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const value = { categories };
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);
  //   useEffect(() => {
  //     fetch("shop_data.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // if (data) {
  //         //   createUserDocumentFromAuth();
  //         // }
  //         setCategories(data);
  //       });
  //   }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoryAndDocuments();
      setCategories(categoriesMap);
    };
    getCategoriesMap();
  }, []);
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
