import styles from "./BannerShop.module.css";

const BannerShop = (props) => {
  return (
    <div className={styles.bannerShop}>
      <h1>{props.banner}</h1>
      <p>{props.banner}</p>
    </div>
  );
};

export default BannerShop;
