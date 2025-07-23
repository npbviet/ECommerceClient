import { useCallback } from "react";

import { deleteCartItem } from "../../services/cartService";

import styles from "./SCartItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SCartItem = (props) => {
  const item = props.data.productItem;

  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };

  // Hàm cập nhật số lượng
  const handleQuantityChange = (quantity) => {
    if (quantity < 1) return;
    props.onQuantityChange(item._id, quantity);
  };

  // Hàm xóa sản phẩm
  const removeItemHandler = useCallback(async () => {
    await deleteCartItem(props.user, item._id);
    props.onRemoveItem?.(item._id);
  }, [item._id, props.user]);

  return (
    <>
      <td>
        <img src={item.img1} alt={item._id} />
      </td>
      <td className={styles.nameProduct}>{item.name}</td>
      <td>{moneyNumber(item.price)} VND</td>
      <td>
        <FontAwesomeIcon
          className={`${styles.iconQuantity} ${
            props.data.quantity === 1 ? styles.disabled : ""
          }`}
          icon="fa-solid fa-caret-left"
          onClick={() => handleQuantityChange(props.data.quantity - 1)}
        />
        <span>{props.data.quantity}</span>
        <FontAwesomeIcon
          className={`${styles.iconQuantity}`}
          icon="fa-solid fa-caret-right"
          onClick={() => handleQuantityChange(props.data.quantity + 1)}
        />
      </td>
      <td>{moneyNumber(item.price * props.data.quantity)} VND</td>
      <td>
        <FontAwesomeIcon
          icon="fa-regular fa-trash-can"
          onClick={removeItemHandler}
          className={styles.removeButton}
        />
      </td>
    </>
  );
};

export default SCartItem;
