import RegisterForm from "../features/RegisterPage/RegisterForm";
import styles from "../features/RegisterPage/RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.contentBanner}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
