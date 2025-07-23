import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 6; // Số items mỗi trang
  //Item đầu tiên và item cuối cùng của mỗi trang
  const totalPages = Math.ceil(props.items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //Render lại item khi page/item thay đổi
  useEffect(() => {
    props.update(props.items.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, props.items]);
  // Đặt lại currentPage về 1 khi items thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [props.items]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className={styles.pagination}>
      <FontAwesomeIcon
        className={`${styles.iconPagination} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        icon="fa-solid fa-angles-left"
        onClick={() => handlePageChange(currentPage - 1)}
      />
      <Button className={styles.currentPage}>{currentPage}</Button>
      <FontAwesomeIcon
        className={`${styles.iconPagination} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        icon="fa-solid fa-angles-right"
        onClick={() => handlePageChange(currentPage + 1)}
      />
      <p>
        Showing {indexOfFirstItem + 1} -{" "}
        {currentPage === totalPages ? props.items.length : indexOfLastItem} of{" "}
        {props.items.length} results
      </p>
    </div>
  );
};

export default Pagination;
