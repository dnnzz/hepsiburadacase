import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducers";

const AppContext = createContext();

const products = JSON.parse(localStorage.getItem("productList"));
const cart = JSON.parse(localStorage.getItem("cart"));

export const initialCartState = {
  cart: cart ? cart : [],
};
export const initialProductState = {
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
export const Context = ({
  children,
  testState,
  testProductState,
  testproductDispatch,
  testDispatch,
}) => {
  // get Localstorage productlist ------

  const [iState, iDispatch] = useReducer(cartReducer, initialCartState);

  const [iProductState, iProductDispatch] = useReducer(productReducer, initialProductState);

  const state = testState ? testState : iState;
  const dispatch = testDispatch ? testDispatch : iDispatch;
  const productState = testProductState ? testProductState : iProductState;
  const productDispatch = testproductDispatch ? testproductDispatch : iProductDispatch;

  return (
    <AppContext.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default Context;
