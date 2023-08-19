import { getAllProducts, deleteProduct } from '../../../../services/product-Service';
import styles from './ProductItem.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Button from '../../Button/Button';

export default function ProductItem(props: any) {
    const [imagePath, setImagePath] = useState(null);

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

  async function deleteProductHandler() {
    props.onProductDeletionLoading();
    await deleteProduct(props.id).then(() => {
      getAllProducts(0, 10, "name", "asc", "")
        .then((result: any) => props.onProductDeletion(result.data.content, result.data.totalPages))
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
            <img src={imagePath} width={90} height={60} />
          ) : (
            <div>Loading image...</div>
          )}
        </td>
        { (props.isWishlistAdmin !== undefined && props.isWishlistAdmin !== true) &&
        <td>
          <Link to={"productStatictics/" + props.id}>
            <FontAwesomeIcon icon={faCircleInfo} size="xl"/>
          </Link>
          <Link to={"editProduct/" + props.id} >
            <FontAwesomeIcon icon={faEdit} size="xl" id={styles.editButton} />
          </Link>
          <Button onClick={deleteProductHandler} style={styles.deleteButton}>
            <FontAwesomeIcon icon={faTrashCan} size="xl" id={styles.delete} />
          </Button>
        </td>
        }
      </tr>
    </>
  );
}