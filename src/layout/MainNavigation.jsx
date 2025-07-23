import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./MainNavigation.module.css";
import { logout } from "../services/authService";

const MainNavigation = () => {
  const navigate = useNavigate();
  const data = useRouteLoaderData("root").user || {};
  const user = data.user || null;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink className={classes.logo} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={classes.navItem} to="/shop">
              Shop
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.brand}>BOUTIQUE</div>
      <nav>
        <ul>
          <li>
            <FontAwesomeIcon
              className={classes.icon}
              icon="fa-solid fa-cart-flatbed"
            />
            <NavLink className={classes.navItem} to="/cart">
              Cart
            </NavLink>
          </li>
          {user ? (
            <li className={classes.userInfo}>
              <FontAwesomeIcon
                className={classes.icon}
                icon="fa-solid fa-user"
              />
              <div className={classes.userName}>{user.fullName}</div>
              <FontAwesomeIcon
                className={classes.iconDown}
                icon="fa-solid fa-caret-down"
              />
              <button onClick={handleLogout}>(Logout)</button>
            </li>
          ) : (
            <li>
              <FontAwesomeIcon
                className={classes.icon}
                icon="fa-solid fa-user"
              />
              <NavLink className={classes.navItem} to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
