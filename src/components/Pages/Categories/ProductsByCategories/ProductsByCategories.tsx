import Layout from "../../../UI/Layout/Layout";
import styles from './ProductsByCategories.module.css'
import { useParams } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCog } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../UI/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getAllProductsByCategory } from "../../../../services/product-Service";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forbidden from "../../Errors/Forbidden/Forbidden";
import { DisplayProduct } from "../../../../types/DisplayProduct";
import ProductItem from "../../../UI/Items/ProductItem/ProductItem";

export default function ProductsByCategories() {

  const { category } = useParams();

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
  const [loading, setLoading] = useState(true);

  const searchHandler = (searchString: string) => {
    setLoading(true);
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllProductsByCategory(0, pageSize, sortBy, sortDir, keyword, category)
      .then((result: any) => {
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
        setLoading(false);
      })
      .catch(() => {
        setNoProductsFound(true);
      });
  };

  const changePageHandler = (page: number) => {
    setLoading(true);
    setCurrentPage(page - 1);
    getAllProductsByCategory(page - 1, pageSize, sortBy, sortDir, searchValue, category).then(
      (result: any) => {
        setLoading(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    );
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
    setLoading(true);
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setSortBy(sortByField);
    setCurrentPage(nextPage);
    getAllProductsByCategory(
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc",
      searchValue,
      category
    ).then((result: any) => {
      setLoading(false);
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
    getAllProductsByCategory(currentPage, pageSize, "name", "asc", "", category)
      .then((result: any) => {
        if(result.data.totalElements === 0) {
          setNoProductsFound(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setNoProductsFound(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoProductsFound(true);
      });
  }, []);

  if(loading) return <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />;
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
                <div className={styles.optionsGrid}>
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
                          isWishlistAdmin={true}
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
            <h3 id={styles.noProducts}>No Products Found</h3>
          )}
        </Layout>
      </>
    );
  }
}