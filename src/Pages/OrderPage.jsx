import { useEffect, useState } from "react";
import OrderList from "../features/OrderPage/OrderList";
import styles from "../features/OrderPage/OrderPage.module.css";
import BannerShop from "../features/ShopPage/BannerShop";
import { getOrders } from "../services/orderService";
import { useRouteLoaderData } from "react-router";

const OrderPage = () => {
  const user = useRouteLoaderData("root").user.user || null;
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (user) {
        try {
          const data = await getOrders(user.userID);
          setOrderData(data);
        } catch (err) {
          console.error("Lỗi khi lấy giỏ hàng:", err);
        }
      }
    };
    fetchOrder();
  }, [user]);
  // console.log(orderData);

  return (
    <div className={styles.orderPage}>
      <BannerShop banner={"HISTORY"} />
      <h1>YOUR ORDER </h1>
      {orderData ? <OrderList data={orderData} /> : <p>Your order is empty</p>}
    </div>
  );
};

export default OrderPage;
