import React from "react";

import { render, screen } from "@testing-library/react";
import { AppContext } from "../Context/Context";
import "@testing-library/jest-dom";

import { products } from "../../data/data";
import SingleProduct from "./SingleProduct";

const testState = {
  products: products,
  filteredProducts: [],
  byColor: {
    selected: false,
    color: "Siyah",
  },
  byBrand: {
    selected: false,
    brand: "Apple",
  },
  sortByPriceAsc: false,
  sortByPriceDesc: false,
  sortByNewAsc: false,
  sortByNewDesc: false,
  searchQuery: "",
};

function renderSingleProduct() {
  const dispatch = jest.fn();
  const productDispatch = jest.fn();
  return render(
    <AppContext.Provider
      value={{
        state: {
          cart: [
            {
              productId: 2,
              title: "Apple iPhone 11 Yeşil",
              addedDate: "2021-10-08T12:17:14.439Z",
            },
          ],
        },
        dispatch: dispatch,
        productState: testState,
        productDispatch: productDispatch,
      }}
    >
      <SingleProduct />
    </AppContext.Provider>,
  );
}
describe("should render singleProduct", () => {
  it("renders singleProduct", () => {
    renderSingleProduct();
  });
});
