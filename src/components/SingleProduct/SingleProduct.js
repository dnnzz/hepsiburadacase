import React, { useState } from "react";
import styles from "./SingleProduct.module.css";
import ProductPrice from "./ProductPrice";
import { AppState } from "../Context/Context";

export default function SingleProduct({
  productId,
  title,
  brand,
  price,
  discountPercentage,
  color,
  productPhoto
}) {
  const {
    state: { cart },
    dispatch,
  } = AppState();

  const [isHovering, setIsHovering] = useState(false);
  const addToBasketButton = (
    <div className={styles.buttonWrapper}>
      {cart.some((product) => product["productId"] === productId) ? (
        <button data-testid="disabled-btn" disabled className={styles.addButtonPassive}>
          Bu ürünü sepete ekleyemezsiniz.
        </button>
      ) : (
        <button
        data-testid="addToCart-btn"
          onClick={(e) => {
            dispatch({
              type: "ADD_TO_CART",
              payload: { productId, title },
            });
          }}
          className={styles.addButton}
        >
          Sepete Ekle
        </button>
      )}
    </div>
  );

  return (
    <div
      data-testid={`test-${productId}`}
      className={styles.singleProductContainer}
      onMouseEnter={(e) => setIsHovering(true)}
      onMouseLeave={(e) => setIsHovering(false)}
    >
      <div className={styles.card}>
        <div className={isHovering ? styles.cardImageHover : styles.cardImage} >
          <img src={productPhoto} alt='product' />
        </div>
        <div className={isHovering  ? styles.cardBodyHovering : styles.cardBody}>
          <h6
            className={discountPercentage === 0 ? styles.discountlessCardTitle : styles.cardTitle}
          >
            {title}
          </h6>
          <div className={styles.productInfoWrapper}>
            <p className={styles.productInfo}>
              <b>Marka:</b>
              {brand}
            </p>
            <p className={styles.productInfo}>
              <b>Renk:</b>
              {color}
            </p>
          </div>
          <div className={styles.productPrice}>
            <ProductPrice price={price} discountPercentage={discountPercentage} />
          </div>
        </div>
        {isHovering && addToBasketButton}
      </div>
    </div>
  );
}
