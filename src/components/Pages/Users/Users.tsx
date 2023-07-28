//@ts-nocheck
import { useEffect, useState } from "react";
import Layout from "../../UI/Layout/Layout";
import Forbidden from "../Errors/Forbidden/Forbidden";
import styles from "./Users.module.css";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../../services/user-Service";
import UserItem from "../../UI/Items/UserItem/UserItem";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button/Button";
import { User } from "../../../types/User";
import { Link, useParams, useHistory } from "react-router-dom";
import SearchBar from "../../UI/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { type } = useParams();
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("firstName");
  const [users, setUsers] = useState<User[]>([{}]);
  const [totalPages, setTotalPages] = useState(0);
  const [noUsersFound, setNoUsersFound] = useState(false);

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

  const userDeletionHandler = (data: any, totalPages: number) => {
    setUsers(data);
    setTotalPages(totalPages);
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page - 1);
    getAllUsers(page - 1, pageSize, sortBy, sortDir, type, searchValue).then(
      (result: any) => {
        setUsers(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    );
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setSortBy(sortByField);
    setCurrentPage(nextPage);
    getAllUsers(
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc",
      type,
      searchValue
    ).then((result: any) => {
      setUsers(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

  const searchHandler = (searchString: string) => {
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllUsers(0, pageSize, sortBy, sortDir, type, keyword)
      .then((result: any) => {
        setNoUsersFound(false);
        setUsers(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoUsersFound(true);
      });
  };

  useEffect(() => {
    getAllUsers(currentPage, pageSize, "firstName", "asc", type, "")
      .then((result: any) => {
        setNoUsersFound(false);
        setUsers(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoUsersFound(true);
      });
  }, [type]);

  if (JSON.stringify(userInfo) === "{}") navigate("/");

  if (userInfo.role !== "ADMINISTRATOR" && type !== "customer") {
    return <Forbidden />;
  } else {
    return (
      <>
        <Layout>
          <div>
            <div id={styles.optionsGrid}>
              <div>
                <Link to="newUser" state={{ userType: type }}>
                  <Button style={styles.circleButton}>
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      size={"2xl"}
                    />
                  </Button>
                </Link>
              </div>
              <div id={styles.searchBar}>
                <SearchBar onSubmit={searchHandler} />
              </div>
            </div>
          </div>
          {!noUsersFound ? (
            <div>
              <table id={styles.table}>
                <thead id={styles.tableHead}>
                  <tr>
                    <th className={styles.tableRow}>
                      <div className={styles.grid}>
                        <h6 className={styles.fieldName}>
                          First Name
                          <Button
                            style={styles.buttonSort}
                            onClick={() =>
                              changeSortingHander(currentPage, "firstName")
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
                          Last Name
                          <Button
                            style={styles.buttonSort}
                            onClick={() =>
                              changeSortingHander(currentPage, "lastName")
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
                          Email
                          <Button
                            style={styles.buttonSort}
                            onClick={() =>
                              changeSortingHander(currentPage, "email")
                            }
                          >
                            <FontAwesomeIcon icon={faSort} />
                          </Button>
                        </h6>
                      </div>
                    </th>
                    <th className={styles.tableRow}>
                      <div className={styles.grid}>
                        <h6 className={styles.fieldName}>Phone Number</h6>
                        <Button
                          style={styles.buttonSort}
                          onClick={() =>
                            changeSortingHander(currentPage, "phoneNumber")
                          }
                        >
                          <FontAwesomeIcon icon={faSort} />
                        </Button>
                      </div>
                    </th>
                    <th id={styles.optionsRow}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: User, index: number) => {
                      return (
                        <UserItem
                          key={index}
                          keyId={index}
                          id={user.id}
                          firstName={user.firstName}
                          lastName={user.lastName}
                          email={user.email}
                          phoneNumber={user.phoneNumber}
                          pageNo={currentPage}
                          pageSize={pageSize}
                          sortDir={sortDir}
                          sortBy={sortBy}
                          keyword={searchValue}
                          userType={type}
                          onUserDeletion={userDeletionHandler}
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
