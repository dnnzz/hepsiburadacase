/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { AppState } from "../../Context/Context";
import { getCountByProperty, filterProducts } from "../../../utils/utils";
export default function Sidebar() {
  const {
    productState: { products, filteredProducts, byColor, byBrand },
    productDispatch,
  } = AppState();

  const [colorQty, setColorQty] = useState({});
  const [brandQty, setBrandQty] = useState({});

  const handleClickSortElements = (type) => {
    productDispatch({
      type: type,
    });
  };

  /* 
  check for active filters if we got filter then refilter from existing filteredProducts
  */
  useEffect(() => {
    let payloadVal;
    if (filteredProducts.length > 0) {
      payloadVal = filterProducts(filteredProducts, byColor, byBrand);
      productDispatch({
        type: "FILTER_PRODUCTS",
        payload: payloadVal,
      });
    } else {
      payloadVal = filterProducts(products, byColor, byBrand);
      productDispatch({
        type: "FILTER_PRODUCTS",
        payload: payloadVal,
      });
    }
  }, [byBrand.selected, byColor.selected]);

  /* 
  Every time productList array changes useEffect will evaluate
  getCountByProperty() function feeds filter section
  and check for active filter if we got active filter counts calculated from filteredProducts 
  */
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setColorQty(getCountByProperty(filteredProducts, "color"));
      setBrandQty(getCountByProperty(filteredProducts, "brand"));
    } else {
      setColorQty(getCountByProperty(products, "color"));
      setBrandQty(getCountByProperty(products, "brand"));
    }
  }, [products, filteredProducts]);

  return (
    <div data-testid='sidebar' className={styles.sidebarWrapper}>
      <h5>Renk</h5>
      <ul>
        {/* Takes colorQty state and prints key&values to filter section */}
        {/* if User click again on same filter key - filter will be removed at reducer  
            Check happens here -> byColor.selected && byColor.color === key  
             then send payload false and revaluate productList
             if -> byColor.selected false - then send payload true and filter productList 
            */}
        {Object.entries(colorQty).map(([key, value]) => {
          return (
            <li
              onClick={(e) => {
                byColor.selected && byColor.color === key
                  ? productDispatch({
                      type: "FILTER_BY_COLOR",
                      payload: {
                        color: key,
                        selected: false,
                      },
                    })
                  : productDispatch({
                      type: "FILTER_BY_COLOR",
                      payload: {
                        color: key,
                        selected: true,
                      },
                    });
              }}
              key={key}
            >
              {key} ({value})
            </li>
          );
        })}
      </ul>
      <h5>Sıralama</h5>
      <ul>
        <li
          onClick={(e) => {
            handleClickSortElements("SORT_BY_PRICE_ASC");
          }}
        >
          En düşük fiyat
        </li>
        <li
          onClick={(e) => {
            handleClickSortElements("SORT_BY_PRICE_DESC");
          }}
        >
          En yüksek fiyat
        </li>
        <li
          onClick={(e) => {
            handleClickSortElements("SORT_BY_NEW_ASC");
          }}
        >
          En yeniler (A&gt;Z)
        </li>
        <li
          onClick={(e) => {
            handleClickSortElements("SORT_BY_NEW_DESC");
          }}
        >
          En yeniler (Z&gt;A)
        </li>
      </ul>
      <h5>Marka</h5>
      <ul>
        {/* Takes brandQty state and prints key&values to filter section */}
        {/* if User click again on same filter key - filter will be removed at reducer 
             if -> byBrand.selected true - then send payload false 
             if -> byBrand.selected false - then send payload true and filter productList 
            */}
        {Object.entries(brandQty).map(([key, value]) => {
          return (
            <li
              onClick={(e) => {
                byBrand.selected && byBrand.brand === key
                  ? productDispatch({
                      type: "FILTER_BY_BRAND",
                      payload: {
                        brand: key,
                        selected: false,
                      },
                    })
                  : productDispatch({
                      type: "FILTER_BY_BRAND",
                      payload: {
                        brand: key,
                        selected: true,
                      },
                    });
              }}
              key={key}
            >
              {key} ({value})
            </li>
          );
        })}
      </ul>
    </div>
  );
}
