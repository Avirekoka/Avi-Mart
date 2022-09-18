import { GET_DATA, SEARCH } from "../ActionTypes/EcommerceActionTypes";
const ecommerce = (initialProductsState = [], actions) => {
    switch (actions.type) {
      case GET_DATA:
        return actions.payload;

      case SEARCH:
        const filteredProducts = initialProductsState.filter(product => {
          return product.title.toLowerCase().includes(actions.payload);
        });

        return filteredProducts;
         
      default:
        return initialProductsState;
    }
  };
export default ecommerce;