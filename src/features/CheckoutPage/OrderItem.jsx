import styles from "./OrderItem.module.css";

const OrderItem = (props) => {
  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };

  return (
    <div className={styles.orderItem}>
      <div className={styles.orderItemName}>{props.item.productItem.name}</div>
      <div className={styles.orderPrice}>
        {moneyNumber(props.item.productItem.price)} VND x {props.item.quantity}
      </div>
    </div>
  );
};

export default OrderItem;
