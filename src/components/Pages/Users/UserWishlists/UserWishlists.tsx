import { Product } from '../../../../types/Product';
import styles from './UserWishlists.module.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { getAllWishlistsByUser } from '../../../../services/customer-Service';
import { useEffect } from 'react';
import Forbidden from '../../Errors/Forbidden/Forbidden';
import Layout from '../../../UI/Layout/Layout';
import Button from '../../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import ProductItem from '../../../UI/Items/ProductItem/ProductItem';

export default function UserWishlists() {

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const {
    state: { userId },
  } = useLocation();

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

  const orderDeletionHandler = (data: any, totalPages: number) => {
    setProducts(data);
    setTotalPages(totalPages);
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page - 1);
    getAllWishlistsByUser(userId, page - 1, pageSize, sortBy, sortDir).then(
      (result: any) => {
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      }
    );
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setSortBy(sortByField);
    setCurrentPage(nextPage);
    getAllWishlistsByUser(
      userId,
      nextPage,
      pageSize,
      sortByField,
      sortDir === "asc" ? "desc" : "asc"
    ).then((result: any) => {
      setProducts(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

  useEffect(() => {
    getAllWishlistsByUser(userId, currentPage, pageSize, "name", "asc")
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
          ) : (
            <h3 id={styles.noProducts}>Loading...</h3>
          )}
        </Layout>
      </>
    );
  }
}