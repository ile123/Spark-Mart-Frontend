import Layout from "../../UI/Layout/Layout";
import styles from "./Brands.module.css";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../UI/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { Brand } from "../../../types/Brand";
import { getAllBrands } from "../../../services/brand-Service";
import BrandItem from "./BrandItem/BrandItem";
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
  const [brands, setBrands] = useState<Brand[]>([{}]);
  const [totalPages, setTotalPages] = useState(0);
  const [noBrandsFound, setNoBrandsFound] = useState(false);

  const searchHandler = (searchString: string) => {
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllBrands(0, pageSize, sortBy, sortDir, keyword)
      .then((result: any) => {
        setNoBrandsFound(false);
        setBrands(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoBrandsFound(true);
      });
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page - 1);
    getAllBrands(page - 1, pageSize, sortBy, sortDir, searchValue).then(
      (result: any) => {
        setBrands(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    );
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
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
      setBrands(result.data.content);
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
    getAllBrands(currentPage, pageSize, "name", "asc", "")
      .then((result: any) => {
        setNoBrandsFound(false);
        setBrands(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoBrandsFound(true);
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
          {!noBrandsFound ? (
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
                  {brands.map((brand: any, index: number) => {
                    console.log(brand);
                    return (
                      <BrandItem
                        key={index}
                        id={brand.id}
                        name={brand.name}
                        imageName={brand.imageName}
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
            <h3 id={styles.noBrands}>No brands were found!</h3>
          )}
        </Layout>
      </>
    );
  }
}
