import { filterBySearchQuery } from "../../utils/utils";

export const cartReducer = (state, action) => {
  let updatedCart;
  switch (action.type) {
    case "ADD_TO_CART":
      updatedCart = [...state.cart, { ...action.payload, addedDate: new Date() }]
        .sort((a, b) => a.addedDate - b.addedDate)
        .reverse();
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };
    case "REMOVE_FROM_CART":
      updatedCart = state.cart.filter((c) => c.productId !== action.payload);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_PRODUCTS":
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case "FILTER_BY_COLOR":
      return {
        ...state,
        byColor: {
          selected: action.payload.selected,
          color: action.payload.color,
        },
      };
    case "FILTER_BY_BRAND":
      return {
        ...state,
        byBrand: {
          selected: action.payload.selected,
          brand: action.payload.brand,
        },
      };
    case "SORT_BY_PRICE_ASC":
      return {
        ...state,
        sortByPriceAsc: !state.sortByPriceAsc,
        sortByPriceDesc: false,
        sortByNewAsc: false,
        sortByNewDesc: false,
      };
    case "SORT_BY_PRICE_DESC":
      return {
        ...state,
        sortByPriceDesc: !state.sortByPriceDesc,
        sortByPriceAsc: false,
        sortByNewAsc: false,
        sortByNewDesc: false,
      };
    case "SORT_BY_NEW_ASC":
      return {
        ...state,
        sortByNewAsc: !state.sortByNewAsc,
        sortByNewDesc: false,
        sortByPriceAsc: false,
        sortByPriceDesc: false,
      };
    case "SORT_BY_NEW_DESC":
      return {
        ...state,
        sortByNewDesc: !state.sortByNewDesc,
        sortByNewAsc: false,
        sortByPriceAsc: false,
        sortByPriceDesc: false,
      };
    case "FILTER_BY_SEARCH":
      let tempSearchedProducts = [];
      tempSearchedProducts = filterBySearchQuery(state.products, action.payload);

      return { ...state, searchQuery: action.payload, filteredProducts: tempSearchedProducts };
    default:
      return state;
  }
};
