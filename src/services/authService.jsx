import { json, redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
// Đăng ký và đăng nhập
export async function submitAuthenDataAction({ request }) {
  const formData = await request.formData();
  const mode = formData.get("mode"); // "signup" hoặc "login"

  // Tạo object dữ liệu gửi đi
  const userData =
    mode === "signup"
      ? {
          fullName: formData.get("fullname"),
          email: formData.get("email"),
          password: formData.get("password"),
          phone: formData.get("phone"),
        }
      : {
          email: formData.get("email"),
          password: formData.get("password"),
        };

  const apiURL = `${API_URL}/client/${mode}`;

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const resData = await response.json();

    if (mode === "signup") {
      // thành công thì redirect
      if (resData.message === "Đăng ký thành công") {
        alert("Đăng ký thành công");
        return redirect("/login");
      } else {
        return { message: resData.message };
      }
    }

    if (mode === "login") {
      if (!response.ok || resData.isAuthError) {
        return {
          message: resData.message || "Thông tin đăng nhập không đúng.",
          clearPassword: true,
        };
      }

      alert("Đăng nhập thành công");
      return { success: true, user: resData };
    }
  } catch (err) {
    return { message: "Lỗi khi gửi dữ liệu đến server." };
  }
}

// Kiểm tra đăng nhập
export async function checkLogin() {
  try {
    const response = await fetch(`${API_URL}/client/checklogin`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw json(
        { message: "Fetching process failed!" },
        { status: response.status || 500 } // <-- status phải ở đây
      );
    }

    return await response.json();
  } catch (error) {
    throw json(
      { message: "Check login failed!", details: error.message },
      { status: 500 } // <-- không đặt trong data
    );
  }
}
// Lấy thông tin người dùng hiện tại
export async function getCurrentUserInfor() {
  const response = await fetch(`${API_URL}/client/get-current-user`, {
    method: "GET",
    credentials: "include",
  });
  // console.log("received", response);
  if (response.status === 401) {
    return { user: null };
  }

  if (!response.ok) {
    throw json({ message: "Get current user info failed!" }, { status: 500 });
  }

  const data = await response.json();

  return { user: data };
}

// Đăng xuất
export async function logout() {
  const response = await fetch(`${API_URL}/client/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw json({ message: "Logout failed!" }, { status: 500 });
  }

  return response.json();
}
