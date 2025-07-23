import { useState } from "react";
import styles from "./TrendingProducts.module.css";
import TrendingItem from "./TrendingItem";
import Popup from "./Popup";

import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../Store/StatePopup";

const TrendingProducts = (props) => {
  //Lấy thông tin
  const products = Array.isArray(props.data) ? props.data.slice(0, 7) : [];

  //Truyền thông tin/ mở popup
  const isOpen = useSelector((state) => state.popup.isOpen);
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const toggleItem = (product) => {
    if (selectedItem && selectedItem._id === product._id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(product);
      dispatch(popupActions.SHOW_POPUP());
    }
  };

  return (
    <div className={styles.trending}>
      <div className={styles.titleTrending}>
        MADE THE HARD WAY
        <h1>TOP TRENDING PRODUCTS</h1>
      </div>
      <ul className={styles.productsList}>
        {products.map((product, index) => {
          return (
            <div key={index}>
              <TrendingItem
                item={product}
                onClick={() => {
                  toggleItem(product);
                }}
              />
            </div>
          );
        })}
      </ul>
      {isOpen && selectedItem ? <Popup item={selectedItem} /> : ""}
    </div>
  );
};

export default TrendingProducts;
