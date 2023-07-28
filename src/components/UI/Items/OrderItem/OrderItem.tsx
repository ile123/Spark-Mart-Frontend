import Button from '../../Button/Button';
import styles from './OrderItem.module.css'
import { changeOrderStatus } from '../../../../services/customer-Service';

export default function OrderItem(props: any) {

    let buttonText: any = <h6 className={styles.buttonText}>Order Completed</h6>;
  
    switch(props.status) {
      case "PENDING":
        buttonText = <h6 className={styles.buttonText}>PENDING TO PROCESSING</h6>;
        break;
      case "PROCESSING":
        buttonText = <h6 className={styles.buttonText}>PROCESSING TO SHIPPED</h6>;
    }

    const changeStateHandler = async() => {
      await changeOrderStatus(props.id);
    }

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
              <Button style={styles.button} onClick={changeStateHandler}>
                {buttonText}
              </Button>
            )}
          </td>
        </tr>
      </>
    );
  }
  