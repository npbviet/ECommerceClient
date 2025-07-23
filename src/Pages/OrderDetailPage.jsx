import { useEffect, useState, useMemo } from "react";
import OrderDList from "../features/OrderDetailPage/OrderDList";
import UserOrder from "../features/OrderDetailPage/UserOrder";
import { useParams, useRouteLoaderData } from "react-router-dom";
import styles from "../features/OrderDetailPage/OrderDetailPage.module.css";
import { getOrders } from "../services/orderService";
import BannerShop from "../features/ShopPage/BannerShop";
const OrderDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { orderID } = useParams(); // ✅ lấy params từ route
  const user = useRouteLoaderData("root").user.user || null;

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (user) {
        try {
          const data = await getOrders(user.userID);
          setOrderData(data);
        } catch (err) {
          console.error("Lỗi khi lấy đơn hàng:", err);
        }
      }
    };
    fetchOrder();
  }, [user]);

  // Tìm đơn hàng có id trùng với params
  const selectedOrder = useMemo(() => {
    if (!orderData || !orderID) return null;
    const found = orderData.find((order) => {
      return order._id === orderID;
    });
    return found;
  }, [orderData, orderID]);

  return (
    <div className={styles.orderDetailPage}>
      <BannerShop banner={"ORDER DETAIL"} />
      {selectedOrder ? (
        <>
          <UserOrder item={selectedOrder} />
          <OrderDList item={selectedOrder} />
        </>
      ) : (
        <div className={styles["instruction"]}>
          <p className={styles["title"]}>
            To get details of order, please follow these steps:
          </p>
          <ul className={styles["instruction-content"]}>
            <li>Visit the Order page by clicked to "Order" in navbar</li>
            <li>
              Select a certain order in list then click to "View" button of this
              one
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
