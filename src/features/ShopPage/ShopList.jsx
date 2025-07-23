import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import ShopItems from "./ShopItems";
import Pagination from "./Pagination";
import SearchAndSort from "./SearchAndSort";

import styles from "./ShopList.module.css";

const ItemShopList = (props) => {
  //1. Lấy dữ liệu + filter theo category
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeCategory = searchParams.get("category");

  useEffect(() => {
    const data = props.data;
    if (typeCategory) {
      setItems(data.filter((item) => item.category === typeCategory));
    } else {
      setItems(data);
    }
  }, [typeCategory]);

  //2. Set up cho SearchAndSort
  const [sortedItems, setSortedItems] = useState([]);
  const handleSorted = (listItem) => {
    setSortedItems(listItem);
  };
  //State cho lọc theo type choice
  const [sortChoice, setSortChoice] = useState("defaultSorting");
  const handleSortChoice = (type) => {
    setSortChoice(type);
  };
  //3. Set up cho Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const handleItemChange = (listItem) => {
    setCurrentItems(listItem);
  };

  //4. Scroll đến view hiện tại
  const divRef = useRef();
  const scrollToElement = () => {
    const { current } = divRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToElement();
  }, [currentItems]);

  return (
    <div className={styles.shopList} ref={divRef}>
      <SearchAndSort
        items={items}
        update={handleSorted}
        sort={handleSortChoice}
        sortChoice={sortChoice}
      />
      <ul className={styles.itemList}>
        {currentItems.map((item) => (
          <div
            key={`${item._id} + ${typeCategory}+${sortChoice}+${sortedItems}`}
            className={styles.item}
          >
            <ShopItems item={item} />
          </div>
        ))}
      </ul>
      <Pagination
        update={handleItemChange}
        items={sortedItems}
        currentItems={currentItems}
      />
    </div>
  );
};

export default ItemShopList;
