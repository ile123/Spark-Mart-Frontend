import Layout from "../../UI/Layout/Layout";
import styles from "./Brands.module.css";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCirclePlus, faCog } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../UI/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { Brand } from "../../../types/Brand";
import { getAllBrands } from "../../../services/brand-Service";
import BrandItem from "../../UI/Items/BrandItem/BrandItem";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forbidden from "../Errors/Forbidden/Forbidden";

export default function Brands() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noBrandsFound, setNoBrandsFound] = useState(true);
  const [loading, setLoading] = useState(true);

  const searchHandler = (searchString: string) => {
    setLoading(true);
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllBrands(0, pageSize, sortBy, sortDir, keyword)
      .then((result: any) => {
        setLoading(false);
        setBrands(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoBrandsFound(true);
      });
  };

  const changePageHandler = (page: number) => {
    setLoading(true);
    setCurrentPage(page - 1);
    getAllBrands(page - 1, pageSize, sortBy, sortDir, searchValue).then(
      (result: any) => {
        setLoading(false);
        setBrands(result.data.content);
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
    getAllBrands(
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc",
      searchValue
    ).then((result: any) => {
      setLoading(false);
      setBrands(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

  const brandDeletionLoadingHandler = () => {
    setLoading(true);
  };

  const brandDeletionHandler = (data: any, totalPages: any) => {
    setBrands(data);
    setTotalPages(totalPages);
    if (data.length == 0) {
      setNoBrandsFound(true);
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
    getAllBrands(currentPage, pageSize, "name", "asc", "")
      .then((result: any) => {
        if (result.data.numberOfElements === 0) {
          setLoading(false);
          setNoBrandsFound(true);
        } else {
          setLoading(false);
          setNoBrandsFound(false);
          setBrands(result.data.content);
          setTotalPages(result.data.totalPages);
        }
      })
      .catch(() => {
        setNoBrandsFound(true);
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
          {!noBrandsFound ? (
            <div>
              <div>
                <div id={styles.optionsGrid}>
                  <div>
                    <Link to="newBrand">
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
                    {brands.map((brand: any, index: number) => {
                      return (
                        <BrandItem
                          key={index}
                          keyId={index}
                          id={brand.id}
                          name={brand.name}
                          imageName={brand.imageName}
                          onBrandDeletion={brandDeletionHandler}
                          onBrandDeletionLoading={brandDeletionLoadingHandler}
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
              <h3 id={styles.noBrands}>No Brands Found</h3>
              <div id={styles.noBrandsButton}>
                <Link to="newBrand">
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
