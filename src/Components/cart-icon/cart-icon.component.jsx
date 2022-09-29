import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./cart-icon.styles.jsx";
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { cartCount } = useContext(CartContext);
  const toggleCardDropdown = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleCardDropdown}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
