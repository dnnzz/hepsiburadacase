import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import SingleProduct from "../SingleProduct/SingleProduct";
import { AppState } from "../Context/Context";
import { sortAlphabetically, sortByPrice } from "../../utils/utils";

export default function ProductList() {
  const {
    productState: {
      products,
      sortByPriceAsc,
      sortByPriceDesc,
      filteredProducts,
      sortByNewAsc,
      sortByNewDesc,
    },
  } = AppState();
  const [productList, setProductList] = useState([]);

  const sortProducts = () => {
    switch (true) {
      case sortByPriceAsc:
        return sortByPrice(productList, true);
      case sortByPriceDesc:
        return sortByPrice(productList, false);
      case sortByNewAsc:
        return sortAlphabetically(productList, true);
      case sortByNewDesc:
        return sortAlphabetically(productList, false);

      default:
        return productList;
    }
  };

  useEffect(() => {
    if (filteredProducts.length > 0) {
      setProductList(filteredProducts);
    } else {
      setProductList(products);
    }
  }, [products, filteredProducts]);

  return (
    <div className={styles.gridLayout}>
      {sortProducts()
        .slice(0, 12)
        .map((product) => (
          <SingleProduct
            key={product.productId}
            productId={product.productId}
            title={product.title}
            brand={product.brand}
            price={product.price}
            discountPercentage={product.discountPercentage}
            color={product.color}
          />
        ))}
    </div>
  );
}
