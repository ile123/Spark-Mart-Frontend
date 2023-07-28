import { useParams } from "react-router-dom";
import styles from "./ProductInformation.module.css";
import { useEffect, useState } from "react";
import { getProductById } from "../../../../services/product-Service";
import { Product } from "../../../../types/Product";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../UI/Button/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  checkIfAddedToWishlist,
  saveOrRemoveUserWishlist,
} from "../../../../services/customer-Service";
import { addToCart } from "../../../../auth/customerSlice";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Errors } from "../../../../types/Errors";

export default function ProductInformation() {
  const { product } = useParams();

  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [productDisplay, setProductDisplay] = useState<Product>();
  const [imagePath, setImagePath] = useState(null);
  const [specifications, setSpecifications] = useState();
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();

  const subtractAmountHandler = () => {
    if (amountToBuy === 0) {
      return;
    }
    setAmountToBuy(amountToBuy - 1);
  };

  const changeAddedToWishListHandler = () => {
    saveOrRemoveUserWishlist({
      userId: userInfo?.userId,
      productId: productDisplay?.id,
    })
      .then(() => setIsAddedToWishlist(!isAddedToWishlist))
      .catch((error: any) => console.log(error));
  };

  const addAmountHandler = () => {
    if (amountToBuy === +productDisplay?.quantity) {
      return;
    }
    setAmountToBuy(amountToBuy + 1);
  };

  const addToCartHandler = () => {
    if (amountToBuy === 0) {
      setFormErrors([
        "ERROR: You cannot have to minimally add 1 amount of a product!",
      ]);
      setShowErrorModal(true);
      return;
    }
    dispatch(
      addToCart({
        productId: productDisplay?.id,
        amount: amountToBuy,
        userId: userInfo.userId,
      })
    );
  };

  const getImageUrl = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/spark-mart/api/images/product/${productDisplay?.picture}`
      );
      const blob = await response.blob();
      const imageUrl: any = URL.createObjectURL(blob);
      setImagePath(imageUrl);
    } catch (error) {
      console.error("Error retrieving image:", error);
    }
  };

  const errorHandler = () => {
    setFormErrors([]);
    setShowErrorModal(false);
  };

  if (imagePath === null && productDisplay?.picture !== undefined) {
    getImageUrl();
  }

  useEffect(() => {
    getProductById(product)
      .then((result: any) => {
        setSpecifications(JSON.parse(result.data.specifications));
        if (JSON.stringify(userInfo) !== "{}") {
          checkIfAddedToWishlist({
            userId: userInfo.userId,
            productId: result.data.id,
          })
            .then((result: any) => setIsAddedToWishlist(result.data))
            .catch((error: any) => console.log(error));
        }
        setProductDisplay(result.data);
      })
      .catch((error: any) => console.log(error));
  }, []);

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      {productDisplay ? (
        <Card id={styles.card}>
          <div id={styles.upper_left}>
            {imagePath ? (
              <Card.Img variant="top" src={imagePath} height={320} />
            ) : (
              <FontAwesomeIcon icon={faCog} id={styles.loading} size="10x" />
            )}
          </div>
          <div id={styles.upper_right}>
            <h4 id={styles.name}>{productDisplay?.name}</h4>
            <h5 id={styles.quantity}>
              Amount left: {productDisplay?.quantity}
            </h5>
            <h4 id={styles.description}>{productDisplay?.description}</h4>

            {JSON.stringify(userInfo) !== "{}" ? (
              <div className={styles.grid}>
                <div id={styles.amountGrid}>
                  <Button style={styles.minusButton}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      size="2x"
                      onClick={subtractAmountHandler}
                    />
                  </Button>
                  <h4 id={styles.amountNumber}>{amountToBuy}</h4>
                  <Button style={styles.plusButton}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="2x"
                      onClick={addAmountHandler}
                    />
                  </Button>
                </div>
                <div>
                  <Button
                    style={styles.addToWishList}
                    onClick={changeAddedToWishListHandler}
                  >
                    {isAddedToWishlist ? (
                      <h6 className={styles.wishListButtonText}>
                        Remove From Wishlist
                      </h6>
                    ) : (
                      <h6 className={styles.wishListButtonText}>
                        Add To Wishlist
                      </h6>
                    )}
                  </Button>
                  <Button style={styles.addToCart} onClick={addToCartHandler}>
                    Add To Cart
                  </Button>
                </div>
              </div>
            ) : (
              <h5 id={styles.notLoggedIn}>
                You have to be logged in to purchase this item!
              </h5>
            )}
          </div>
          <div id={styles.bottom}>
            <div id={styles.specifications}>
              {Object.keys(specifications).map(
                (specification: any, index: number) => (
                  <div key={index}>
                    <p>{specification}</p>
                    <p>{specifications[specification]}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </Card>
      ) : (
        <FontAwesomeIcon icon={faCog} size="2xl" id={styles.pageLoad} />
      )}
    </>
  );
}
