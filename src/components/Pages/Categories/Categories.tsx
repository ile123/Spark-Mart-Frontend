import Layout from "../../UI/Layout/Layout";
import styles from "./Categories.module.css";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../UI/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getAllCategories } from "../../../services/category-Service";
import CategoryItem from "../../UI/Items/CategoryItem/CategoryItem";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forbidden from "../Errors/Forbidden/Forbidden";
import { Category } from "../../../types/Category";

export default function Categories() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [categories, setCategories] = useState<Category[]>([{}]);
  const [totalPages, setTotalPages] = useState(0);
  const [noCategoriesFound, setNoCategoriesFound] = useState(true);

  const searchHandler = (searchString: string) => {
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllCategories(0, pageSize, sortBy, sortDir, keyword)
      .then((result: any) => {
        setNoCategoriesFound(false);
        setCategories(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoCategoriesFound(true);
      });
  };

  const changePageHandler = (page: number) => {
    setNoCategoriesFound(true);
    setCurrentPage(page - 1);
    getAllCategories(page - 1, pageSize, sortBy, sortDir, searchValue).then(
      (result: any) => {
        setNoCategoriesFound(false);
        setCategories(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    );
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
    setNoCategoriesFound(true);
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setSortBy(sortByField);
    setCurrentPage(nextPage);
    getAllCategories(
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc",
      searchValue
    ).then((result: any) => {
      setNoCategoriesFound(false);
      setCategories(result.data.content);
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
    getAllCategories(currentPage, pageSize, "name", "asc", "")
      .then((result: any) => {
        setNoCategoriesFound(false);
        setCategories(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoCategoriesFound(true);
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
                <Link to="newCategory">
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
          {noCategoriesFound === false && categories.length !== 0 ? (
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
                    <th className={styles.tableRow}>Description</th>
                    <th className={styles.tableRow}>Image</th>
                    <th className={styles.tableRow}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category: any, index: number) => {
                    return (
                      <CategoryItem
                        key={index}
                        keyId={index}
                        id={category.id}
                        name={category.name}
                        description={category.description}
                        imageName={category.imageName}
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
            <h3 id={styles.noCategories}>
              Loading...
            </h3> /* Zamini Loading sa onim kolutom */
          )}
        </Layout>
      </>
    );
  }
}
