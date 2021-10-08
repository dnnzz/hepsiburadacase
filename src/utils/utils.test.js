import {
  filterBySearchQuery,
  filterProducts,
  sortAlphabetically,
  sortByPrice,
  getCountByProperty,
} from "./utils";
import { mockAscData, mockDescData } from "../data/mockData";
const products = [
  {
    productId: 2,
    title: "Apple iPhone 11 Yeşil",
    brand: "Apple",
    price: 1120,
    discountPercentage: 0,
    color: "Yeşil",
    createdDate: "2021-11-16T01:00:00+03:00",
  },
  {
    productId: 32,
    title: "Xiaomi Mi 9T ",
    brand: "Xiaomi",
    price: 1285,
    discountPercentage: 30,
    color: "Kırmızı",
    createdDate: "2021-12-12T01:00:00+03:00",
  },
];

describe("unit tests for sortAlphabetically", () => {
  it("sorts Products by date & descending order", () => {
    const ascendingFunc = sortAlphabetically(products, false);
    expect(ascendingFunc).toEqual(mockAscData);
  });
  it("sorts Products by date & ascending order", () => {
    const descFunc = sortAlphabetically(products, true);
    expect(descFunc).toEqual(mockDescData);
  });
});

describe("unit tests for sortByPrice", () => {
  it("sorts Products by price descending order", () => {
    const ascendingFunc = sortByPrice(products, false);
    expect(ascendingFunc).toEqual(mockDescData);
  });
  it("sorts Products by price ascending order", () => {
    const descFunc = sortByPrice(products, true);
    expect(descFunc).toEqual(mockAscData);
  });
});

describe("unit test for filterBySearchQuery", () => {
  it("sorts Products by price descending order", () => {
    const searchFunc = filterBySearchQuery(products, "apple");
    expect(searchFunc).toEqual([
      {
        productId: 2,
        title: "Apple iPhone 11 Yeşil",
        brand: "Apple",
        price: 1120,
        discountPercentage: 0,
        color: "Yeşil",
        createdDate: "2021-11-16T01:00:00+03:00",
      },
    ]);
  });
});

describe("unit test for filterProducts", () => {
  it("filters product by given parameters", () => {
    const filterProds = filterProducts(
      products,
      { color: "Yeşil", selected: true },
      { brand: "Apple", selected: true },
    );

    expect(filterProds).toEqual([
      {
        productId: 2,
        title: "Apple iPhone 11 Yeşil",
        brand: "Apple",
        price: 1120,
        discountPercentage: 0,
        color: "Yeşil",
        createdDate: "2021-11-16T01:00:00+03:00",
      },
    ]);
  });
});
