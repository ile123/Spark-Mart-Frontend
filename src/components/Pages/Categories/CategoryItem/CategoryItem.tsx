import { useState } from "react";
import styles from "./CategoryItem.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../UI/Button/Button";
import { deleteCategory, getAllCategories } from "../../../../services/category-service";

export default function CategoryItem(props: any) {
  const [imagePath, setImagePath] = useState(null);

  const getImageUrl = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/spark-mart/api/images/category/${props.imageName}`
      );
      const blob = await response.blob();
      const imageUrl: any = URL.createObjectURL(blob);
      setImagePath(imageUrl);
    } catch (error) {
      console.error("Error retrieving image:", error);
    }
  };

  async function deleteUserHandler() {
    await deleteCategory(props.id);
    await getAllCategories(
      props.pageNo,
      props.pageSize,
      props.sortDir,
      props.sortBy,
      props.keyword
    ).then((result: any) =>
      props.onCategoryDeletion(result.data.content, result.data.totalPages)
    );
  }

  if(imagePath === null) {
    getImageUrl();
  }

  return (
    <>
      <tr id={styles.row} key={props.keyId}>
        <td>{props.name}</td>
        <td>{props.description}</td>
        <td>
          { imagePath ? (
            <img src={imagePath} width={90} height={60} onError={() => {}}/>
          ) : (
            <div>Loading image...</div>
          )}
        </td>
        <td>
          {/* add view all products */}
          <Link to="#" id={styles.allProductsList}>
            <FontAwesomeIcon icon={faClipboardList} size="xl" />
          </Link>
          <Link to="editCategory" state={{ categoryId: props.id }} >
            <FontAwesomeIcon icon={faEdit} size="xl" id={styles.editButton} />
          </Link>
          <Button onClick={deleteUserHandler} style={styles.deleteButton}>
            <FontAwesomeIcon icon={faTrashCan} size="xl" id={styles.delete} />
          </Button>
        </td>
      </tr>
    </>
  );
}
