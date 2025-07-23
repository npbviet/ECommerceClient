import OrderItem from "./OrderItem";

import styles from "./OrderList.module.css";

const OrderList = (props) => {
  if (props.data.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  return (
    <div className={styles.orderList}>
      <div className={styles.orderTable}>
        <table>
          <thead>
            <tr>
              <th>ID ORDER</th>
              <th>ID USER</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>DELIVERY</th>
              <th>STATUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item) => (
              <tr key={item._id}>
                <OrderItem data={item} user={props.data.userID} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
