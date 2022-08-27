import { createContext, useEffect, useState } from "react";
import PRODUCTS from "../shop-data.json";
export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  //   useEffect(() => {
  //     fetch("shop_data.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // if (data) {
  //         //   createUserDocumentFromAuth();
  //         // }
  //         setProducts(data);
  //       });
  //   }, []);
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
