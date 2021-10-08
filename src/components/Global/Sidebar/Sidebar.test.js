import React from "react";

import { render, screen } from "@testing-library/react";
import { AppContext } from "../../Context/Context";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";

import { products } from "../../../data/data";

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

function renderSidebar() {
  const dispatch = jest.fn();
  const productDispatch = jest.fn();
  return render(
    <AppContext.Provider
      value={{
        state: { cart: [] },
        dispatch: dispatch,
        productState: testState,
        productDispatch: productDispatch,
      }}
    >
      <Sidebar />
    </AppContext.Provider>,
  );
}
describe("should render sidebar", () => {
  it("renders sidebar to screen", () => {
    renderSidebar();
    const sideBar = screen.getByTestId("sidebar");
    expect(sideBar).toBeInTheDocument();
  });
});
