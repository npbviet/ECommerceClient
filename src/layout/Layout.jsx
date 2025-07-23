import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import LiveChat from "./LiveChat";

const Layout = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <LiveChat />
      <Footer />
    </Fragment>
  );
};

export default Layout;
