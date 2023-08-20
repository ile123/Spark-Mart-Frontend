import styles from "./AllProductsByCategory.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProductsByCategory } from "../../../../../services/product-Service";
import { DisplayProduct } from "../../../../../types/DisplayProduct";
import { Pagination } from "react-bootstrap";
import Layout from "../../../../UI/Layout/Layout";
import DisplayProductItem from "../../../../UI/Items/DisplayProductItem/DisplayProductItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function AllProductsByCategory() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noProductsFound, setNoProductsFound] = useState(true);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  const changePageHandler = (page: number) => {
    setNoProductsFound(true);
    setCurrentPage(page - 1);
    getAllProductsByCategory(
      page - 1,
      pageSize,
      sortBy,
      sortDir,
      searchValue,
      category
    ).then((result: any) => {
      setNoProductsFound(false);
      setProducts(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

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

  useEffect(() => {
    getAllProductsByCategory(
      currentPage,
      pageSize,
      sortBy,
      sortDir,
      searchValue,
      category
    )
      .then((result: any) => {
        if (result.data.numberOfElements === 0) {
          setLoading(false);
          setNoProductsFound(true);
        } else {
          setNoProductsFound(false);
          setProducts(result.data.content);
          setTotalPages(result.data.totalPages);
          setLoading(false);
        }
      })
      .catch((error: any) => console.log(error));
  }, []);

  if (loading)
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );

  return (
    <>
      <Layout>
        {!noProductsFound ? (
          <div>
            <div className={styles.grid}>
              {products.map((category: any, index: number) => {
                return (
                  <DisplayProductItem
                    key={index}
                    keyId={index}
                    id={category.id}
                    name={category.name}
                    imageName={category.imageName}
                  />
                );
              })}
            </div>
            <Pagination size="lg" id={styles.pagination}>
              {paginationItems}
            </Pagination>
          </div>
        ) : (
          <h3 id={styles.noProducts}>No Products Found</h3>
        )}
      </Layout>
    </>
  );
}
