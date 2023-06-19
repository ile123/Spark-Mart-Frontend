import { useState } from "react";
import styles from "./SearchBar.module.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(props: any) {
  const [searchValue, setSearchValue] = useState("");

  const searchBarChangeHandler = (event: any) => {
    setSearchValue(event.target.value);
  };

  const submitHandler = () => {
    setSearchValue("");
    props.onSubmit(searchValue);
  };

  return (
    <>
      <div id={styles.grid}>
        <div className={styles.item}>
          <input
            type="text"
            name="search"
            id={styles.searchBar}
            onChange={searchBarChangeHandler}
          />
        </div>
        <div className={styles.item}>
          <Button style={styles.searchButton} onClick={submitHandler}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
      </div>
    </>
  );
}
