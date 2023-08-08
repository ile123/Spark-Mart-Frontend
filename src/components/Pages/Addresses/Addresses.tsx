//@ts-nocheck
import styles from "./Addresses.module.css";
import Layout from "../../UI/Layout/Layout";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Address } from "../../../types/Address";
import { Pagination } from "react-bootstrap";
import { getAllAddresses } from "../../../services/address-Service";
import Forbidden from "../Errors/Forbidden/Forbidden";
import SearchBar from "../../UI/SearchBar/SearchBar";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCirclePlus, faCog } from "@fortawesome/free-solid-svg-icons";
import AddressItem from "../../UI/Items/AddressItem/AddressItem";
import { useNavigate } from "react-router-dom";

export default function Addresses() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("streetAddress");
  const [addresses, setAddresses] = useState<Address[]>([{}]);
  const [totalPages, setTotalPages] = useState(0);
  const [noAddressesFound, setNoAddressesFound] = useState(false);
  const [loading, setLoading] = useState(true);

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
    getAllAddresses(page - 1, pageSize, sortBy, sortDir, searchValue).then(
      (result: any) => {
        setLoading(false);
        setAddresses(result.data.content);
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
    getAllAddresses(
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc",
      searchValue
    ).then((result: any) => {
      setLoading(false);
      setAddresses(result.data.content);
      setTotalPages(result.data.totalPages);
    })
    .catch(() => setNoAddressesFound(true));
  };

  const searchHandler = (searchString: string) => {
    setLoading(true);
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllAddresses(0, pageSize, sortBy, sortDir, keyword)
      .then((result: any) => {
        setLoading(false);
        setAddresses(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch(() => {
        setNoAddressesFound(true);
      });
  };

  useEffect(() => {
    getAllAddresses(currentPage, pageSize, "streetAddress", "asc", "")
      .then((result: any) => {
        if (result.data.totalElements === 0) {
          setLoading(false);
          setNoAddressesFound(true);
        } else {
          setLoading(false);
          setNoAddressesFound(false);
          setAddresses(result.data.content);
          setTotalPages(result.data.totalPages);
        }
      })
      .catch(() => {
        setNoAddressesFound(true);
      });
  }, []);

  if (loading) return <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />;

  if (JSON.stringify(userInfo) === "{}") navigate("/");

  if (userInfo.role === "CUSTOMER") {
    return <Forbidden />;
  } else {
    return (
      <>
        <Layout>
          {!noAddressesFound ? (
            <div>
              <div>
                <div id={styles.optionsGrid}>
                  <div>
                    <Link to="newAddress">
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
                          <h6 className={styles.fieldName}>Street Address</h6>
                          <Button
                            style={styles.buttonSort}
                            onClick={() =>
                              changeSortingHander(currentPage, "streetAddress")
                            }
                          >
                            <FontAwesomeIcon icon={faSort} />
                          </Button>
                        </div>
                      </th>
                      <th className={styles.tableRow}>
                        <div className={styles.grid}>
                          <h6 className={styles.fieldName}>
                            City
                            <Button
                              style={styles.buttonSort}
                              onClick={() =>
                                changeSortingHander(currentPage, "city")
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
                            Postal Code
                            <Button
                              style={styles.buttonSort}
                              onClick={() =>
                                changeSortingHander(currentPage, "postalCode")
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
                            Province
                            <Button
                              style={styles.buttonSort}
                              onClick={() =>
                                changeSortingHander(currentPage, "province")
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
                            Country
                            <Button
                              style={styles.buttonSort}
                              onClick={() =>
                                changeSortingHander(currentPage, "country")
                              }
                            >
                              <FontAwesomeIcon icon={faSort} />
                            </Button>
                          </h6>
                        </div>
                      </th>
                      <th id={styles.optionsRow}>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addresses.map((address: any, index: number) => {
                      return (
                        <AddressItem
                          key={index}
                          keyId={index}
                          id={address.id}
                          streetAddress={address.streetAddress}
                          city={address.city}
                          postalCode={address.postalCode}
                          province={address.province}
                          country={address.country}
                          pageNo={currentPage}
                          pageSize={pageSize}
                          sortDir={sortDir}
                          sortBy={sortBy}
                          keyword={searchValue}
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
            </div>
          ) : (
            <div>
              <h3 id={styles.noAddresses}>No addresses were found!</h3>
              <div id={styles.noAddressesButton}>
                <Link to="newAddress">
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
