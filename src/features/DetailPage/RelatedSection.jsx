import styles from "./RelatedSection.module.css";
import RelatedItem from "./RelatedItem";

const RelatedSection = (props) => {
  return (
    <div className={styles.relatedSection}>
      <h1>RELATED PRODUCTS</h1>
      <ul>
        {props.items.map((item) => (
          <li key={item._id}>
            <RelatedItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedSection;
