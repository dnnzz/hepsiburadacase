import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { Context } from "../Context/Context";
import "@testing-library/jest-dom";
import ProductList from "./ProductList";
import {products} from '../../data/data';
import userEvent from "@testing-library/user-event";
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
  sortByPriceAsc: true,
  sortByPriceDesc: false,
  sortByNewAsc: false,
  sortByNewDesc: false,
  searchQuery: "",
};
const dispatch = jest.fn();
const productDispatch = jest.fn();
function renderProductList() {
  return render(
    <Context
    testDispatch={dispatch}
    testState={{cart:[]}}
    testproductDispatch={productDispatch}
    testProductState={testState}
  >
    <ProductList />
  </Context>,
  );
}

describe("should render productlist", () => {
  beforeEach(() => renderProductList())
  it("renders productlist to screen & pagination", () => {
    const productList = screen.getByTestId("productlist");
    expect(productList).toBeInTheDocument();
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
  it("click add to basket button and dispatch action",()=>{
    const product = screen.getByTestId("test-1");
    expect(product).toBeInTheDocument();
    fireEvent.mouseOver(product);
    const addToCartButton = screen.getByTestId("addToCart-btn")
    expect(addToCartButton).toBeInTheDocument();
    userEvent.click(addToCartButton);
    expect(dispatch).toHaveBeenCalledWith({
      type: "ADD_TO_CART",
      payload: { productId: 1, title: "Apple iPhone 11 Siyah" },
    })
  })
});
