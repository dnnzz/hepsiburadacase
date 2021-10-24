import React from "react";

import { render, screen, fireEvent} from "@testing-library/react";
import userEvent  from "@testing-library/user-event";
import { AppContext } from "../Context/Context";
import "@testing-library/jest-dom";

import { products } from "../../../public/data/data";
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
      <SingleProduct key={1}
      productId={1}
      title={"Iphone 11"}
      brand={"Apple"}
      price={570}
      discountPercentage={10}
      color={"Siyah"} />
    </AppContext.Provider>,
  );
}
describe("should render singleProduct", () => {
  beforeEach(() => renderSingleProduct())
  it("checks singleProduct rendered correctly", () => {
    expect(screen.getByText("Iphone 11")).toBeInTheDocument();
  });
  it("checks hoverEffect working correctly",()=>{
    const element = screen.getByTestId("test-1");
    fireEvent.mouseOver(element);
    expect(screen.getByTestId("addToCart-btn")).toBeInTheDocument();
  })
});
