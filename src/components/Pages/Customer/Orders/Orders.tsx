import { useSelector } from "react-redux";
import styles from "./Orders.module.css";
import { useEffect, useState } from "react";
import { Order } from "../../../../types/Order";
import { getAllOrdersByUser } from "../../../../services/customer-Service";
import { useNavigate } from "react-router-dom";
import CustomerOrderItem from "../../../UI/Items/CustomerOrderItem/CustomerOrderItem";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("orderNO");
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noOrdersFound, setNoOrdersFound] = useState(false);

  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrdersByUser(userInfo.userId, currentPage, pageSize, "orderNO", "asc")
      .then((result: any) => {
        setNoOrdersFound(false);
        setOrders(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoOrdersFound(true);
      });
  }, []);

  if (JSON.stringify(userInfo) === "{}") navigate("/");

  return (
    <>
      <div id={styles.page}>
        <h1>Orders</h1>
        {!noOrdersFound ? (
          <div>
            <div id={styles.grid}>
                <div className={styles.item}>
                    <h4>Order Number</h4>
                </div>
                <div className={styles.item}>
                    <h4>Order Date</h4>
                </div>
                <div className={styles.item}>
                    <h4>Shipping Date</h4>
                </div>
                <div className={styles.item}>
                    <h4>Total</h4>
                </div>
                <div className={styles.item}>
                    <h4>Status</h4>
                </div>
                <div className={styles.item}>
                    <h4>Products</h4>
                </div>
            </div>
            <div>
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
            </div>
          </div>
        ) : (
          <h3>No Order found!</h3>
        )}
      </div>
    </>
  );
}
