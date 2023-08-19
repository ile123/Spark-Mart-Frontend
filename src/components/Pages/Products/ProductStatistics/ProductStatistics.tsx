import styles from "./ProductStatistics.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductStatistics } from "../../../../services/product-Service";
import { Pie } from "react-chartjs-2";
import {
  Grid,
  Container,
  Paper,
  Typography
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function ProductStatistics() {
  const { id } = useParams();

  const [productsSold, setProductSold] = useState({});
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalWishlistNumber, setTotalWishlistNumber] = useState(0);
  const [totalCustomerWishlistNumber, setTotalCustomerWishlistNumber] = useState({});
  const [statisticsLoaded, setStatisticsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductStatistics(id)
      .then((result: any) => {
        if(result.data.profit === undefined) {
          setStatisticsLoaded(false);
          setLoading(false);
          return;
        }
        setProductSold({
          labels: ["Sold", "Remaining"], 
          datasets: [
            {
              label: "Products Sold & Remaining",
              data: [result.data.totalSold, result.data.amountLeft],
              backgroundColor: [
                "red",
                "blue"
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        });
        setTotalCustomerWishlistNumber({
          labels: ["Number of Customers", "Customers who Wishlisted"], 
          datasets: [
            {
              label: "Amount of Product Wishlists",
              data: [result.data.totalNumberOfCustomers, result.data.totalWishlistNumber],
              backgroundColor: [
                "green",
                "yellow"
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        })
        setTotalProfit(result.data.profit);
        setTotalWishlistNumber(result.data.totalWishlistNumber);
        setStatisticsLoaded(true);
        setLoading(false);
      })
      .catch((error: any) => {
        setStatisticsLoaded(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />;

  return (
    <>
      {statisticsLoaded ? (
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
          <Grid item sx={{
            marginTop: "2rem"
          }}>
            <Typography variant="h3" sx={{
              marginBottom: "1rem",
              textAlign: "center"
            }}>Product Statistics</Typography>
            <Paper
              sx={{
                width: "46rem",
                height: "39rem",
                boxShadow: 2,
              }}
            >
              <Grid container>
                <Grid item>
                  <Paper sx={{
                    width: "18rem",
                    height: "18rem",
                    marginLeft: "1rem",
                    marginTop: "1rem"
                  }}>
                    <Pie
                      data={productsSold}
                      options={{ responsive: true }}
                      
                    />
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper sx={{
                    width: "18rem",
                    height: "18rem",
                    textAlign: "center",
                    marginTop: "1rem",
                    marginLeft: "8rem"
                  }}>
                    <Typography variant="h4" sx={{
                      fontSize: "3rem",
                      paddingTop: "4rem"
                    }}>Profit</Typography>
                    <Typography variant="h4" sx={{
                      fontSize: "4rem",
                      paddingTop: "1rem"
                    }}>{totalProfit}</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container>
              <Grid item>
                  <Paper sx={{
                    width: "18rem",
                    height: "18rem",
                    marginLeft: "1rem",
                    marginTop: "1rem"
                  }}>
                    <Pie
                      data={totalCustomerWishlistNumber}
                      options={{ responsive: true }}
                      
                    />
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper sx={{
                    width: "18rem",
                    height: "18rem",
                    textAlign: "center",
                    marginTop: "1rem",
                    marginLeft: "8rem"
                  }}>
                    <Typography variant="h4" sx={{
                      fontSize: "3rem",
                      paddingTop: "3rem"
                    }}>Number of Wishlists</Typography>
                    <Typography variant="h4" sx={{
                      fontSize: "4rem",
                      paddingTop: "1rem"
                    }}>{totalWishlistNumber}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      ) : (
        <h3 id={styles.failedLoading}>Product has no data to display</h3>
      )}
    </>
  );
}