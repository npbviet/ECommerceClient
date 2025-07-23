import { redirect } from "react-router-dom";
import { checkLogin, getCurrentUserInfor } from "./authService";
import { getProductData } from "./productService";

const API_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
// Lấy cả danh sách sản phẩm và giỏ hàng
export async function loadRootData() {
  try {
    const [user, productList, cartListRes] = await Promise.all([
      getCurrentUserInfor(),
      getProductData(),
      fetch(`${API_URL}/client/get-carts`, {
        method: "GET",
        credentials: "include",
      }),
    ]);

    if (!cartListRes.ok) {
      throw new Error("Fetching cart failed");
    }

    const cartList = await cartListRes.json();
    // console.log("cartList", cartList);
    return { user, productList, cartList };
  } catch (error) {
    throw json(
      { message: error.message || "Failed to load product or cart data" },
      { status: 500 }
    );
  }
}

// Loader kiểm tra nếu đã đăng nhập, chuyển hướng về trang chủ
export async function checkLoginLoader() {
  const { isLoggedIn } = await checkLogin();
  return isLoggedIn ? redirect("/") : null;
}

// Loader bảo vệ các route riêng tư
export async function checkAuthLoader() {
  try {
    const { isLoggedIn } = await checkLogin();
    return isLoggedIn ? null : redirect("/login");
  } catch (error) {
    throw json({ message: "Authentication check failed." }, { status: 500 });
  }
}
