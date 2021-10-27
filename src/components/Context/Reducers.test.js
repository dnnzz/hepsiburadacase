import { act,renderHook} from '@testing-library/react-hooks';
import { useReducer } from 'react';
import {products} from '../../data/data';
import { productReducer,cartReducer} from './Reducers';
import { filterProducts } from '../../utils/utils';

const initialProductState = {
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
const initialCartState = {
    cart : []
}
const dispatchHelper = (dispatch,type,payload) =>act(()=>{
    dispatch({
        type: type,
        payload: payload
      })
});

describe("tests for useReducer hook",()=>{
    test("dispatch productReducer and verify state updates",()=>{
        const {result} = renderHook(() => useReducer(productReducer ,initialProductState));
        const[state,dispatch] = result.current;


        let payloadVal = filterProducts(state.products,{selected:true,color:"Siyah"},{selected:true,brand:"Nokia"});
        dispatchHelper(dispatch,"FILTER_PRODUCTS",payloadVal);
    
        expect(result.current[0].filteredProducts).toStrictEqual([ {
            productId: 31,
            title: "Nokia 301",
            brand: "Nokia",
            price: 26,
            discountPercentage: 8,
            color: "Siyah",
            productPhoto: "https://i.ibb.co/pKSBRpr/image-1.png",
            createdDate: "2021-04-10T01:00:00+03:00",
          }])

          dispatchHelper(dispatch,"FILTER_BY_COLOR",{
            color: "Siyah",
            selected: true,
          })
        expect(result.current[0].byColor).toStrictEqual({selected:true,color:"Siyah"});
        
        dispatchHelper(dispatch,"FILTER_BY_BRAND",{
            brand: "Apple",
            selected: true,
          })
        expect(result.current[0].byBrand).toStrictEqual({selected:true,brand:"Apple"});
        
        dispatchHelper(dispatch,"SORT_BY_PRICE_DESC",0);
        expect(result.current[0].sortByPriceDesc).toStrictEqual(true);
        expect(result.current[0].sortByPriceAsc).not.toStrictEqual(true);
        
        dispatchHelper(dispatch,"SORT_BY_PRICE_ASC",0);
        expect(result.current[0].sortByPriceAsc).toStrictEqual(true);
        expect(result.current[0].sortByPriceDesc).not.toStrictEqual(true);
        
        dispatchHelper(dispatch,"SORT_BY_NEW_ASC",0);
        expect(result.current[0].sortByNewAsc).toStrictEqual(true);
        expect(result.current[0].sortByNewDesc).not.toStrictEqual(true);
        
        dispatchHelper(dispatch,"SORT_BY_NEW_DESC",0);
        expect(result.current[0].sortByNewDesc).toStrictEqual(true);
        expect(result.current[0].sortByNewAsc).not.toStrictEqual(true);
        
        dispatchHelper(dispatch,"FILTER_BY_SEARCH","Samsung Note 9 Siyah")
        expect(result.current[0].filteredProducts[0].title).toBe("Samsung Note 9 Siyah");
        expect(result.current[0].searchQuery).toBe("Samsung Note 9 Siyah");
    })
    test("dispatch cartReducer and verify state updates",() =>{
        const {result} = renderHook(() => useReducer(cartReducer,initialCartState));
        const[,dispatch] = result.current;
        
        dispatchHelper(dispatch,"ADD_TO_CART", { productId : 1, title : "Apple iPhone 11 Siyah"})
        expect(JSON.parse(window.localStorage.getItem("cart"))[0].title).toBe("Apple iPhone 11 Siyah");
        expect(result.current[0].cart[0].title).toBe("Apple iPhone 11 Siyah");

          
        dispatchHelper(dispatch,"REMOVE_FROM_CART", 1)
        expect(JSON.parse(window.localStorage.getItem("cart"))).toStrictEqual([]);
        expect(result.current[0].cart).toStrictEqual([]);
    })
})