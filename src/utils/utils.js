/* eslint-disable array-callback-return */

// Gets count of specific property in productList that comes from context
export const getCountByProperty = (products, property) => {
  return products
    .map((product) => product[property])
    .reduce(function (acc, curr) {
      // IDK WHY it gives this warning :(
      // eslint-disable-next-line no-sequences
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});
};

// Date parser
export const parseDate = (date) => {
  return Date.parse(date);
};

export const sortByPrice = (productList, isAsc) => {
  if (isAsc) {
    return productList.sort(
      (a, b) =>
        parseFloat(a.price - (a.price * a.discountPercentage) / 100) -
        parseFloat(b.price - (b.price * b.discountPercentage) / 100),
    );
  } else {
    return productList.sort(
      (a, b) =>
        parseFloat(b.price - (b.price * b.discountPercentage) / 100) -
        parseFloat(a.price - (a.price * a.discountPercentage) / 100),
    );
  }
};

// Alphabetic sorter , firstly sort created date then if user selects (A>Z) sorts array
// if user selects (Z>A) reverses array.
export const sortAlphabetically = (productList, isAsc) => {
  if (isAsc) {
    return productList.sort(
      (a, b) =>
        new Date(parseDate(a.createdDate)) - new Date(parseDate(b.createdDate)) &&
        (a["title"].toLowerCase() < b["title"].toLowerCase() ? -1 : 1),
    );
  } else {
    return productList
      .sort(
        (a, b) =>
          new Date(parseDate(a.createdDate)) - new Date(parseDate(b.createdDate)) &&
          (a["title"] < b["title"] ? -1 : 1),
      )
      .reverse();
  }
};

/* 
  ---------------------------
  My product model has 2 property for byColor and byBrand -> 
  one for get selected filter value ex:  byColor{color:"Mavi",selected:true}
  selected property acting like check flag and when this prop is true include byColor in filter 
  Same goes for byBrand prop 

  and

  I need multiple if conditions for check every filter condition ...  looks ugly but thats all i got :/
  ---------------------------
  */
export const filterProducts = (products, byColor, byBrand) => {
  let tempFilteredProducts = [];

  tempFilteredProducts = products.filter((product) => {
    if (byBrand.selected === true && byColor.selected === false) {
      return product.brand === byBrand.brand;
    }
    if (byColor.selected === true && byBrand.selected === false) {
      return product.color === byColor.color;
    }
    if (byColor.selected === true && byColor.selected === true) {
      return product.color === byColor.color && product.brand === byBrand.brand;
    }
  });

  return tempFilteredProducts;
};

export const filterBySearchQuery = (products, query) => {
  return products.filter((product) => product.title.toLowerCase().includes(query));
};
