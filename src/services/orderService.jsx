import { json } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

// POST request chung
async function sendOrderRequest(endpoint, payload) {
  const response = await fetch(`${API_URL}/client/${endpoint}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) throw json({ status: 500, message: `${endpoint} failed!` });
  return response.json();
}

// Tạo đơn hàng mới
export async function createOrder(orderData) {
  return sendOrderRequest("create-order", { orderData });
}

// Cập nhật số lượng sản phẩm
export async function updateProductQuantity(productsInOrder) {
  return sendOrderRequest("product/update-quantity", { productsInOrder });
}

// Lấy đơn hàng của người dùng
export async function getOrders(userID) {
  return sendOrderRequest("get-order-user", { userID });
}

// Lấy đơn hàng theo ID
export async function getOrderById(orderID) {
  return sendOrderRequest("get-order-by-id", { orderID });
}
