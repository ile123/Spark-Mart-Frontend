import { Button } from "@mui/material";
import styles from "./OrderItem.module.css";
import { changeOrderStatus } from "../../../../services/customer-Service";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function OrderItem(props: any) {
  const [status, setStatus] = useState(props.status);
  const [loading, setLoading] = useState(false);

  let buttonText: string = "Order Completed";

  switch (status) {
    case "PENDING":
      buttonText = "PENDING TO PROCESSING";
      break;
    case "PROCESSING":
      buttonText = "PROCESSING TO SHIPPED";
      break;
    case "SHIPPED": 
      buttonText = "ORDER SHIPPED";
      break;
  }

  const changeStateHandler = async () => {
    setLoading(true);
    await changeOrderStatus(props.id);
    switch (status) {
      case "PENDING":
        setStatus("PROCESSING");
        break;
      case "PROCESSING":
        setStatus("SHIPPED");
        break;
    }
    setLoading(false);
  };

  return (
    <>
      <tr id={styles.row} key={props.keyId}>
        <td>{props.orderNO}</td>
        <td>{props.total}</td>
        <td>{props.orderDate}</td>
        <td>{props.shippingDate}</td>
        <td>{props.status}</td>
        <td>
          {props.status === "SHIPPED" ? (
            <h6 className={styles.buttonText}>Order was shipped</h6>
          ) : (
            <Button
              variant="contained"
              disabled={status === "SHIPPED" || status==="DELIVERED"}
              onClick={changeStateHandler}
              sx={{
                height: "3rem",
                paddingTop: "1rem",
              }}
            >
              {loading ? (
                <FontAwesomeIcon icon={faCog} pulse />
              ) : (
                <h6>{buttonText}</h6>
              )}
            </Button>
          )}
        </td>
      </tr>
    </>
  );
}
