import { Link } from "react-router-dom";
import styles from "./CustomerNavigation.module.css";

export default function CustomerNavigation() {
  return (
    <>
      <nav id={styles.navigation}>
        <Link to="/" className={styles.button}>
          Home
        </Link>
        <Link to="/products" className={styles.button}>
          Products
        </Link>
        <Link to="/brands" className={styles.button}>
          Brands
        </Link>
        <a href="#" className={styles.button}>
          About Us
        </a>
      </nav>
    </>
  );
}
