import styles from './OrderItem.module.css'

export default function UserItem(props: any) {
  
    return (
      <>
        <tr id={styles.row} key={props.keyId}>
          <td>{props.orderNO}</td>
          <td>{props.total}</td>
          <td>{props.orderDate}</td>
          <td>{props.shippingDate}</td>
          <td>{props.status}</td>
        </tr>
      </>
    );
  }
  