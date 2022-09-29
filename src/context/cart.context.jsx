import { useReducer } from "react";
import { createContext, useEffect, useState } from "react";
import { createAction } from "../utils/firebase/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteFromCart = (cartItems, cartItemToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  total: 0,
});

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        ...payload,
      };
    case "SET_IS_CART_OPEN":
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cart reducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, total }, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [total, setTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeFromCart(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const deleteItemFromCart = (cartItemToDelete) => {
    const newCartItems = deleteFromCart(cartItems, cartItemToDelete);
    updateCartItemsReducer(newCartItems);
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: "SET_CART_ITEMS",
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setTotal(newCartTotal);
  // }, [cartItems]);
  const setIsCartOpen = (bool) => {
    dispatch(createAction("SET_IS_CART_OPEN", bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    deleteItemFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
