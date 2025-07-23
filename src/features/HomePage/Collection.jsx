import { useNavigate } from "react-router-dom";
import img1 from "../../img/product_1.png";
import img2 from "../../img/product_2.png";
import img3 from "../../img/product_3.png";
import img4 from "../../img/product_4.png";
import img5 from "../../img/product_5.png";
import styles from "./Collection.module.css";

const Collection = () => {
  const navigate = useNavigate();
  function navigateHandler(type) {
    navigate(`/shop?category=${type}`);
  }
  return (
    <div className={styles.collection}>
      <div className={styles.titleCollection}>
        CAREFULLY CREATED COLLECTIONS
        <h1>BROWSE OUR CATEGORIES</h1>
      </div>
      <div className={styles.grid1Collection}>
        <img
          src={img1}
          alt="Pic1"
          onClick={() => {
            navigateHandler("iphone");
          }}
        />

        <img
          src={img2}
          alt="Pic2"
          onClick={() => {
            navigateHandler("macbook");
          }}
        />
      </div>
      <div className={styles.grid2Collection}>
        <img
          src={img3}
          alt="Pic3"
          onClick={() => {
            navigateHandler("ipad");
          }}
        />
        <img
          src={img4}
          alt="Pic4"
          onClick={() => {
            navigateHandler("watch");
          }}
        />
        <img
          src={img5}
          alt="Pic5"
          onClick={() => {
            navigateHandler("airpod");
          }}
        />
      </div>
    </div>
  );
};

export default Collection;
