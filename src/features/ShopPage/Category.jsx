import { NavLink } from "react-router-dom";
import styles from "./CategoriesShop.module.css";

const Category = ({ title, items, onClick, isActiveCategory }) => {
  // Kiểm tra trạng thái active của danh mục
  const isCategoryActive = items.some((item) => isActiveCategory(item.path));

  return (
    <div>
      {/* Tiêu đề của danh mục */}
      <div
        className={
          isCategoryActive ? styles.titleCategories1 : styles.titleCategories
        }
      >
        {title}
      </div>
      {/* Danh sách các mục con */}
      <ul>
        {items.map((item) => (
          <li key={item.value}>
            <NavLink
              className={
                isActiveCategory(item.path)
                  ? styles.active
                  : styles.nameCategories
              }
              to={item.path}
              onClick={() => onClick(item.value)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Category;
