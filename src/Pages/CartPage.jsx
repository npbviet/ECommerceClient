import { useEffect, useState } from "react";
import ShoppingCart from "../features/CartPage/ShoppingCart";
import styles from "../features/CartPage/CartPage.module.css";
import BannerShop from "../features/ShopPage/BannerShop";
import { getCart } from "../services/cartService";
import { useRouteLoaderData } from "react-router";

const CartPage = () => {
  const user = useRouteLoaderData("root").user.user || null;
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const data = await getCart(user.userID);
          setCartData(data);
        } catch (err) {
          console.error("Lỗi khi lấy giỏ hàng:", err);
        }
      }
    };
    fetchCart();
  }, [user]);

  return (
    <div className={styles.cartPage}>
      <BannerShop banner={"CART"} />
      <h1>SHOPPING CART</h1>
      {cartData ? <ShoppingCart data={cartData} /> : <p>Your cart is empty</p>}
    </div>
  );
};

export default CartPage;
