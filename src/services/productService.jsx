import { json } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

// Lấy danh sách sản phẩm
export async function getProductData() {
  const response = await fetch(`${API_URL}/client/get-products`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok)
    throw json({ message: "Fetching product data failed!" }, { status: 500 });
  return response.json();
}
