//@ts-nocheck
import styles from "./ViewUser.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../../../services/user-Service";
import { getAddressById } from "../../../../services/address-Service";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ViewUser() {

  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});

  const {
    state: { userId },
  } = useLocation();

  useEffect(() => {
    getUserById(userId).then((result: any) => {
      setUser(result.data);
      getAddressById(result.data.addressId).then((result: any) =>
        setAddress(result.data)
      );
    });
  }, []);

  if (JSON.stringify(user) === "{}" && JSON.stringify(address) === "{}") {
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );
  }

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.item}>
          <Card id={styles.userCard}>
            <Card.Header>
              <h3 className={styles.title}>User</h3>
            </Card.Header>
            <Card.Body>
              <h4 className={styles.label}>First Name</h4>
              <h4 className={styles.infoField}>{user?.firstName}</h4>
              <h4 className={styles.label}>Last Name</h4>
              <h4 className={styles.infoField}>{user?.lastName}</h4>
              <h4 className={styles.label}>Email</h4>
              <h4 className={styles.infoField}>{user?.email}</h4>
              <h4 className={styles.label}>Gender</h4>
              <h4 className={styles.infoField}>{user?.gender}</h4>
              <h4 className={styles.label}>Role</h4>
              <h4 className={styles.infoField}>{user?.role}</h4>
            </Card.Body>
            <Card.Footer>
              <Link
                to="/editUserInformation"
                className={styles.button}
                state={{ userId: userId }}
              >
                Edit
              </Link>
            </Card.Footer>
          </Card>
        </div>
        <div className={styles.item}>
          <Card id={styles.addressCard}>
            <Card.Header>
              <h3 className={styles.title}>Address</h3>
            </Card.Header>
            <Card.Body>
              {address?.streetAddress !== "" ? (
                <div>
                  <h4 className={styles.label}>Street Address</h4>
                  <h4 className={styles.infoField}>{address?.streetAddress}</h4>
                  <h4 className={styles.label}>City</h4>
                  <h4 className={styles.infoField}>{address?.city}</h4>
                  <h4 className={styles.label}>Postal Code</h4>
                  <h4 className={styles.infoField}>{address?.postalCode}</h4>
                  <h4 className={styles.label}>Role</h4>
                  <h4 className={styles.infoField}>{address?.province}</h4>
                  <h4 className={styles.label}>Country</h4>
                  <h4 className={styles.infoField}>{address?.country}</h4>
                </div>
              ) : (
                <h4 id={styles.noAddress}>No address provided</h4>
              )}
            </Card.Body>
            <Card.Footer>
              <Link
                to="/editUserAddress"
                className={styles.button}
                state={{ userId: userId, addressId: address.id }}
              >
                Edit
              </Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
}
