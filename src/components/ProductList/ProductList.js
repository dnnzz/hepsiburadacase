import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import SingleProduct from "../SingleProduct/SingleProduct";
import { AppState } from "../Context/Context";
import { sortAlphabetically, sortByPrice } from "../../utils/utils";
import Pagination from "./Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(12);

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (filteredProducts.length > 0) {
      setProductList(filteredProducts);
    } else {
      setProductList(products);
    }
  }, [products, filteredProducts]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  return (
    <>
      <div data-testid='productlist' className={styles.gridLayout}>
        {sortProducts()
          .slice(indexOfFirstProduct, indexOfLastProduct)
          .map((product) => (
            <SingleProduct
              key={product.productId}
              productId={product.productId}
              title={product.title}
              brand={product.brand}
              price={product.price}
              discountPercentage={product.discountPercentage}
              color={product.color}
              productPhoto={product.productPhoto}
            />
          ))}
        <Pagination
          productPerPage={productPerPage}
          totalProducts={productList.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
