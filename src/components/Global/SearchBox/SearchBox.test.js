import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import SearchBox from "./SearchBox";
import { Context, initialCartState, initialProductState } from "../../Context/Context";
import userEvent from "@testing-library/user-event";

describe("Tests SearchBox component ", () => {
  it("should submit given input (correct input)", () => {
    const dispatch = jest.fn();

    const productDispatch = jest.fn();

    const { getByTestId } = render(
      <Context
        testDispatch={dispatch}
        testState={initialCartState}
        testProductDispatch={productDispatch}
        testProductState={initialProductState}
      >
        <SearchBox />
      </Context>,
    );
    const inputArea = getByTestId("search-box");
    userEvent.type(inputArea, "ip");
    expect(screen.getByTestId("search-box")).toHaveValue("ip");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });
  it("should submit given input (invalid input  input <= 2)", () => {
    const dispatch = jest.fn();

    const productDispatch = jest.fn();

    const { getByTestId } = render(
      <Context
        testDispatch={dispatch}
        testState={initialCartState}
        testProductDispatch={productDispatch}
        testProductState={initialProductState}
      >
        <SearchBox />
      </Context>,
    );
    const inputArea = getByTestId("search-box");
    userEvent.type(inputArea, "i");
    expect(screen.getByTestId("search-box")).toHaveValue("i");
    expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
  });
});
