import { useState } from "react";
import styles from "./BrandItem.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import { deleteBrand } from "../../../../services/brand-Service";
import { getAllBrands } from "../../../../services/brand-Service";

export default function BrandItem(props: any) {
  const [imagePath, setImagePath] = useState(null);

  const getImageUrl = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/spark-mart/api/images/brand/${props.imageName}`
      );
      const blob = await response.blob();
      const imageUrl: any = URL.createObjectURL(blob);
      setImagePath(imageUrl);
    } catch (error) {
      console.error("Error retrieving image:", error);
    }
  };

  async function deleteBrandHandler() {
    props.onBrandDeletionLoading();
    await deleteBrand(props.id).then(() => {
      getAllBrands(0, 10, "name", "asc", "")
        .then((result: any) => props.onBrandDeletion(result.data.content, result.data.totalPages))
        .catch((error: any) => console.log(error));
    })
      .catch((error: any) => console.log(error));
  }

  if(imagePath === null) {
    getImageUrl();
  }

  return (
    <>
      <tr id={styles.row} key={props.keyId}>
        <td>{props.name}</td>
        <td>
          { imagePath ? (
            <img src={imagePath} width={90} height={60} onError={() => {}}/>
          ) : (
            <div>Loading image...</div>
          )}
        </td>
        <td>
          <Link to={"allProducts/" + props.name} id={styles.allProductsList}>
            <FontAwesomeIcon icon={faClipboardList} size="xl" />
          </Link>
          <Link to="editBrand" state={{ brandId: props.id }} >
            <FontAwesomeIcon icon={faEdit} size="xl" id={styles.editButton} />
          </Link>
          <Button onClick={deleteBrandHandler} style={styles.deleteButton}>
            <FontAwesomeIcon icon={faTrashCan} size="xl" id={styles.delete} />
          </Button>
        </td>
      </tr>
    </>
  );
}
