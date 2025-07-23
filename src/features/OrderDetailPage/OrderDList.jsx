import { useEffect, useState } from "react";
import styles from "./OrderDList.module.css";
import OrderDItem from "./OrderDItem";

const OrderDList = (props) => {
  return (
    <section className={styles.orderDList}>
      <div className={styles.orderDTable}>
        <table>
          <thead>
            <tr>
              <th>ID PRODUCT</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COUNT</th>
            </tr>
          </thead>
          <tbody>
            {props.item.products.map((item) => (
              <tr key={item._id} className={styles.orderDItem}>
                <OrderDItem data={item} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderDList;
