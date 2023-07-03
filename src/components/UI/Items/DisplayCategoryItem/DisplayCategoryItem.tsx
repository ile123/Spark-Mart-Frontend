import { Card } from "react-bootstrap";
import styles from "./DisplayCategoryItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function DisplayCategoryItem(props: any) {
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

  if (imagePath === null) {
    getImageUrl();
  }
  return(
  <>
    <Card id={styles.card}>
    {imagePath ? (
          <Card.Img variant="top" src={imagePath} height={250} />
        ) : (
          <FontAwesomeIcon icon={faCog} />
        )}
        <Card.Title id={styles.title}>
            <h3>
              <Link to={"/categories/allProducts" + "/" + props.name} id={styles.button}>{props.name}</Link>
            </h3>
        </Card.Title>
    </Card>
  </>
  );
}
