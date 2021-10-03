import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { Context, initialCartState, initialProductState } from "../../Context/Context";
const dispatch = jest.fn();

const productDispatch = jest.fn();

const header = render(
  <Context
    testDispatch={dispatch}
    testState={initialCartState}
    testproductDispatch={productDispatch}
    testProductState={initialProductState}
  >
    <Header />
  </Context>,
);
test("should check render", () => {
  expect(screen.getByText("Arama")).toBeTruthy();
  expect(header.getByPlaceholderText("25 milyon'dan fazla ürün içerisinde ara")).toBeTruthy();
});
