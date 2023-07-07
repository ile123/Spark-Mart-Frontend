import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomerNavigation from "../Navigation/CustomerNavigation/CustomerNavigation";
import { logout } from "../../../auth/authSlice";
import { deleteCart } from "../../../auth/customerSlice";
import EmployeeNavigation from "../Navigation/EmployeeNavigation/EmployeeNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { userInfo, loading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(deleteCart());
    dispatch(logout())
  }

  return (
    <>
      <header id={styles.header}>
        <div id={styles.grid}>
          <div className={styles.item}>
            <h3 id={styles.sparkmart}>SPARK MART</h3>
          </div>
          <div className={styles.item}>
            {JSON.stringify(userInfo) !== "{}" ? (
              userInfo.role !== "CUSTOMER" ? (
                <EmployeeNavigation role={userInfo.role} />
              ) : (
                <CustomerNavigation />
              )
            ) : (
              <CustomerNavigation />
            )}
          </div>
          <div className={styles.item}>
            {loading === true ? (
              <FontAwesomeIcon
                id={styles.loading}
                icon={faCog}
                pulse
                size="2x"
              />
            ) : JSON.stringify(userInfo) !== "{}" ? (
              <div id={styles.logout}>
                <Link to="/cart" id={styles.shoppingCart}>
                  <FontAwesomeIcon icon={faCartShopping} size="xl" />
                </Link>
                <Link to="/profile" className={styles.button}>
                  {JSON.stringify(userInfo) === "{}" && <h5 className={styles.profileName}>Profile</h5>}
                  {JSON.stringify(userInfo) !== "{}" && (
                    <h5 className={styles.profileName}>Profile({userInfo?.firstName})</h5>
                  )}
                </Link>
                <Link
                  to=""
                  className={styles.button}
                  onClick={logoutHandler}
                >
                  <h5 className={styles.profileName}>Logout</h5>
                </Link>
              </div>
            ) : (
              <div id={styles.login}>
                <Link to="/login" className={styles.button}>
                  Login
                </Link>
                <Link to="/register" className={styles.button}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
