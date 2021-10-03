import React from "react";
import styles from "./Header.module.css";
import logo from "../../../logo.svg";
import SearchBox from "../SearchBox/SearchBox";
import Basket from "../Basket/Basket";
import Dropdown from "../Dropdown/Dropdown";
import { AppState } from "../../Context/Context";

/* 
Takes search query value and when the query exists this component
display search query as Aranan Kelime : {query}

*/

export default function Header() {
  const {
    productState: { searchQuery },
  } = AppState();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <img alt='brand logo' className={styles.logo} src={logo} />
          <SearchBox />
          <Basket />
        </div>
      </header>
      <div className={styles.productWrapper}>
        <div className={styles.productSection}>
          <h3>Arama</h3>
          {searchQuery.length > 0 && (
            <p>
              Aranan Kelime:<span>{searchQuery}</span>
            </p>
          )}
        </div>
        <Dropdown />
      </div>
    </>
  );
}
