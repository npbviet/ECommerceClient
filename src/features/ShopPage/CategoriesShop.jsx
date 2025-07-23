import styles from "./CategoriesShop.module.css";
import { useLocation } from "react-router-dom";
import Category from "./Category";

const categories = [
  { title: "APPLE", items: [{ label: "All", value: "all", path: "/shop" }] },
  {
    title: "IPHONE & MAC",
    items: [
      { label: "Iphone", value: "iphone", path: "/shop?category=iphone" },
      { label: "Ipad", value: "ipad", path: "/shop?category=ipad" },
      { label: "Macbook", value: "macbook", path: "/shop?category=macbook" },
    ],
  },
  {
    title: "WIRELESS",
    items: [
      { label: "Airpod", value: "airpod", path: "/shop?category=airpod" },
      { label: "Watch", value: "watch", path: "/shop?category=watch" },
    ],
  },
  {
    title: "OTHER",
    items: [
      { label: "Mouse", value: "mouse", path: "/shop?category=mouse" },
      { label: "Keyboard", value: "keyboard", path: "/shop?category=keyboard" },
      { label: "Other", value: "other", path: "/shop?category=other" },
    ],
  },
];

// Component: CategoriesShop
const CategoriesShop = ({ onClick }) => {
  const location = useLocation();

  const isActiveCategory = (path) => {
    const [pathname, search] = path.split("?");
    return (
      location.pathname === pathname && // So sánh phần pathname
      ((search && location.search === `?${search}`) || // Nếu có query string, kiểm tra khớp với location.search
        (!search && !location.search)) // Nếu không có query string, cả hai phải rỗng
    );
  };

  return (
    <div className={styles.categories}>
      <h1>CATEGORIES</h1>
      {categories.map((category) => (
        <Category
          key={category.title}
          title={category.title}
          items={category.items}
          onClick={onClick}
          isActiveCategory={isActiveCategory}
        />
      ))}
    </div>
  );
};

export default CategoriesShop;
