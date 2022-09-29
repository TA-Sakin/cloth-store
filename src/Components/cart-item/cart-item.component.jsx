import React from "react";
import "./cart-item.styles.jsx";
import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles.jsx";
const CartItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt="" />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} X {price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
