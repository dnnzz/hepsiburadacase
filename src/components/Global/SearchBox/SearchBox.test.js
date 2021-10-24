import React from "react";

import { render,  screen, fireEvent } from "@testing-library/react";
import SearchBox from "./SearchBox";
import { Context } from "../../Context/Context";
import userEvent from "@testing-library/user-event";
import { products } from "../../../data/data";

const dispatch = jest.fn();
const productDispatch = jest.fn();
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
const renderSearchBox = () =>{
  return render(
    <Context
    testDispatch={dispatch}
    testState={{cart:[]}}
    testproductDispatch={productDispatch}
    testProductState={testState}
  >
    <SearchBox />
  </Context>,
  );
}

describe("Tests SearchBox component ", () => {
  beforeEach(()=> renderSearchBox())
  it("should render searchbox component", () => {
    const inputArea =screen.getByTestId("search-box");
    expect(inputArea).toBeInTheDocument();
  });
  it("should submit given input (correct input)", () => {
    const inputArea = screen.getByTestId("search-box");
    userEvent.type(inputArea, "ip");
    expect(inputArea).toHaveValue("ip");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    fireEvent.submit(inputArea);
    expect(productDispatch).toHaveBeenCalledWith({type:"FILTER_BY_SEARCH",payload:"ip"})
  });
  it("should submit given input (invalid input  input <= 2)", () => {
    const inputArea = screen.getByTestId("search-box");
    userEvent.type(inputArea, "i");
    expect(screen.getByTestId("search-box")).toHaveValue("i");
    expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
  });
});
