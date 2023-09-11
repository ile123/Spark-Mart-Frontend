import { Card } from "react-bootstrap";
import styles from "./DisplayProductItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import { getAllWishlistsByUser, saveOrRemoveUserWishlist } from "../../../../services/customer-Service";

export default function DisplayProductItem(props: any) {
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

  const removeFromWishlistHandler = () => {
    props.onRemoveFromWishlistLoading();
    saveOrRemoveUserWishlist({
      userId: props.userId,
      productId: props.id
    })
      .then(() => {
        getAllWishlistsByUser(props.userId, 0, 9, "name", "asc")
          .then((result: any) => {
            props.onRemoveFromWishlist(result.data.content, result.totalPages);
          })
      })
  }

  if (imagePath === null) {
    getImageUrl();
  }
  return (
    <>
      <Card id={ props.isWishlistSite === undefined ? styles.card : styles.wishlistCard}>
        {imagePath ? (
            <Card.Img variant="top" src={imagePath} height={250} />
        ) : (
          <FontAwesomeIcon icon={faCog} />
        )}
        <Card.Title>
          <h5 id={styles.title}>
            <Link to={"/product/" + props.id} id={styles.button}>
              {props.name}
            </Link>
          </h5>
        </Card.Title>
        {props.isWishlistSite !== undefined && (
          <Card.Footer id={styles.footer}>
            <Button onClick={removeFromWishlistHandler} style={styles.removeButton}>
              <FontAwesomeIcon
                icon={faTrashCan}
                size="xl"
                id={styles.removeIcon}
              />
            </Button>
          </Card.Footer>
        )}
      </Card>
    </>
  );
}

/**
 * {props.isWishlistSite !== undefined &&
            <FontAwesomeIcon icon={faTrashCan} size="sm" id={styles.removeIcon} />
          }
 */
