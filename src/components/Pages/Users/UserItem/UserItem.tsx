import { Link } from "react-router-dom";
import styles from "./UserItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteUser, getAllUsers } from "../../../../services/user-Service";
import Button from "../../../UI/Button/Button";

export default function UserItem(props: any) {
  async function deleteUserHandler() {
    await deleteUser(props.id);
    await getAllUsers(props.pageNo, props.pageSize, props.sortDir, props.sortBy, props.userType, props.keyword).then((result: any) =>
      props.onUserDeletion(result.data.content, result.data.totalPages)
    );
  }

  return (
    <>
      <tr id={styles.row}>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.email}</td>
        <td>{props.phoneNumber}</td>
        <td>
          <Link to="viewUser" state={{ userId: props.id }} >
            <FontAwesomeIcon icon={faEdit} size="xl" />
          </Link>
          <Button onClick={deleteUserHandler} style={styles.deleteButton}>
            <FontAwesomeIcon icon={faTrashCan} size="xl" id={styles.delete} />
          </Button>
        </td>
      </tr>
    </>
  );
}
