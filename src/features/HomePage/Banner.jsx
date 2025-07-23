import { useNavigate } from "react-router-dom";
import backgroundImage from "../../img/banner1.jpg";
import styles from "./Banner.module.css";
import Button from "../../components/Button";

const Banner = () => {
  const navigate = useNavigate();
  function navigateHandler() {
    navigate("/shop");
  }
  return (
    <div className={styles.banner}>
      <img src={backgroundImage} alt="Pic1" />
      <div className={styles.contentBanner}>
        <div className={styles.titleBanner}>NEW INSPIRATION 2020</div>
        <div className={styles.saleBanner}>20% OFF ON NEW SEASON</div>
        <Button onClick={navigateHandler}>Browse collections</Button>
      </div>
    </div>
  );
};

export default Banner;
