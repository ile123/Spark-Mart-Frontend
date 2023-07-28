import styles from "./CustomerOrderItem.module.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

export default function CustomerOrderItem(props: any) {
  return (
    <>
      <Card id={styles.card}>
        <div id={styles.grid}>
          <div className={styles.item}>
            <h4>{props.orderNO}</h4>
          </div>
          <div className={styles.item}>
            <h4>{props.orderDate}</h4>
          </div>
          <div className={styles.item}>
            <h4>{props.shippingDate}</h4>
          </div>
          <div className={styles.item}>
            <h4>{props.total}$</h4>
          </div>
          <div className={styles.item}>
            <h4>{props.status}</h4>
          </div>
          <div className={styles.item}>
            <Link to={"allProductsByOrder/" + props.id}>
                <FontAwesomeIcon icon={faClipboardList} size="xl" color="black" />
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
}
