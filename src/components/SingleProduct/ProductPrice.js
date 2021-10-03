import React from "react";
import styles from "./SingleProduct.module.css";
export default function ProductPrice({ price, discountPercentage }) {
  return (
    <>
      <p className={styles.activePrice}>
        {/* A mini helper calculation for discounted price -----(actualPrice - discountPercetange) -> discountedPrice  -------- */}
        <b>{(price - (price * discountPercentage) / 100).toFixed(2).toString()} TL</b>
      </p>
      <p className={styles.actualPrice} style={discountPercentage === 0 ? { display: "none" } : {}}>
        <strike>{price} TL</strike> <span>%{discountPercentage}</span>
      </p>
    </>
  );
}
