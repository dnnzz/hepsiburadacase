import React from "react";
import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";
import { Context, initialCartState, initialProductState } from "../../Context/Context";
import userEvent from "@testing-library/user-event";

describe("should select an option", () => {
  it("selects value", () => {
    const dispatch = jest.fn();

    const productDispatch = jest.fn();

    const { getByTestId } = render(
      <Context
        testDispatch={dispatch}
        testState={initialCartState}
        testproductDispatch={productDispatch}
        testProductState={initialProductState}
      >
        <Dropdown />
      </Context>,
    );
    userEvent.selectOptions(getByTestId("dropdown"), "En düşük fiyat");
    expect(screen.getByText("En düşük fiyat").selected).toBe(true);
    expect(screen.getByText("En yüksek fiyat").selected).toBe(false);
  });
});
