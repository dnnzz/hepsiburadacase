import React, { useState } from "react";
import styles from "./SearchBox.module.css";
import { AppState } from "../../Context/Context";

export default function SearchBox() {
  const {
    productState: { searchQuery },
    productDispatch,
  } = AppState();

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    if (query.length >= 2) {
      e.preventDefault();
      productDispatch({
        type: "FILTER_BY_SEARCH",
        payload: query,
      });
      setQuery(searchQuery);
    } else {
      setQuery(searchQuery);
    }
  };

  return (
    <div className={styles.search}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input
            type='text'
            onChange={(e) => setQuery(e.target.value)}
            placeholder={"25 milyon'dan fazla ürün içerisinde ara"}
          />
        </label>
      </form>
      {query.length === 1 && (
        <p style={{ color: "red", fontSize: "10px" }}>En az 2 karakter girmelisiniz</p>
      )}
    </div>
  );
}
