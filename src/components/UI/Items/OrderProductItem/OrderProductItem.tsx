import styles from "./OrderProductItem.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../auth/customerSlice";
import { Card } from "react-bootstrap";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeOrderProductStatus } from "../../../../services/customer-Service";

export default function OrderProductItem(props: any) {
  const [imagePath, setImagePath] = useState(null);

  const dispatch = useDispatch();

  const approveProductArrival = async() => {
    await changeOrderProductStatus(props.orderProductId);
  };

  const getImageUrl = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/spark-mart/api/images/product/${props.imageName}`
      );
      const blob = await response.blob();
      const imageUrl: any = URL.createObjectURL(blob);
      setImagePath(imageUrl);
    } catch (error) {
      console.error("Error retrieving image:", error);
    }
  };

  if (imagePath === null) {
    getImageUrl();
  }

  return (
    <>
      <Card id={styles.card}>
        <div id={styles.grid}>
          <div className={styles.item}>
            {imagePath ? (
              <img src={imagePath} width={220} height={158} />
            ) : (
              <div>Loading image...</div>
            )}
          </div>
          <div className={styles.item}>
            <h4 className={styles.textInformation}>{props.name}</h4>
          </div>
          <div className={styles.item}>
            <h4 className={styles.textInformation}>{props.amount}</h4>
          </div>
          <div className={styles.item}>
            <h4 className={styles.textInformation}>{props.arrivalDate}</h4>
          </div>
          <div className={styles.item}>
            {props.orderStatus === "SHIPPED" ? (
              <Button
                onClick={approveProductArrival}
                style={styles.deleteButton}
              >
                <FontAwesomeIcon icon={faCircleCheck} size="xl" color="black" />
              </Button>
            ) : (<h3>Product has not been shipped</h3>)}
          </div>
        </div>
      </Card>
    </>
  );
}
