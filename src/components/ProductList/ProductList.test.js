import React from "react";

import { render, screen } from "@testing-library/react";
import { AppContext } from "../Context/Context";
import "@testing-library/jest-dom";
import ProductList from "./ProductList";

import { products } from "../../data/data";

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

function renderProductList() {
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
      <ProductList />
    </AppContext.Provider>,
  );
}

describe("should render productlist", () => {
  it("renders productlist to screen & pagination", () => {
    renderProductList();
    const sideBar = screen.getByTestId("productlist");
    expect(sideBar).toBeInTheDocument();
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
});
