import { Card } from "react-bootstrap";
import styles from "./ProductCartItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";

export default function ProductCartItem(props: any) {
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

  if (imagePath === null) {
    getImageUrl();
  }

  return (
    <>
      <Card id={styles.card}>
        <div id={styles.grid}>
          <div className={styles.item}>
            <div>
            {imagePath ? (
              <Card.Img
                variant="top"
                src={imagePath}
                height={20}
                id={styles.image}
              />
            ) : (
              <FontAwesomeIcon icon={faCog} />
            )}
            </div>
            <div><h3>{props.name}</h3></div>
          </div>
          <div className={styles.item}>
            <h3>{props.price}</h3>
          </div>
          <div className={styles.item}>
            <Button>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
