import { GET_DATA, SEARCH } from "../ActionTypes/EcommerceActionTypes";
const ecommerce = (initialProductsState = [], actions) => {
    switch (actions.type) {
      case GET_DATA:

        localStorage.setItem("all_products", JSON.stringify(actions.payload));
        return actions.payload;
      
      case SEARCH:

        const localStorageAllProducts = JSON.parse(localStorage.getItem("all_products"));
        const filteredProducts = localStorageAllProducts.filter(product => {
          return product.title.toLowerCase().includes(actions.payload);
        });

        return filteredProducts;

      default:
        return initialProductsState;
    }
  };
export default ecommerce;