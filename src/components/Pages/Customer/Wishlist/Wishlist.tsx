import styles from "./Wishlist.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllWishlistsByUser } from "../../../../services/customer-Service";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Layout from "../../../UI/Layout/Layout";
import DisplayProductItem from "../../../UI/Items/DisplayProductItem/DisplayProductItem";
import { DisplayProduct } from "../../../../types/DisplayProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function Wishlist() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const changePageHandler = (page: number) => {
    setLoading(true);
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
      setLoading(false);
    });
  };

  const removeFromWishlistLoadingHandler = () => {
    setLoading(true);
  }

  const removeFromWishlistHandler = (data: any, totalPages: any) => {
    setProducts(data);
    setTotalPages(totalPages);
    if(data.length === 0) {
      setNoProductsFound(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllWishlistsByUser(userInfo.userId, currentPage, pageSize, "name", "asc")
      .then((result: any) => {
        if (result.data.numberOfElements === 0) {
          setNoProductsFound(true);
          setLoading(false);
        } else {
          setNoProductsFound(false);
          setProducts(result.data.content);
          setTotalPages(result.data.totalPages);
          setLoading(false);
        }
      })
      .catch(() => {
        setNoProductsFound(true);
      });
  }, []);

  if (loading)
    return (
      <FontAwesomeIcon icon={faCog} size="2xl" pulse id={styles.loading} />
    );

  return (
    <>
      <Layout>
        {!noProductsFound ? (
          <div>
            <div id={styles.grid}>
              {products.map((product: DisplayProduct, index: number) => {
                return (
                  <DisplayProductItem
                    key={index}
                    id={product.id}
                    userId={userInfo.userId}
                    name={product.name}
                    imageName={product.imageName}
                    isWishlistSite={true}
                    onRemoveFromWishlist={removeFromWishlistHandler}
                    onRemoveFromWishlistLoading={removeFromWishlistLoadingHandler}
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
          <h3 id={styles.noProducts}>No Products Wishlisted</h3>
        )}
      </Layout>
    </>
  );
}
