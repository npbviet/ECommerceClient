import { useNavigate } from "react-router-dom";
import styles from "./RelatedItem.module.css";

const RelatedItem = (props) => {
  const navigate = useNavigate();

  return (
    <section className={styles.relatedItems}>
      <img
        src={props.item.img1}
        alt={props.item.img1}
        onClick={() => {
          navigate(`/detail/${props.item._id}`);
        }}
      />
      <h1>{props.item.name}</h1>
      <h2>{Number(props.item.price).toLocaleString(`de-DE`)} VND</h2>
    </section>
  );
};

export default RelatedItem;
