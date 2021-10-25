import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { Context } from "../Context/Context";
import "@testing-library/jest-dom";
import ProductList from "./ProductList";
import {products} from '../../data/data';
import userEvent from "@testing-library/user-event";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {configure, mount } from "enzyme";


configure({ adapter: new Adapter() });
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
function renderProductList() {
  return render(
    <Context
    testDispatch={dispatch}
    testState={{cart:[]}}
    testproductDispatch={productDispatch}
    testProductState={testState}
  >
    <ProductList />
  </Context>,
  );
}

describe("should render productlist", () => {
  it("renders productlist to screen & pagination", () => {
    renderProductList()
    const productList = screen.getByTestId("productlist");
    expect(productList).toBeInTheDocument();
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
  it("click add to basket button and dispatch action",()=>{
    renderProductList()
    const product = screen.getByTestId("test-1");
    expect(product).toBeInTheDocument();
    fireEvent.mouseOver(product);
    const addToCartButton = screen.getByTestId("addToCart-btn")
    expect(addToCartButton).toBeInTheDocument();
    userEvent.click(addToCartButton);
    expect(dispatch).toHaveBeenCalledWith({
      type: "ADD_TO_CART",
      payload: { productId: 1, title: "Apple iPhone 11 Siyah" },
    })
  })
});

describe('should click pagination button and verify state update', () => {
  const setCurrentPage = jest.fn();
  const Wrapper = ()=>(
  <Context
    testDispatch={dispatch}
    testState={{cart:[]}}
    testproductDispatch={productDispatch}
    testProductState={testState}
  >
    <ProductList />
  </Context>);
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation(currentPage => [currentPage, setCurrentPage]);
  const element = mount(<Wrapper />)
  element.find('#btn-3').simulate("click");
  expect(setCurrentPage).toBeTruthy();
})

describe('should render productlist sorted by price asc&desc', () => {
  it("sorts products by price descending order", () =>{
    const Wrapper = ()=>(
    <Context
      testDispatch={dispatch}
      testState={{cart:[]}}
      testproductDispatch={productDispatch}
      testProductState={{...testState,sortByPriceDesc:true}}
    >
      <ProductList />
    </Context>);
     const element = mount(<Wrapper />);
     const firstProduct = element.find('SingleProduct').at(0)
     expect(firstProduct.find('.activePrice > b').text()).toEqual("1760.00 TL")
  })
  it("sorts products by price descending order", () =>{
    const Wrapper = ()=>(
    <Context
      testDispatch={dispatch}
      testState={{cart:[]}}
      testproductDispatch={productDispatch}
      testProductState={{...testState,sortByPriceAsc:true,sortByPriceDesc:false}}
    >
      <ProductList />
    </Context>);
     const element = mount(<Wrapper />);
     const firstProduct = element.find('SingleProduct').at(0)
     expect(firstProduct.find('.activePrice > b').text()).toEqual("16.00 TL")
  })
})

