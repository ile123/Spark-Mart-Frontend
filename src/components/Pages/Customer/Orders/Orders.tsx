import { useSelector } from "react-redux";
import styles from "./Orders.module.css";
import { useEffect, useState } from "react";
import { Order } from "../../../../types/Order";
import { getAllOrdersByUser } from "../../../../services/customer-Service";
import { useNavigate } from "react-router-dom";
import CustomerOrderItem from "../../../UI/Items/CustomerOrderItem/CustomerOrderItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Grid, Container, Paper, Typography } from "@mui/material";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10000);
  const [orders, setOrders] = useState<Order[]>([]);
  const [noOrdersFound, setNoOrdersFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrdersByUser(userInfo.userId, currentPage, pageSize, "orderNO", "asc")
      .then((result: any) => {
        if (result.data.numberOfElements === 0) {
          setNoOrdersFound(true);
          setLoading(false);
        } else {
          setNoOrdersFound(false);
          setOrders(result.data.content);
          setLoading(false);
        }
      })
      .catch(() => {
        setNoOrdersFound(true);
      });
  }, []);

  if (JSON.stringify(userInfo) === "{}") navigate("/");

  if (loading)
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );

  return (
    <>
      {!noOrdersFound ? (
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
                Orders
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
                        marginLeft: "3rem",
                        width: "8.5rem",
                      }}
                    >
                      Order Number
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginLeft: "5rem",
                      width: "8.5rem",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Order Date</Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginLeft: "4.5rem",
                      width: "8.5rem",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Shipping Date</Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginLeft: "2rem",
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
                      Total
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
                        marginLeft: "5%",
                        width: "12rem",
                        textAlign: "center",
                      }}
                    >
                      Status
                    </Typography>
                  </Grid>
                </Grid>
                {orders.map((order: Order, index: number) => {
                  return (
                    <CustomerOrderItem
                      key={index}
                      id={order.id}
                      orderNO={order.orderNO}
                      orderDate={order.orderDate}
                      shippingDate={order.shippingDate}
                      total={order.total}
                      status={order.status}
                    />
                  );
                })}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <h3 id={styles.noOrders}>No Orders Found</h3>
      )}
    </>
  );
}
