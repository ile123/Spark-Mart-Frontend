import { useParams } from "react-router-dom";
import styles from "./AllProductsByOrder.module.css";
import { useEffect, useState } from "react";
import {
  getAllProductsByOrder,
  getOrderById,
} from "../../../../services/customer-Service";
import { Product } from "../../../../types/Product";
import OrderProductItem from "../../../UI/Items/OrderProductItem/OrderProductItem";
import { OrderProduct } from "../../../../types/OrderProduct";
import { Order } from "../../../../types/Order";

export default function AllProductsByOrder() {
  const { orderId } = useParams();

  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [order, setOrders] = useState<Order>({});
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    getOrderById(orderId)
      .then((result: any) => setOrders(result.data))
      .catch((error: any) => console.log(error));
    getAllProductsByOrder(orderId)
      .then((result: any) => {
        setProducts(result.data);
        setProductsLoaded(true);
      })
      .catch(() => setProductsLoaded(false));
  }, []);

  return (
    <>
      {productsLoaded ? (
        <div id={styles.page}>
          <h1>Products</h1>
          <div id={styles.grid}>
            <div className={styles.item}></div>
            <div className={styles.item}>
              <h4>Name</h4>
            </div>
            <div className={styles.item}>
              <h4>Amount</h4>
            </div>
            <div className={styles.item}>
              <h4>Arrival Date</h4>
            </div>
            <div className={styles.item}>
              <h4>Has Arrived?</h4>
            </div>
          </div>
          {products.map((product: OrderProduct, index: any) => {
            return (
              <OrderProductItem
                key={index}
                orderProductId={product.id}
                imageName={product.picture}
                name={product.name}
                amount={product.amount}
                arrivalDate={product.arrivalDate}
                orderStatus={order.status}
              />
            );
          })}
        </div>
      ) : (
        <h3>LOADING...</h3>
      )}
    </>
  );
}
