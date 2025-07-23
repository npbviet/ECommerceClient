import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CartTotal.module.css";
import { getTotalAmount } from "../../services/cartService";

const CartTotal = (props) => {
  const [couponCode, setCouponCode] = useState("");

  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };

  const totalPrice = getTotalAmount(props.cartItems);

  return (
    <div className={styles.cartTotal}>
      <h2>CART TOTAL</h2>
      <div className={styles.subTotal}>
        <div>SUBTOTAL:</div>
        <div className={styles.subPrice}>{moneyNumber(totalPrice)}VND</div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.totalMoney}>
        <div>TOTAL:</div>
        <div>{moneyNumber(totalPrice)}VND</div>
      </div>
      <div className={styles.couponInput}>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter your coupon"
        />
        <Button className={styles.couponButton}>
          <FontAwesomeIcon icon="fa-solid fa-gift" /> Apply coupon
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
