import React from "react";

import { render, screen} from "@testing-library/react";
import { Context } from "../../Context/Context";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";
import {products} from '../../../data/data';
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
  sortByPriceAsc: false,
  sortByPriceDesc: false,
  sortByNewAsc: false,
  sortByNewDesc: false,
  searchQuery: "",
};
const dispatch = jest.fn();
const productDispatch = jest.fn();
function renderSidebar() {
  
  return render(
    <Context
    testDispatch={dispatch}
    testState={{cart:[]}}
    testproductDispatch={productDispatch}
    testProductState={testState}
  >
    <Sidebar />
  </Context>,
  );
}

describe("sidebar tests", () => {
  beforeEach(()=> renderSidebar())
  it("renders sidebar to screen", () => {
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
  it("clicks filterbycolor and dispatch action",()=>{
    const filterButton = screen.getByTestId("Siyah");
    userEvent.click(filterButton);
    expect(productDispatch).toHaveBeenCalledWith({ type: "FILTER_BY_COLOR" , payload: {
      color: "Siyah",
      selected: true,
    }});
  })
  it("clicks filterbybrand and dispatch action",()=>{
    const filterButton = screen.getByTestId("Apple");
    userEvent.click(filterButton);
    expect(productDispatch).toHaveBeenCalledWith({ type: "FILTER_BY_BRAND" , payload: {
      brand: "Apple",
      selected: true,
    }});
  })
  it("clicks sortelement and dispatch action",()=>{
    const sortButton = screen.getByTestId("sortByPriceAsc");
    userEvent.click(sortButton);
    expect(productDispatch).toHaveBeenCalledWith({type:"SORT_BY_PRICE_ASC"})
  })
});
