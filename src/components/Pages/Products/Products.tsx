import Layout from "../../UI/Layout/Layout";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCirclePlus, faL } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../UI/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../../services/product-Service";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forbidden from "../Errors/Forbidden/Forbidden";
import { DisplayProduct } from "../../../types/DisplayProduct";
import DisplayProductItem from "../../UI/Items/ProductItem/ProductItem";

export default function Brands() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noProductsFound, setNoProductsFound] = useState(true);

  const searchHandler = (searchString: string) => {
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllProducts(0, pageSize, sortBy, sortDir, keyword)
      .then((result: any) => {
        setNoProductsFound(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoProductsFound(true);
      });
  };

  const changePageHandler = (page: number) => {
    setNoProductsFound(true);
    setCurrentPage(page - 1);
    getAllProducts(page - 1, pageSize, sortBy, sortDir, searchValue).then(
      (result: any) => {
        setNoProductsFound(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    );
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
    setNoProductsFound(true);
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setSortBy(sortByField);
    setCurrentPage(nextPage);
    getAllProducts(
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc",
      searchValue
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
    getAllProducts(currentPage, pageSize, "name", "asc", "")
      .then((result: any) => {
        setNoProductsFound(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoProductsFound(true);
      });
  }, []);

  if (JSON.stringify(userInfo) === "{}") navigate("/");
  if (userInfo.role !== "ADMINISTRATOR") {
    return <Forbidden />;
  } else {
    return (
      <>
        <Layout>
        <div>
            <div className={styles.optionsGrid}>
              <div>
                <Link to="newProduct">
                  <Button style={styles.circleButton}>
                    <FontAwesomeIcon icon={faCirclePlus} size={"2xl"} />
                  </Button>
                </Link>
              </div>
              <div id={styles.searchBar}>
                <SearchBar onSubmit={searchHandler} />
              </div>
            </div>
          </div>
          {(noProductsFound === false && products.length !== 0)? (
            <div>
              <table id={styles.table}>
                <thead id={styles.tableHead}>
                  <tr>
                    <th className={styles.tableRow}>
                      <div className={styles.grid}>
                        <h6 className={styles.fieldName}>Name
                        <Button
                          style={styles.buttonSort}
                          onClick={() =>
                            changeSortingHander(currentPage, "name")
                          }
                        >
                          <FontAwesomeIcon icon={faSort} />
                        </Button></h6>
                      </div>
                    </th>
                    <th className={styles.tableRow}>Image</th>
                    <th className={styles.tableRow}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((brand: any, index: number) => {
                    return (
                      <DisplayProductItem
                        key={index}
                        keyId={index}
                        id={brand.id}
                        name={brand.name}
                        imageName={brand.imageName}
                        isWishlistAdmin={false}
                      />
                    );
                  })}
                </tbody>
              </table>
              <Pagination size="lg" id={styles.pagination}>
                {paginationItems}
              </Pagination>
            </div>
          ) : (
            <h3 id={styles.noProducts}>Loading...</h3>
          )}
        </Layout>
      </>
    );
  }
}
