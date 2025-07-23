import { useNavigate, useRouteLoaderData } from "react-router";
import { useEffect, useMemo, useState } from "react";

import { checkLogin } from "../../services/authService";
import { createOrder } from "../../services/orderService";
import {
  deleteCart,
  getCart,
  getTotalAmount,
} from "../../services/cartService";

import YourOrder from "./YourOrder";

import styles from "./BillingDetail.module.css";
import Button from "../../components/Button";

const BillingDetail = () => {
  const user = useRouteLoaderData("root").user.user || null;
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const data = await getCart(user.userID);
          setCartData(data.cartData);
        } catch (err) {
          console.error("Lỗi khi lấy giỏ hàng:", err);
        }
      }
    };
    fetchCart();
  }, [user]);
  const cartOfCurrentUser = cartData || [];

  const totalAmount = useMemo(
    () => getTotalAmount(cartOfCurrentUser),
    [cartOfCurrentUser]
  );

  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };

  const userID = user ? user.userID : "";
  const [fullName, setFullName] = useState(user ? user.fullName : "");
  const [email, setEmail] = useState(user ? user.userEmail : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  async function createOrderHandler() {
    try {
      // Define "emailConent" variable to store content of email
      const emailContent = `<div style="font-family: Arial, sans-serif; color: #fff; background-color: #202020; padding: 20px;">
        <div style="color: #fff">
          <h2>Xin Chào ${fullName}</h2>
          <p>
            <b>Phone:</b> ${phone}
          </p>
          <p>
            <b>Address:</b> ${address}
          </p>
        </div>
        <table style="width: 100%; margin-top: 20px; color: #fff;">
          <thead>
            <tr>
              <th style="border: 1px solid #fff; padding: 8px;">
                Tên Sản Phẩm
              </th>
              <th style="border: 1px solid #fff; padding: 8px;">Hình Ảnh</th>
              <th style="border: 1px solid #fff; padding: 8px;">Giá</th>
              <th style="border: 1px solid #fff; padding: 8px;">Số Lượng</th>
              <th style="border: 1px solid #fff; padding: 8px;">Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            ${cartOfCurrentUser
              .map(
                (item) =>
                  `<tr style="text-align: center">
                    <td style="border: 1px solid #fff; padding: 8px;">
                      ${item.productItem.name}
                    </td>
                    <td style="border: 1px solid #fff; padding: 8px; text-align: center;">
                      <img
                        src=${item.productItem.img1}
                        alt=${item.productItem.category}
                        style="width: 100px; height: auto;"
                      />
                    </td>
                    <td style="border: 1px solid #fff; padding: 8px;">
                      ${moneyNumber(item.productItem.price)}
                    </td>
                    <td style="border: 1px solid #fff; padding: 8px;">
                      ${item.quantity}
                    </td>
                    <td style="border: 1px solid #fff; padding: 8px;">
                      ${moneyNumber(item.quantity * item.productItem.price)}
                    </td>
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
        <div style="color: #fff; font-size: 15px; font-weight: bold">
          <p style="margin-top: 20px; font-size: 1.2em;">
            <b>Tổng Thanh Toán:</b> ${moneyNumber(totalAmount)} VND
          </p>
          <p>Cảm ơn bạn!</p>
        </div>
      </div>`;

      //orderInfor
      const formattedCart = cartOfCurrentUser.map((item) => ({
        productId: item.productItem._id,
        quantity: item.quantity,
      }));

      const orderData = {
        orderInfor: {
          user: { userID, fullName, email, phone, address },
          products: formattedCart,
          totalAmount: totalAmount,
        },
        emailContent: emailContent,
      };
      console.log("orderData", orderData);
      //  Check expired for login session of current user
      const resData = await checkLogin();
      const isLoggedIn = resData.isLoggedIn;
      if (isLoggedIn) {
        // Call "createNewOrder()" function to create an order and save to "order" model
        await createOrder(orderData);
        // Call "deleteCart()" function to delete cart of currrent user after create new order is successful
        await deleteCart(userID);
        alert("Đặt hàng thành công!");
        navigate("/order");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in create new order: ", error);
    }
  }
  return (
    <div className={styles.billingDetail}>
      <div className={styles.billingForm}>
        <form>
          <label>FULLNAME:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Your Full Name Here!"
          />
          <label>EMAIL:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Here!"
          />
          <label>PHONE NUMBER:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Your Phone Number Here!"
          />
          <label>ADDRESS:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Your Address Here!"
          />
          <Button
            className={styles.billingButton}
            onClick={(e) => {
              e.preventDefault();
              createOrderHandler();
            }}
          >
            Place order
          </Button>
        </form>
      </div>
      <div className={styles.cartTotal}>
        <YourOrder item={cartOfCurrentUser} total={totalAmount} />
      </div>
    </div>
  );
};

export default BillingDetail;
