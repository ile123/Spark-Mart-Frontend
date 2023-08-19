import { useParams } from "react-router-dom";
import styles from "./ProductInformation.module.css";
import { useEffect, useState } from "react";
import { getProductById } from "../../../../services/product-Service";
import { Product } from "../../../../types/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  checkIfAddedToWishlist,
  saveOrRemoveUserWishlist,
} from "../../../../services/customer-Service";
import { addToCart } from "../../../../auth/customerSlice";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Errors } from "../../../../types/Errors";
import {
  Grid,
  Container,
  Paper,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ProductInformation() {
  const { product } = useParams();

  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [productDisplay, setProductDisplay] = useState<Product>();
  const [imagePath, setImagePath] = useState(null);
  const [specifications, setSpecifications] = useState({});
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [addedToCart, setAddedToCart] = useState("false");

  const addedToCartJSON = {
    true: "3rem",
    false: "4rem"
  }

  const subtractAmountHandler = () => {
    if (amountToBuy === 0) {
      return;
    }
    setAddedToCart("false");
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
    setAddedToCart("false");
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
    setAddedToCart("true");
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
        <Container
          sx={{
            flexGrow: 1,
            padding: 3,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "5%",
            }}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Paper
              sx={{
                width: "70rem",
                height: "40rem",
                boxShadow: 3
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  {imagePath ? (
                    <Box
                      component="img"
                      sx={{
                        height: 300,
                        width: 500,
                        marginTop: "1rem",
                        marginLeft: "1rem",
                        boxShadow: 1,
                      }}
                      alt={productDisplay.name}
                      src={imagePath}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCog}
                      id={styles.loading}
                      size="10x"
                    />
                  )}
                  <Divider
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "1px solid black",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {productDisplay.shortDescription}
                  </Typography>
                  <Divider
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "1px solid black",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Price: {productDisplay.price} €
                  </Typography>
                  <Divider
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "1px solid black",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {productDisplay.quantity !== 0 ? (
                      <h6>Quantity Left: {productDisplay.quantity}</h6>
                    ) : (
                      <h6>Out of stock</h6>
                    )}
                  </Typography>
                  {JSON.stringify(userInfo) !== "{}" ? (
                    <Grid container sx={{
                      alignItems: "center",
                      position: "absolute",
                      bottom: 0,
                      marginBottom: "5.5%",
                      marginLeft: "2%",
                      width: "35rem",
                      height: "3rem"
                    }}>
                      <Grid item sx={{
                        marginLeft: addedToCartJSON[addedToCart]
                      }}>
                        <Button sx={{
                          fontSize: "15px"
                        }} onClick={addToCartHandler}>{addedToCart === "true" ? <Typography variant="h6" sx={{
                          fontSize: "15px"
                        }}>Added to cart</Typography> : <Typography variant="h6" sx={{
                          fontSize: "15px"
                        }}>Add to cart</Typography>}</Button>
                      </Grid>
                      <Grid item>
                        <Grid container>
                          <Grid item>
                            <IconButton sx={{
                              marginRight: "1rem"
                            }} onClick={subtractAmountHandler}>
                              <RemoveIcon />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <Typography variant="h4">{amountToBuy}</Typography>
                          </Grid>
                          <Grid item>
                          <IconButton sx={{
                            marginLeft: "1rem"
                          }} onClick={addAmountHandler}>
                              <AddIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Button sx={{
                          fontSize: "10px"
                        }} onClick={changeAddedToWishListHandler}>{isAddedToWishlist ? <Typography variant="h6" sx={{
                          fontSize: "15px"
                        }}>Remove from wishlist</Typography> : <Typography variant="h6" sx={{
                          fontSize: "15px"
                        }}>Add to wishlist</Typography>}</Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        position: "absolute",
                        bottom: 0,
                        marginBottom: "5%",
                        marginLeft: "2%",
                      }}
                    >
                      Log in required in order to add to cart/wishlist this
                      product
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: "center",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {productDisplay.name}
                  </Typography>
                  <Divider
                    variant="fullWidth"
                    sx={{
                      border: "1px solid black",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "1rem",
                    }}
                  >
                    {productDisplay.description}
                  </Typography>
                  <Paper
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      marginBottom: "5%",
                      marginLeft: "2%",
                      width: "31.5rem",
                      height: "18.5rem",
                      boxShadow: 2,
                      overflowY: "scroll",
                    }}
                  >
                    <List
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {Object.keys(specifications).map(
                        (key: any, index: any) => (
                          <ListItem
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                            key={index}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                marginTop: "1rem",
                              }}
                            >
                              {key}:
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                marginTop: "1rem",
                                marginLeft: "1rem",
                              }}
                            >
                              {specifications[key]}
                            </Typography>
                          </ListItem>
                          
                        )
                      )}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      ) : (
        <FontAwesomeIcon icon={faCog} size="2xl" id={styles.loading} />
      )}
    </>
  );
}
