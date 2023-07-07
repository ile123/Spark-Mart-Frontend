import styles from "./AllProductsByCategory.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProductsByCategory } from "../../../../../services/product-Service";
import { DisplayProduct } from "../../../../../types/DisplayProduct";
import { Pagination } from "react-bootstrap";
import Layout from "../../../../UI/Layout/Layout";
import SearchBar from "../../../../UI/SearchBar/SearchBar";
import DisplayProductItem from "../../../../UI/Items/DisplayProductItem/DisplayProductItem";

export default function AllProductsByCategory() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [noProductsFound, setNoProductsFound] = useState(true);

  const { category } = useParams();

  const searchHandler = (searchString: string) => {
    const keyword = searchString === undefined ? "" : searchString;
    setSearchValue(keyword);
    getAllProductsByCategory(0, pageSize, sortBy, sortDir, keyword, category)
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
    getAllProductsByCategory(
      page - 1,
      pageSize,
      sortBy,
      sortDir,
      searchValue,
      category
    ).then((result: any) => {
      setNoProductsFound(false);
      setProducts(result.data.content);
      setTotalPages(result.data.totalPages);
    });
  };

  const changeSortingHander = (page: number, sortByField: string) => {
    const nextPage: number = page - 1 < 0 ? 0 : page - 1;
    setNoProductsFound(true);
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
    getAllProductsByCategory(
      currentPage,
      pageSize,
      sortBy,
      sortDir,
      searchValue,
      category
    )
      .then((result: any) => {
        setNoProductsFound(false);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
      })
      .catch((error: any) => console.log(error));
  }, []);

  return (
    <>
      <Layout>
        <SearchBar onSubmit={searchHandler} />
        {noProductsFound === false && products.length !== 0 ? (
          <div>
            <div className={styles.grid}>
              {products.map((category: any, index: number) => {
                return (
                  <DisplayProductItem
                    key={index}
                    keyId={index}
                    id={category.id}
                    name={category.name}
                    imageName={category.imageName}
                  />
                );
              })}
            </div>
            <Pagination size="lg" id={styles.pagination}>
              {paginationItems}
            </Pagination>
          </div>
        ) : (
          <h3 id={styles.noCategories}>Loading...</h3>
        )}
      </Layout>
    </>
  );
}
