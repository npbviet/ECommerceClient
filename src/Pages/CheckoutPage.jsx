import styles from "../features/CheckoutPage/CheckoutPage.module.css";
import BannerCheckout from "../features/CheckoutPage/BannerCheckout";
import BillingDetail from "../features/CheckoutPage/BillingDetail";

const CheckoutPage = () => {
  return (
    <div className={styles.checkoutPage}>
      <BannerCheckout />
      <h1>BILLING DETAIL</h1>
      <BillingDetail />
    </div>
  );
};

export default CheckoutPage;
