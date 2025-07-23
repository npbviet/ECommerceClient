import styles from "./BannerCheckout.module.css";

const BannerCheckout = () => {
  return (
    <div className={styles.bannerCheckout}>
      <h1>CHECKOUT</h1>
      <p>
        HOME/CART/<span>CHECKOUT</span>
      </p>
    </div>
  );
};

export default BannerCheckout;
