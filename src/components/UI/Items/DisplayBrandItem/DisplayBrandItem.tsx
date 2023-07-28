import { Card } from "react-bootstrap";
import styles from "./DisplayBrandItem.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function DisplayBrandItem(props: any) {
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

  if (imagePath === null) {
    getImageUrl();
  }

  return (
    <>
      <Card id={styles.card} key={props.keyId}>
        {imagePath ? (
          <Card.Img variant="top" src={imagePath} height={190} id={styles.image}/>
        ) : (
          <FontAwesomeIcon icon={faCog} />
        )}
        <Card.Footer id={styles.footer}>
            <h3>
              <Link to={"allProducts" + "/" + props.name} id={styles.button}>{props.name}</Link>
            </h3>
          </Card.Footer>
      </Card>
    </>
  );
}
