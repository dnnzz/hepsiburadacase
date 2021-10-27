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
  const addToBasketButton =() => (
    <>
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
    </>
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
        <div>
        <div className={styles.cardBody}>
          <h6
            className={discountPercentage === 0 ? styles.discountlessCardTitle : styles.cardTitle}
          >
            {title}
          </h6>
          <div className={styles.productInfoWrapper}>
            {isHovering ? addToBasketButton(title) : 
            <>
            <p className={styles.productInfo}>
              <b>Marka:</b>
              {brand}
            </p>
            <p className={styles.productInfoColor}>
              <b>Renk:</b>
              {color}
            </p>
            <div className={styles.productPrice}>
            <ProductPrice price={price} discountPercentage={discountPercentage} />
          </div>
            </>}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
