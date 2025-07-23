import { useEffect, useMemo, useState } from "react";
import styles from "./SearchAndSort.module.css";

const SearchAndSort = (props) => {
  //State cho lọc theo search
  const [filterText, setFilterText] = useState("");

  // Lọc và sắp xếp items
  const filteredAndSortedItems = useMemo(() => {
    let filteredItems = [...props.items];
    if (filterText) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (props.sortChoice === "minPrice") {
      filteredItems.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (props.sortChoice === "maxPrice") {
      filteredItems.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return filteredItems;
  }, [filterText, props.sortChoice, props.items]);
  useEffect(() => {
    props.update(filteredAndSortedItems);
  }, [filterText, props.sortChoice, props.items]);

  return (
    <div className={styles.searchAndSort}>
      <input
        type="text"
        placeholder="Enter Search Here"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className={styles.sortChoice}>
        <select
          name="choice"
          id="choice"
          value={props.sortChoice}
          onChange={(e) => props.sort(e.target.value)}
        >
          <option value="defaultSorting">Default Sorting</option>
          <option value="minPrice">Min - Max Price</option>
          <option value="maxPrice">Max - Min Price</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;
