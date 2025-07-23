import { useRouteLoaderData, useSearchParams } from "react-router-dom";

import BannerShop from "../features/ShopPage/BannerShop";
import CategoriesShop from "../features/ShopPage/CategoriesShop";
import ShopList from "../features/ShopPage/ShopList";

import styles from "../features/ShopPage/ShopPage.module.css";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateCategory = (type) => {
    setSearchParams({ category: `${type}` });
  };
  const data = useRouteLoaderData("root").productList;
  return (
    <div className={styles.shopPage}>
      <BannerShop banner={"SHOP"} />
      <div className={styles.containerShop}>
        <CategoriesShop onClick={updateCategory} />
        <ShopList data={data} />
      </div>
    </div>
  );
};

export default ShopPage;
