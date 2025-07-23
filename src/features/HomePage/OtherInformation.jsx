import Button from "../../components/Button";
import styles from "./OtherInformation.module.css";

const OtherInformation = () => {
  return (
    <div className={styles.otherInformation}>
      <div className={styles.flexOtherInfo}>
        <div>
          <h1>FREE SHIPPING</h1>
          Free shipping worldwide
        </div>
        <div>
          <h1>24 X 7 SERVICE</h1>
          Free shipping worldwide
        </div>
        <div>
          <h1>FESTIVAL OFFER</h1>
          Free shipping worldwide
        </div>
      </div>
      <div className={styles.gridOtherInfo}>
        <div>
          <h1>LET'S BE FRIENDS</h1>
          Nsi nsi tempor consequat laboris nisi
        </div>
        <div className={styles.inputOtherInfo}>
          <input
            type="text"
            name="email"
            placeholder="Enter your email adress"
          />
          <Button>Subcribe</Button>
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
