import { Link } from "react-router-dom";
import styles from "./UserItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashCan,
  faHeart,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { deleteUser, getAllUsers } from "../../../../services/user-Service";
import Button from "../../Button/Button";

export default function UserItem(props: any) {
  async function deleteUserHandler() {
    props.onUserDeletionLoading();
    await deleteUser(props.id)
      .then(() => {
        getAllUsers(0, 10, "firstName", "asc", props.userType, "")
          .then((result: any) =>
            props.onUserDeletion(result.data.content, result.data.totalPages)
          )
          .catch((error: any) => console.log(error));
      })
      .catch((error: any) => console.log(error));
  }

  return (
    <>
      <tr id={styles.row} key={props.keyId}>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.email}</td>
        <td>{props.phoneNumber}</td>
        <td>
          <Link to="viewUser" state={{ userId: props.id }}>
            <FontAwesomeIcon icon={faEdit} size="xl" />
          </Link>
          <Button onClick={deleteUserHandler} style={styles.deleteButton}>
            <FontAwesomeIcon icon={faTrashCan} size="xl" id={styles.delete} />
          </Button>
          {props.userType === "customer" && (
            <div id={styles.customerRow}>
              <Link
                to="viewUserOrders"
                state={{ userId: props.id }}
                id={styles.orders}
              >
                <FontAwesomeIcon icon={faTableList} size="xl" />
              </Link>
              <Link
                to="viewUserWishlists"
                state={{ userId: props.id }}
                id={styles.wishlists}
              >
                <FontAwesomeIcon icon={faHeart} size="xl" />
              </Link>
            </div>
          )}
        </td>
      </tr>
    </>
  );
}
