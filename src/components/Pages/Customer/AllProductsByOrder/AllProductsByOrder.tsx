import { useParams } from "react-router-dom";
import styles from "./AllProductsByOrder.module.css";
import { useEffect, useState } from "react";
import {
  getAllProductsByOrder,
  getOrderById,
} from "../../../../services/customer-Service";
import OrderProductItem from "../../../UI/Items/OrderProductItem/OrderProductItem";
import { OrderProduct } from "../../../../types/OrderProduct";
import { Order } from "../../../../types/Order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Grid, Container, Paper, Typography } from "@mui/material";

export default function AllProductsByOrder() {
  const { orderId } = useParams();

  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [order, setOrder] = useState<Order>({});
  const [noProductsFound, setNoProductsFound] = useState(true);
  const [loading, setLoading] = useState(false);

  const productConfrimHandler = async (key: any) => {
    delete products[key];
    if (products.length === 0) setNoProductsFound(true);
    setLoading(false);
  };

  const statusChangeLoadingHandler = () => {
    setLoading(true);
  };

  useEffect(() => {
    getOrderById(orderId)
      .then((result: any) => setOrder(result.data))
      .catch((error: any) => console.log(error));
    getAllProductsByOrder(orderId)
      .then((result: any) => {
        if (result.data.numberOfElements === 0) {
          setNoProductsFound(true);
          setLoading(true);
        } else {
          setProducts(result.data);
          setNoProductsFound(false);
          setLoading(false);
        }
      })
      .catch(() => {
        setNoProductsFound(true);
        setLoading(true);
      });
  }, []);

  if (loading)
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );

  return (
    <>
      {!noProductsFound ? (
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
                  height: "40rem",
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
                      marginLeft: "7.5rem",
                      width: "8.5rem",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Amount</Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginLeft: "3.5rem",
                      width: "8.5rem",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        marginLeft: "2rem",
                        width: "12rem",
                        textAlign: "center",
                      }}
                    >
                      Shipping Date
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginLeft: "4.5rem",
                      width: "8.5rem",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        marginLeft: "6rem",
                        width: "12rem",
                        textAlign: "center",
                      }}
                    >
                      Status
                    </Typography>
                  </Grid>
                </Grid>
                {products.map((product: OrderProduct, index: any) => {
                  return (
                    <OrderProductItem
                      key={index}
                      productKey={index}
                      orderProductId={product.id}
                      imageName={product.picture}
                      name={product.name}
                      amount={product.amount}
                      arrivalDate={product.arrivalDate}
                      orderStatus={order.status}
                      onProductConfirm={productConfrimHandler}
                      onProductStatusLoading={statusChangeLoadingHandler}
                    />
                  );
                })}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <h3 id={styles.noProducts}>No Brands Found</h3>
      )}
    </>
  );
}
