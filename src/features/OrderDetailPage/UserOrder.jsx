import styles from "./UserOrder.module.css";

const UserOrder = (props) => {
  console.log(props.item);
  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };
  return (
    <section className={styles.userOrder}>
      <div className={styles["user-infor"]}>
        <p>INFORMATION ORDER</p>
        <ul className={styles["content-infor"]}>
          <li>ID User: {props.item.user.userID}</li>
          <li>Full Name: {props.item.user.fullName}</li>
          <li>Phone: {props.item.user.phone}</li>
          <li>Address: {props.item.user.address}</li>
          <li>Total: {moneyNumber(props.item.totalAmount)} VND</li>
        </ul>
      </div>
    </section>
  );
};

export default UserOrder;
