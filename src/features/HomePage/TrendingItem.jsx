import styles from "./TrendingItem.module.css";

function TrendingItem(props) {
  return (
    <li className={styles.trendingItem} onClick={props.onClick}>
      <img src={props.item.img1} alt={props.item.name} />
      <h1>{props.item.name}</h1>
      {Number(props.item.price).toLocaleString(`de-DE`)} VND
    </li>
  );
}

export default TrendingItem;
