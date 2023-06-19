import { useDispatch, useSelector } from "react-redux";
import styles from "./EmployeeNavigation.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function EmployeeNavigation(props: any) {
  return (
    <>
      <nav id={props.role === "ADMINISTRATOR" ? styles.navigationAdmin : styles.navigationEmployee}>
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
        <Link to="/addresses" className={styles.button}>
          Addresses
        </Link>
        <a href="#" className={styles.button}>
          Orders
        </a>
        <a href="#" className={styles.button}>
          Products
        </a>
      </nav>
    </>
  );
}
