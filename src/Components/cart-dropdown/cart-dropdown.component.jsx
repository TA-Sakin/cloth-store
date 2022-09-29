import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.jsx";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItems, cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
        {!cartCount && <EmptyMessage>CART IS EMPTY</EmptyMessage>}
        <Button
          buttonType={BUTTON_TYPE_CLASSES.base}
          onClick={goToCheckoutHandler}
        >
          GO TO CHECKOUT
        </Button>
      </CartItems>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
