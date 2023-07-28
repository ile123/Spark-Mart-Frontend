import { Link } from "react-router-dom";
import styles from "./CustomerNavigation.module.css";

export default function CustomerNavigation() {
  return (
    <>
      <nav id={styles.navigation}>
        <Link to="/" className={styles.button}>
          Home
        </Link>
        <Link to="/brands" className={styles.button}>
          Brands
        </Link>
        <Link to="/orders" className={styles.button}>
          Orders
        </Link>
        <Link to="/about-us" className={styles.button}>
          About Us
        </Link>
      </nav>
    </>
  );
}
