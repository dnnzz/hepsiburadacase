import React from "react";
import styles from "./Dropdown.module.css";
import { AppState } from "../../Context/Context";

export default function Dropdown() {
  const {
    productState: { sortByPriceAsc, sortByPriceDesc, sortByNewAsc, sortByNewDesc },
    productDispatch,
  } = AppState();
  const handleDispatchEventsOnSelect = (type) => {
    productDispatch({
      type: type,
    });
  };

  return (
    <div className={styles.dropDownWrapper}>
      <select
        data-testid='dropdown'
        onChange={(e) => handleDispatchEventsOnSelect(e.target.value)}
        className={styles.dropDownBtn}
      >
        <option style={{ display: "none" }} defaultValue>
          Sıralama
        </option>
        <option value='SORT_BY_PRICE_ASC' selected={sortByPriceAsc}>
          En düşük fiyat
        </option>
        <option value='SORT_BY_PRICE_DESC' selected={sortByPriceDesc}>
          En yüksek fiyat
        </option>
        <option value='SORT_BY_NEW_ASC' selected={sortByNewAsc}>
          En yeniler (A&gt;Z)
        </option>
        <option value='SORT_BY_NEW_DESC' selected={sortByNewDesc}>
          En yeniler (Z&gt;A)
        </option>
      </select>
    </div>
  );
}
