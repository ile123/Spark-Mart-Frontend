import styles from "./Wishlist.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllWishlistsByUser } from "../../../../services/customer-Service";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Layout from "../../../UI/Layout/Layout";
import DisplayProductItem from "../../../UI/Items/DisplayProductItem/DisplayProductItem";
import { DisplayProduct } from "../../../../types/DisplayProduct";

export default function Wishlist() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

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
    setProducts(data);
    setTotalPages(totalPages);
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page - 1);
    getAllWishlistsByUser(
      userInfo.userId,
      page - 1,
      pageSize,
      sortBy,
      sortDir
    ).then((result: any) => {
      setProducts(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

  useEffect(() => {
    getAllWishlistsByUser(userInfo.userId, currentPage, pageSize, "name", "asc")
      .then((result: any) => {
        setNoProductsFound(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoProductsFound(true);
      });
  }, []);

  return (
    <>
      <Layout>
        {noProductsFound === false && products.length !== 0 ? (
          <div>
            <div id={styles.grid}>
              {products.map((product: DisplayProduct, index: number) => {
                return (
                  <DisplayProductItem
                    key={index}
                    id={product.id}
                    name={product.name}
                    imageName={product.imageName}
                  />
                );
              })}
            </div>
            <div>
              <Pagination size="lg" id={styles.pagination}>
                {paginationItems}
              </Pagination>
            </div>
          </div>
        ) : (
          <h3 id={styles.noProducts}>Loading...</h3>
        )}
      </Layout>
    </>
  );
}
