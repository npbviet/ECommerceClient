import styles from "./YourOrder.module.css";
import OrderItem from "./OrderItem";

const YourOrder = (props) => {
  const orderItems = props.item || [];
  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };

  if (orderItems.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  return (
    <div className={styles.yourOrder}>
      <h2>YOUR ORDER</h2>
      <div>
        {orderItems.map((item) => (
          <div key={item.productItem._id}>
            <OrderItem item={item} />
            <div className={styles.divider}></div>
          </div>
        ))}
      </div>

      <div className={styles.totalMoney}>
        <div>TOTAL:</div>
        <div>{moneyNumber(props.total)} VND</div>
      </div>
    </div>
  );
};

export default YourOrder;
