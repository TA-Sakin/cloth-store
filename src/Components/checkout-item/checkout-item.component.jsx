import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss";
const CheckoutItem = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  const { deleteItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <div className="arrow" onClick={() => removeItemFromCart(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </div>
      </div>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => {
          deleteItemFromCart(cartItem);
        }}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
