import React, { useState } from "react";
import styles from "./SingleProduct.module.css";
import mockPhoto from "./img.png";
import ProductPrice from "./ProductPrice";
import { AppState } from "../Context/Context";

export default function SingleProduct({
  productId,
  title,
  brand,
  price,
  discountPercentage,
  color,
}) {
  const {
    state: { cart },
    dispatch,
  } = AppState();

  const [isHovering, setIsHovering] = useState(false);
  const addToBasketButton = (
    <div className={styles.buttonWrapper}>
      {cart.some((product) => product["productId"] === productId) ? (
        <button disabled className={styles.addButtonPassive}>
          Bu ürünü sepete ekleyemezsiniz.
        </button>
      ) : (
        <button
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
      className={styles.singleProductContainer}
      onMouseEnter={(e) => setIsHovering(true)}
      onMouseLeave={(e) => setIsHovering(false)}
    >
      <div className={styles.card}>
        <div className={styles.cardImage} style={isHovering ? { border: "none" } : {}}>
          <img src={mockPhoto} alt='product' />
        </div>
        <div className={styles.cardBody} style={isHovering ? { display: "none" } : {}}>
          <h6
            className={styles.cardTitle}
            style={discountPercentage === 0 ? { marginTop: "0.4vh" } : {}}
          >
            {title}
          </h6>
          <div className={styles.productInfoWrapper}>
            <p className={styles.productInfo}>
              <b>Marka:</b>
              {brand}
            </p>
            <p className={styles.productInfo} style={{ marginTop: "-7px" }}>
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
