import React, { useState } from "react";
import styles from "./Basket.module.css";
import mockPhoto from "./img.png";
import { AppState } from "../../Context/Context";
import Modal from "../Modal/Modal";

export default function Basket() {
  const {
    state: { cart },
    dispatch,
  } = AppState();

  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(1);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
    setShowModal(false);
  };

  const renderCart = () => {
    return cart.map((product) => (
      <li key={product.productId}>
        <div className={styles.productWrapper}>
          <div className={styles.productThumbnail}>
            <img src={mockPhoto} alt='product-thumbnail' />
          </div>
          <div className={styles.productInfoWrapper}>
            <div className={styles.productName}>
              <p>{product.title}</p>
            </div>
            <div className={styles.deleteBtnWrapper}>
              <button
                onClick={(e) => {
                  setShowModal(true);
                  setSelectedProductId(product.productId);
                }}
                type='button'
                className={styles.deleteBtn}
              >
                <span>Kaldır</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className={styles.basketWrapper}>
      <button
        data-test='basketButton'
        type='button'
        onMouseOver={handleMouseOver}
        className={styles.basket}
        // inline styling ..
        style={
          isHovering
            ? { borderBottom: "0", borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }
            : {}
        }
      >
        <span className={styles.text}>Sepetim</span>
        <span className={styles.badge}>{cart.length}</span>
      </button>
      {isHovering && (
        <div
          id='mini-cart'
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseOut}
          className={styles.miniCart}
        >
          <ul>{renderCart()}</ul>
        </div>
      )}
      <div id='modal'>
        {showModal ? (
          <Modal>
            <div>
              <h1>Ürünü silmek istediğinize emin misiniz ?</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentiall....
              </p>
              <div className='buttons'>
                <button className='noBtn' onClick={(e) => setShowModal(false)}>
                  Hayır
                </button>
                <button className='yesBtn' onClick={(e) => handleClick(selectedProductId)}>
                  Evet
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}
