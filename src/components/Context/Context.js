import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducers";

const AppContext = createContext();

const Context = ({ children }) => {
  // get Localstorage productlist ------
  const products = JSON.parse(localStorage.getItem("productList"));
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [state, dispatch] = useReducer(cartReducer, {
    cart: cart,
  });

  const [productState, productDispatch] = useReducer(productReducer, {
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
  });

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
