import React, { useState } from "react";

import styles from "./ProductList.module.css";

/* if only one page exist do not display pagination */

const Pagination = ({ productPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];
  const [currentNumber, setCurrentNumber] = useState(1);
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        style={{ position: "absolute", display: "flex", justifyContent: "center" }}
        className={styles.pagination}
      >
        <button
          onClick={() => {
            if (currentNumber > 1) {
              setCurrentNumber(currentNumber - 1);
              paginate(currentNumber - 1);
            } else {
              return;
            }
          }}
          className={styles.pageItem}
        >
          &lt;
        </button>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => {
                setCurrentNumber(number);
                paginate(number);
              }}
              className={styles.pageItem}
            >
              {number}
            </button>
          </li>
        ))}
        <button
          onClick={() => {
            if (currentNumber < pageNumbers.length) {
              setCurrentNumber(currentNumber + 1);
              paginate(currentNumber + 1);
            } else {
              return;
            }
          }}
          className={styles.pageItem}
        >
          &gt;
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
