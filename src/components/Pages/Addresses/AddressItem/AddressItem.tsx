import styles from './AddressItem.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function AddressItem(props: any) {
      return (
        <>
          <tr id={styles.row}>
            <td>{props.streetAddress}</td>
            <td>{props.city}</td>
            <td>{props.postalCode}</td>
            <td>{props.province}</td>
            <td>{props.country}</td>
            <td>
              <Link to={'getAllUsersByAddress/' + props.id}>
                <FontAwesomeIcon icon={faUser} size="xl" />
              </Link>
            </td>
          </tr>
        </>
      );
}