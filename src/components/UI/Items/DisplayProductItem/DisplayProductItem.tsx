import { Card } from "react-bootstrap";
import styles from "./DisplayProductItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  if (imagePath === null) {
    getImageUrl();
  }
  return (
    <>
      <Card id={styles.card}>
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
      </Card>
    </>
  );
}
