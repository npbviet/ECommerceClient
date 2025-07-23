import styles from "./OrderDItem.module.css";

const OrderDItem = (props) => {
  const item = props.data.productId;

  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };

  return (
    <>
      <td>{item._id}</td>
      <td>
        <img src={item.img1} alt={item._id} />
      </td>
      <td className={styles.nameProduct}>{item.name}</td>
      <td>{moneyNumber(item.price * props.data.quantity)} VND</td>
      <td>{props.data.quantity}</td>
    </>
  );
};

export default OrderDItem;
