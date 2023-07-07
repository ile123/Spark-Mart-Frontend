//@ts-nocheck
import { useEffect, useState } from "react";
import Layout from "../../../UI/Layout/Layout";
import styles from './AllUsersByAddress.module.css'
import { useSelector } from "react-redux";
import Forbidden from "../../Errors/Forbidden/Forbidden";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../UI/Button/Button";
import { User } from "../../../types/User";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsersByAddress } from "../../../../services/address-Service";

export default function AllUsersByAddress() {
  const { id } = useParams();
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
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

  const changePageHandler = (page: number) => {
    setCurrentPage(page - 1);
    getAllUsersByAddress(id, page - 1, pageSize, sortBy, sortDir).then(
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
    getAllUsersByAddress(
      id,
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc"
    ).then((result: any) => {
      setUsers(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

  useEffect(() => {
    getAllUsersByAddress(id, currentPage, pageSize, "firstName", "asc")
      .then((result: any) => {
        if(result.data.content.length === 0) {
            setNoUsersFound(true);
        } else {
            setNoUsersFound(false);
        }
        setUsers(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoUsersFound(true);
      });
  }, []);

  if (JSON.stringify(userInfo) === "{}") navigate("/");

  if (userInfo.role !== "ADMINISTRATOR" && type !== "customer") {
    return <Forbidden />;
  } else {
    return (
      <>
        <Layout>
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
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any, index: number) => {
                    return (
                      <tr id={styles.row} key={index}>
                        <td className={styles.rowItem}>{user.firstName}</td>
                        <td className={styles.rowItem}>{user.lastName}</td>
                        <td className={styles.rowItem}>{user.email}</td>
                        <td className={styles.rowItem}>{user.phoneNumber}</td>
                      </tr>
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
