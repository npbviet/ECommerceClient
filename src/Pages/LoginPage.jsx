import LoginForm from "../features/LoginPage/LoginForm";
import styles from "../features/LoginPage/LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.contentBanner}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
