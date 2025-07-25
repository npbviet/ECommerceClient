import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import DetailPage from "./Pages/DetailPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import OrderPage from "./Pages/OrderPage";
import OrderDetailPage from "./Pages/OrderDetailPage";

import {
  checkAuthLoader,
  checkLoginLoader,
  loadRootData,
} from "./services/loaderService";
import { submitAuthenDataAction } from "./services/authService";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import ErrorPage from "./Pages/ErrorPage";

library.add(fab, fas, far);

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <ErrorPage />,
    loader: loadRootData,
    id: "root",
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "shop", element: <ShopPage /> },
          {
            path: "detail/:productID",
            loader: checkAuthLoader,
            element: <DetailPage />,
          },
          { path: "cart", loader: checkAuthLoader, element: <CartPage /> },
          {
            path: "checkout",
            loader: checkAuthLoader,
            element: <CheckoutPage />,
          },
          {
            path: "order",
            loader: checkAuthLoader,
            element: <OrderPage />,
          },
          {
            path: "order/:orderID",
            loader: checkAuthLoader,
            element: <OrderDetailPage />,
          },
        ],
      },
      {
        path: "",
        loader: checkLoginLoader,
        id: "getUserData",
        children: [
          {
            path: "register",
            action: submitAuthenDataAction,
            element: <RegisterPage />,
          },
          {
            path: "login",
            action: submitAuthenDataAction,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
