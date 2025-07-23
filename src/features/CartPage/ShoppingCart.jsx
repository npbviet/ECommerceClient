import { NavLink } from "react-router-dom";
import { useState } from "react";

import SCartItem from "./SCartItem";
import CartTotal from "./CartTotal";

import { updateCart } from "../../services/cartService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ShoppingCart.module.css";

const ShoppingCart = (props) => {
  // const user = props.data.userID || null;

  const [cartItems, setCartItems] = useState(props.data.cartData || []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    // Gọi API cập nhật trên server
    updateCart({
      userID: props.data.userID,
      productID: productId,
      quantity: newQuantity,
    });

    // Cập nhật lại local state
    setCartItems((prev) =>
      prev.map((item) =>
        item.productItem._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.productItem._id !== productId)
    );
  };
  // Nếu giỏ hàng trống
  if (cartItems.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  return (
    <div className={styles.cartShopping}>
      <div className={styles.cartTable}>
        <table>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.productItem._id}>
                <SCartItem
                  data={item}
                  onQuantityChange={handleUpdateQuantity}
                  user={props.data.userID}
                  onRemoveItem={handleRemoveItem}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableSubtitle}>
          <NavLink className={styles.leftArrowLink} to="/shop">
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-left"
              className={styles.leftArrowIcon}
            />
            Continue shopping
          </NavLink>
          <NavLink className={styles.rightArrowLink} to="/checkout">
            Proceed to checkout
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-right"
              className={styles.rightArrowIcon}
            />
          </NavLink>
        </div>
      </div>
      <div className={styles.cartTotal}>
        <CartTotal cartItems={cartItems} />
      </div>
    </div>
  );
};

export default ShoppingCart;
