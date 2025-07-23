import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <ul>
        <h1>
          <a href="#">CUSTOMER SERVICES</a>
        </h1>
        <li>
          <a href="#">Help & Contact Us</a>
        </li>
        <li>
          <a href="#">Returns & Refunds</a>
        </li>
        <li>
          <a href="#">Online Store</a>
        </li>
        <li>
          <a href="#">Terms & Conditions</a>
        </li>
      </ul>
      <ul>
        <h1>
          <a href="#">COMPANY</a>
        </h1>
        <li>
          <a href="#">What We Do</a>
        </li>
        <li>
          <a href="#">Avaible Services</a>
        </li>
        <li>
          <a href="#">Latest Posts</a>
        </li>
        <li>
          <a href="#">FAQs</a>
        </li>
      </ul>
      <ul>
        <h1>
          <a href="#">SOCIAL MEDIA</a>
        </h1>
        <li>
          <a href="#">Twitter</a>
        </li>
        <li>
          <a href="#">Instagram</a>
        </li>
        <li>
          <a href="#">Facebook</a>
        </li>
        <li>
          <a href="#">Printerest</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
