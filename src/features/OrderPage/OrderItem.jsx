import styles from "./OrderItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const OrderItem = (props) => {
  const item = props.data.productItem;

  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };

  return (
    <>
      <td>{props.data._id}</td>
      <td>{props.data.user.userID}</td>
      <td>{props.data.user.fullName}</td>
      <td>{props.data.user.phone}</td>
      <td>{props.data.user.address}</td>
      <td>{moneyNumber(props.data.totalAmount)} VND</td>
      <td>Waiting for progressing</td>
      <td>{props.data.status}</td>
      <td className={styles.btnOrderDetail}>
        <NavLink
          className={styles.rightArrowLink}
          to={`/order/${props.data._id}`}
        >
          View
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right"
            className={styles.rightArrowIcon}
          />
        </NavLink>
      </td>
    </>
  );
};

export default OrderItem;
