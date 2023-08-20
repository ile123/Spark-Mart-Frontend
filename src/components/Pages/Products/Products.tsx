import Layout from "../../UI/Layout/Layout";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCirclePlus, faCog } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../UI/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../../services/product-Service";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forbidden from "../Errors/Forbidden/Forbidden";
import { DisplayProduct } from "../../../types/DisplayProduct";
import ProductItem from "../../UI/Items/ProductItem/ProductItem";

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
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchHandler = (searchString: string) => {
    setLoading(true);
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllProducts(0, pageSize, sortBy, sortDir, keyword)
      .then((result: any) => {
        setLoading(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoProductsFound(true);
      });
  };

  const changePageHandler = (page: number) => {
    setLoading(true);
    setCurrentPage(page - 1);
    getAllProducts(page - 1, pageSize, sortBy, sortDir, searchValue).then(
      (result: any) => {
        setLoading(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    );
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    setLoading(true);
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
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
      setLoading(false);
      setProducts(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

  const productDeletionLoadingHandler = () => {
    setLoading(true);
  };

  const productDeletionHandler = (data: any, totalPages: any) => {
    setProducts(data);
    setTotalPages(totalPages);
    if (data.length == 0) {
      setNoProductsFound(true);
    }
    setLoading(false);
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
        if (result.data.numberOfElements === 0) {
          setLoading(false);
          setNoProductsFound(true);
        } else {
          setLoading(false);
          setNoProductsFound(false);
          setProducts(result.data.content);
          setTotalPages(result.data.totalPages);
        }
      })
      .catch(() => {
        setNoProductsFound(true);
      });
  }, []);

  if (loading)
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );
  if (JSON.stringify(userInfo) === "{}") navigate("/");
  if (userInfo.role === "CUSTOMER") {
    return <Forbidden />;
  } else {
    return (
      <>
        <Layout>
          {!noProductsFound ? (
            <div>
              <div>
                <div id={styles.optionsGrid}>
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
              <div>
                <table id={styles.table}>
                  <thead id={styles.tableHead}>
                    <tr>
                      <th className={styles.tableRow}>
                        <div className={styles.grid}>
                          <h6 className={styles.fieldName}>
                            Name
                            <Button
                              style={styles.buttonSort}
                              onClick={() =>
                                changeSortingHander(currentPage, "name")
                              }
                            >
                              <FontAwesomeIcon icon={faSort} />
                            </Button>
                          </h6>
                        </div>
                      </th>
                      <th className={styles.tableRow}>Image</th>
                      <th className={styles.tableRow}>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((brand: any, index: number) => {
                      return (
                        <ProductItem
                          key={index}
                          keyId={index}
                          id={brand.id}
                          name={brand.name}
                          imageName={brand.imageName}
                          isWishlistAdmin={false}
                          onProductDeletion={productDeletionHandler}
                          onProductDeletionLoading={
                            productDeletionLoadingHandler
                          }
                        />
                      );
                    })}
                  </tbody>
                </table>
                <Pagination size="lg" id={styles.pagination}>
                  {paginationItems}
                </Pagination>
              </div>
            </div>
          ) : (
            <div>
              <h3 id={styles.noProducts}>No Products Found</h3>
              <div id={styles.noProductsButton}>
                <Link to="newProduct">
                  <Button style={styles.circleButton}>
                    <FontAwesomeIcon icon={faCirclePlus} size={"2xl"} />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Layout>
      </>
    );
  }
}
