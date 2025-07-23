import { json } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
// Gửi POST request chung
async function sendCartRequest(endpoint, payload) {
  const response = await fetch(`${API_URL}/client/${endpoint}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) throw json({ status: 500, message: `${endpoint} failed!` });
  return response.json();
}

// Thêm vào giỏ hàng
export async function addCart(dataForCart) {
  return sendCartRequest("add-cart", dataForCart);
}

// Cập nhật giỏ hàng
export async function updateCart(dataForCart) {
  return sendCartRequest("update-cart", dataForCart);
}

// Xóa một sản phẩm
export async function deleteCartItem(userID, productID) {
  return sendCartRequest("cart/delete-item", { userID, productID });
}

// Xóa toàn bộ giỏ hàng
export async function deleteCart(userID) {
  return sendCartRequest("delete-cart", { userID });
}

// Lấy giỏ hàng của người dùng
export async function getCart(userID) {
  return sendCartRequest("get-cart-user", { userID });
}

// Tính tổng giá trị giỏ hàng
export function getTotalAmount(cart) {
  const total = cart.reduce(
    (sum, item) => sum + item.productItem.price * item.quantity,
    0
  );
  return total;
}
