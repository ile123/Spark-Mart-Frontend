import styles from "./CartProductItem.module.css";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../auth/customerSlice";

export default function CartProductItem(props: any) {
  const [imagePath, setImagePath] = useState(null);

  const dispatch = useDispatch();

   const removeFromCartHandler = () => {
    dispatch(removeFromCart({ userId: props.userId, productId: props.id }));
    props.onRemoveFromCart();
   }

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
            {imagePath ? (
              <img src={imagePath} width={220} height={158} />
            ) : (
              <div>Loading image...</div>
            )}
          </div>
          <div className={styles.item}>
            <h4>{props.name}</h4>
          </div>
          <div className={styles.item}>
            <h4>{props.amount}</h4>
          </div>
          <div className={styles.item}>
            <h4>{props.price}$</h4>
          </div>
          <div className={styles.item}>
          <Button onClick={removeFromCartHandler} style={styles.deleteButton}>
            <FontAwesomeIcon icon={faTrashCan} size="xl" id={styles.delete} />
          </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
