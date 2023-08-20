import { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductById } from "../../../../services/product-Service";
import { Product } from "../../../../types/Product";
import ErrorModal from "../../../UI/ErrorModal/ErrorModal";
import { Errors } from "../../../../types/Errors";
import { useForm } from "react-hook-form";
import { purchaseProducts } from "../../../../services/customer-Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import {
  Grid,
  Container,
  Paper,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../../../auth/customerSlice";

export default function ShoppingCart() {
  const { cart } = useSelector((state: any) => state.customer);
  const { userInfo } = useSelector((state: any) => state.auth);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [noProductsFound, setNoProductsFound] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function formSubmit(data: any) {
    purchaseProducts({ userId: userInfo.userId, products: cart });
    Object.keys(cart).map((key: any, item: number) => {
      dispatch(removeFromCart({ userId: userInfo.userId, productId: key }));
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const removeFromCartHandler = async () => {
    let total = 0;
    if (Object.keys(cart).length === 0) {
      setNoProductsFound(true);
      setLoading(false);
      return;
    } else {
      const idArray: any[] = [];
      Object.keys(cart).map((key: any) => {
        idArray.push(key);
      });
      getData(idArray)
        .then((result: any) => {
          setProductsInCart(result);
          result.forEach((product: Product) => {
            total += product.price;
          });
          setTotalPrice(total);
          setNoProductsFound(false);
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
    }
  };

  const getData = async (idArray: any) => {
    try {
      const productPromises = idArray.map(async (productId: any) => {
        const response = await getProductById(productId);
        return response.data;
      });
      const products = await Promise.all(productPromises);
      return products;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleError = (errors: any) => {
    const errorsArray: Errors = [];
    {
      Object.values(errors).map((e: any) => {
        errorsArray.push(e.message);
      });
    }
    setFormErrors(errorsArray);
    setShowErrorModal(true);
  };

  const removeProductFromCartLoadingHandler = () => {
    setLoading(true);
  };

  const errorHandler = () => {
    setFormErrors([]);
    setShowErrorModal(false);
  };

  useEffect(() => {
    let total = 0;
    if (Object.keys(cart).length === 0) {
      setNoProductsFound(true);
      setLoading(false);
      return;
    } else {
      const idArray: any[] = [];
      Object.keys(cart).map((key: any) => {
        idArray.push(key);
      });
      getData(idArray)
        .then((result: any) => {
          setProductsInCart(result);
          result.forEach((product: Product) => {
            total += product.price;
          });
          setTotalPrice(total);
          if (idArray.length === 0) {
            setNoProductsFound(true);
          } else {
            setNoProductsFound(false);
          }
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
    }
  }, []);

  if (loading)
    return (
      <FontAwesomeIcon icon={faCog} size="2xl" pulse id={styles.loading} />
    );

  if (noProductsFound)
    return <h3 id={styles.noProductsInCart}>The cart is empty!</h3>;

  return (
    <>
      {showErrorModal && (
        <ErrorModal errors={formErrors} onConfirm={errorHandler} />
      )}
      <Container
        sx={{
          flexGrow: 1,
          padding: 3,
        }}
      >
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            item
            sx={{
              marginTop: "2rem",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                marginBottom: "1rem",
              }}
            >
              Products
            </Typography>
            <Paper
              sx={{
                width: "80.2rem",
                height: "30rem",
                boxShadow: 2,
                overflowY: "scroll",
                left: 125,
                position: "absolute",
              }}
            >
              <Grid
                container
                sx={{
                  marginTop: "2%",
                  width: "78rem",
                }}
              >
                <Grid item>
                  <Typography
                    variant="h6"
                    sx={{
                      marginLeft: "20rem",
                      width: "8.5rem",
                    }}
                  >
                    Product Name
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    marginLeft: "7.2rem",
                    width: "8.5rem",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">Amount</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    marginLeft: "7.2rem",
                    width: "8.5rem",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">Price</Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    marginLeft: "5rem",
                    width: "8.5rem",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      marginLeft: "5%",
                      width: "12rem",
                      textAlign: "center",
                    }}
                  >
                    Remove From Cart
                  </Typography>
                </Grid>
              </Grid>
              {productsInCart.map((item: Product, index: number) => {
                if (cart[item.id] !== undefined) {
                  return (
                    <CartProductItem
                      key={index}
                      id={item.id}
                      userId={userInfo.userId}
                      name={item.name}
                      amount={cart[item.id]}
                      price={item.price}
                      imageName={item.picture}
                      onRemoveFromCartLoading={
                        removeProductFromCartLoadingHandler
                      }
                      onRemoveFromCart={removeFromCartHandler}
                    />
                  );
                }
                return null;
              })}
            </Paper>
          </Grid>
          <Grid container>
            <Grid
              item
              sx={{
                marginTop: "50%",
                left: 5,
              }}
            >
              <Typography variant="h3">Total: {totalPrice}$</Typography>
            </Grid>
            <Box
              sx={{
                marginLeft: "8rem",
              }}
              component="form"
              noValidate
              onSubmit={handleSubmit(formSubmit, handleError)}
            >
              <Grid item>
                <Paper
                  sx={{
                    marginTop: "33rem",
                    marginLeft: "15%",
                    width: "38rem",
                    height: "13rem",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        label="Card Number"
                        autoComplete="off"
                        {...register("cardNumber", {
                          required: "Card Number is required!",
                          pattern: {
                            value: /^[0-9]{9,14}$/,
                            message: "Invalid Card Number!",
                          },
                        })}
                        sx={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        label="CVC"
                        autoComplete="off"
                        {...register("cvc", {
                          required: "CVC is required!",
                          pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: "Invalid CVC!",
                          },
                        })}
                        sx={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        label="Month"
                        autoComplete="off"
                        {...register("month", {
                          required: "Month is required!",
                          pattern: {
                            value: /^(0?[1-9]|1[0-2])$/,
                            message: "Invalid Month!",
                          },
                        })}
                        sx={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        label="Year"
                        autoComplete="off"
                        {...register("year", {
                          required: "Year is required!",
                          pattern: {
                            value: /^(20\d{2}|2[2-9]\d{1})$/,
                            message: "Invalid Year!",
                          },
                        })}
                        sx={{
                          marginLeft: "2rem",
                          marginTop: "1rem",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    marginLeft: "20rem",
                  }}
                >
                  Buy Products
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
