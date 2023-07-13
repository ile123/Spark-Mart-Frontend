import styles from './UserOrders.module.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from '../../../UI/Layout/Layout';
import Button from '../../../UI/Button/Button';
import Forbidden from '../../Errors/Forbidden/Forbidden';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Order } from '../../../../types/Order';
import { useSelector } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { getAllOrdersByUser } from '../../../../services/customer-Service';
import { useLocation } from 'react-router-dom';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import OrderItem from '../../../UI/Items/OrderItem/OrderItem';

export default function UserOrders() {

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("orderNO");
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noOrdersFound, setNoOrdersFound] = useState(false);

  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const {
    state: { userId },
  } = useLocation();

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage + 1}
        onClick={() => changePageHandler(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const orderDeletionHandler = (data: any, totalPages: number) => {
    setOrders(data);
    setTotalPages(totalPages);
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page - 1);
    getAllOrdersByUser(userId, page - 1, pageSize, sortBy, sortDir).then(
      (result: any) => {
        setOrders(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    );
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setSortBy(sortByField);
    setCurrentPage(nextPage);
    getAllOrdersByUser(
      userId,
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc"
    ).then((result: any) => {
      setOrders(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

  useEffect(() => {
    getAllOrdersByUser(userId, currentPage, pageSize, "orderNO", "asc")
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

  if (userInfo.role !== "ADMINISTRATOR") {
    return <Forbidden />;
  } else {
    return (
      <>
        <Layout>
          {!noOrdersFound ? (
            <div>
              <table id={styles.table}>
                <thead id={styles.tableHead}>
                  <tr>
                    <th className={styles.tableRow}>
                      <div className={styles.grid}>
                        <h6 id={styles.orderNO }>
                          Order Number
                          <Button
                            style={styles.buttonSort}
                            onClick={() =>
                              changeSortingHander(currentPage, "orderNO")
                            }
                          >
                            <FontAwesomeIcon icon={faSort} />
                          </Button>
                        </h6>
                      </div>
                    </th>
                    <th className={styles.tableRow}>
                      <div className={styles.grid}>
                        <h6 className={styles.fieldName}>
                          Total
                          <Button
                            style={styles.buttonSort}
                            onClick={() =>
                              changeSortingHander(currentPage, "total")
                            }
                          >
                            <FontAwesomeIcon icon={faSort} />
                          </Button>
                        </h6>
                      </div>
                    </th>
                    <th className={styles.tableRow}>
                      <div className={styles.grid}>
                        <h6 className={styles.fieldName}>
                          Order Date
                          <Button
                            style={styles.buttonSort}
                            onClick={() =>
                              changeSortingHander(currentPage, "orderDate")
                            }
                          >
                            <FontAwesomeIcon icon={faSort} />
                          </Button>
                        </h6>
                      </div>
                    </th>
                    <th className={styles.tableRow}>
                      <div className={styles.grid}>
                        <h6 className={styles.fieldName}>Shipping Date</h6>
                        <Button
                          style={styles.buttonSort}
                          onClick={() =>
                            changeSortingHander(currentPage, "shippingDate")
                          }
                        >
                          <FontAwesomeIcon icon={faSort} />
                        </Button>
                      </div>
                    </th>
                    <th className={styles.tableRow}>
                      <div className={styles.grid}>
                        <h6 id={styles.status}>Status</h6>
                        <Button
                          style={styles.buttonSort}
                          onClick={() =>
                            changeSortingHander(currentPage, "status")
                          }
                        >
                          <FontAwesomeIcon icon={faSort} />
                        </Button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: Order, index: number) => {
                      return (
                        <OrderItem
                          key={index}
                          orderId={order.id}
                          orderNO={order.orderNO}
                          total={order.total}
                          orderDate={order.orderDate}
                          shippingDate={order.shippingDate}
                          status={order.status}
                        />
                      );
                  })}
                </tbody>
              </table>
              )
              <Pagination size="lg" id={styles.pagination}>
                {paginationItems}
              </Pagination>
            </div>
          ) : (
            <h3 id={styles.noUsers}>No users were found!</h3>
          )}
        </Layout>
      </>
    );
  }
}