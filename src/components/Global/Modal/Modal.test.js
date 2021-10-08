import React from "react";

import { render, fireEvent, screen, getByText } from "@testing-library/react";
import Basket from "../Basket/Basket";
import { Context, initialProductState, initialCartState } from "../../Context/Context";

describe("should hover and render mini basket to screen and remove product in cart", () => {
  it("is remove product in cart", () => {
    const dispatch = jest.fn();

    const productDispatch = jest.fn();

    const testCartState = [
      {
        productId: 2,
        title: "Apple iPhone 11 Yeşil",
        addedDate: "Thu Oct 07 2021 19:49:48 GMT+0300 (GMT+03:00)",
      },
    ];

    const { getByTestId } = render(
      <Context
        testDispatch={dispatch}
        testState={testCartState}
        testProductDispatch={productDispatch}
        testProductState={initialProductState}
      >
        <Basket />
      </Context>,
    );
    const button = getByTestId("basket-button");
    fireEvent.mouseOver(button);
    expect(screen.getByTestId("mini-cart")).toBeInTheDocument();

    expect(screen.getByTestId("remove-button")).toBeInTheDocument();
  });
});
