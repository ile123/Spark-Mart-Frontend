import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomerNavigation from "../Navigation/CustomerNavigation/CustomerNavigation";
import { logout } from "../../../auth/authSlice";
import { useState } from "react";
import EmployeeNavigation from "../Navigation/EmployeeNavigation/EmployeeNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { getUserById } from "../../../services/user-Service";

export default function Header() {
  const { userInfo, loading } = useSelector((state: any) => state.auth);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  if (JSON.stringify(user) === "{}") {
    if (userInfo.userId !== undefined) {
      getUserById(userInfo.userId).then((result: any) => setUser(result.data));
    }
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
                <Link to="/profile" className={styles.button}>
                  {JSON.stringify(user) === "{}" && <h5>Profile</h5>}
                  {JSON.stringify(user) !== "{}" && (
                    <h5>Profile({user?.firstName})</h5>
                  )}
                </Link>
                <Link
                  to=""
                  className={styles.button}
                  onClick={() => dispatch(logout())}
                >
                  Logout
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
