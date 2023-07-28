import { Card } from "react-bootstrap";
import styles from "./ProductStatistics.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductStatistics } from "../../../../services/product-Service";
import { Pie } from "react-chartjs-2";

export default function ProductStatistics() {
  const { id } = useParams();

  const [productsSold, setProductSold] = useState({});
  const [totalProfit, setTotalProfit] = useState(0);
  const [statisticsLoaded, setStatisticsLoaded] = useState(false);

  useEffect(() => {
    getProductStatistics(id)
      .then((result: any) => {
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
        setTotalProfit(result.data.profit);
        setStatisticsLoaded(true);
      })
      .catch((error: any) => {
        console.log(error);
        setStatisticsLoaded(true);
      });
  }, []);

  return (
    <>
      {statisticsLoaded ? (
        <div>
          <div className={styles.grid}>
            <div className={styles.item}>
              <Card className={styles.card}>
                <Pie
                  data={productsSold}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </Card>
            </div>
            <div className={styles.item}>
              <Card className={styles.card}>
                <div id={styles.profit}>
                  <h4>Total Profit</h4>
                  <h1>{totalProfit}</h1>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
