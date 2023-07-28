import styles from "./EmployeeNavigation.module.css";
import { Link } from "react-router-dom";

export default function EmployeeNavigation(props: any) {
  return (
    <>
      <nav
        id={
          props.role === "ADMINISTRATOR"
            ? styles.navigationAdmin
            : styles.navigationEmployee
        }
      >
        <Link to="/" className={styles.button}>
          Home
        </Link>
        {props.role === "ADMINISTRATOR" && (
          <Link to="/users/employee" className={styles.button}>
            Employees
          </Link>
        )}
        <Link to="/users/customer" className={styles.button}>
          Customers
        </Link>
        {props.role === "ADMINISTRATOR" && (
          <Link to="/addresses" className={styles.button}>
            Addresses
          </Link>
        )}
        <Link to="/adminProducts" className={styles.button}>
          Products
        </Link>
        <Link to="/adminBrands" className={styles.button}>
          Brands
        </Link>
        <Link to="/adminCategories" className={styles.button}>
          Categories
        </Link>
      </nav>
    </>
  );
}
