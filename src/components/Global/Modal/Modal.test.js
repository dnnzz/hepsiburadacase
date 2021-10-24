import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import Basket from "../Basket/Basket";
import { AppContext } from "../../Context/Context";
import { products } from "../../../../public/data/data";

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

function renderBasket() {
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
      <Basket />
    </AppContext.Provider>,
  );
}

describe("should hover and render mini basket to screen and remove product in cart", () => {
  it("is removing product in cart", () => {
    renderBasket();
    const button = screen.getByTestId("basket-button");
    fireEvent.mouseOver(button);
    expect(screen.getByTestId("mini-cart")).toBeInTheDocument();
    const removeBtn = screen.getByTestId("remove-button");
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    const yesBtn = screen.getByTestId("modal-yes-btn");
    fireEvent.click(yesBtn);
  });
});
