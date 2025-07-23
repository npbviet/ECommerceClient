import styles from "./Quantity.module.css";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";

import { addCart } from "../../services/cartService";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const Quantity = (props) => {
  const user = useRouteLoaderData("root").user.user || null;

  const [currentQuantity, setCurrentQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = useCallback((quantity) => {
    if (quantity < 1) return;
    setCurrentQuantity(quantity);
  }, []);

  // Hàm xử lý khi bấm nút Add to Cart
  const handleAddToCart = useCallback(() => {
    const newProduct = {
      userID: user.userID,
      productID: props.items._id,
      quantity: currentQuantity,
    };

    addCart(newProduct);
    alert("Thêm vào giỏ hàng thành công");

    navigate("/cart");
  }, [user, currentQuantity, navigate]);

  return (
    <div className={styles.box_quantity}>
      <div className={styles.quantityGrid}>
        <div className={styles.grid_text}>QUANTITY</div>
        <div className={styles.grid_number}>
          <FontAwesomeIcon
            className={`${styles.iconQuantity} ${
              currentQuantity === 1 ? styles.disabled : ""
            }`}
            icon="fa-solid fa-caret-left"
            onClick={() => handleQuantityChange(currentQuantity - 1)}
          />
          <span>{currentQuantity}</span>
          <FontAwesomeIcon
            className={`${styles.iconQuantity} `}
            icon="fa-solid fa-caret-right"
            onClick={() => handleQuantityChange(currentQuantity + 1)}
          />
        </div>
      </div>
      <Button onClick={handleAddToCart} className={`${styles.buttonAddCart} `}>
        Add to cart
      </Button>
    </div>
  );
};

export default Quantity;
