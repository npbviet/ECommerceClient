import styles from "./ShopItems.module.css";
import { useNavigate } from "react-router-dom";

function ShopItems(props) {
  const navigate = useNavigate();

  return (
    <li
      className={styles.itemsShop}
      onClick={() => {
        navigate(`/detail/${props.item._id}`);
      }}
    >
      <img src={props.item.img1} alt={props.item.name} />
      <h1>{props.item.name}</h1>
      {Number(props.item.price).toLocaleString(`de-DE`)} VND
    </li>
  );
}

export default ShopItems;
