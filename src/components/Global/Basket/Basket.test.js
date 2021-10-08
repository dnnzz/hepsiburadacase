import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import Basket from "./Basket";
import { Context, initialCartState, initialProductState } from "../../Context/Context";

describe("should hover and render mini basket to screen", () => {
  it("is mini cart rendering on Hover", () => {
    const dispatch = jest.fn();

    const productDispatch = jest.fn();

    const { getByTestId } = render(
      <Context
        testDispatch={dispatch}
        testState={initialCartState}
        testProductDispatch={productDispatch}
        testProductState={initialProductState}
      >
        <Basket />
      </Context>,
    );
    const button = getByTestId("basket-button");
    fireEvent.mouseOver(button);
    expect(screen.getByTestId("mini-cart")).toBeInTheDocument();
  });
});
