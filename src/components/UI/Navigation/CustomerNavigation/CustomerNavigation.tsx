import { Link } from "react-router-dom";
import styles from "./CustomerNavigation.module.css";

export default function CustomerNavigation(props: any) {
  return (
    <>
      <nav id={styles.navigation}>
        <Link to="/" className={styles.button}>
          Home
        </Link>
        <Link to="/brands" className={styles.button}>
          Brands
        </Link>
        <Link to="/categories" className={styles.button}>
          Categories
        </Link>
        <Link to="/products" className={styles.button}>
          Products
        </Link>
        {JSON.stringify(props.user) !== "{}" && (
          <Link to="/orders" className={styles.button}>
            Orders
          </Link>
        )}
        <Link to="/aboutUs" id={styles.aboutUsButton}>
          About Us
        </Link>
      </nav>
    </>
  );
}
