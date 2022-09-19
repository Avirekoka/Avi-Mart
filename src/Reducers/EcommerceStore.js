import { GET_DATA } from "../ActionTypes/EcommerceActionTypes";
const ecommerce = (initialProductsState = [], actions) => {
    switch (actions.type) {
      case GET_DATA:
        return actions.payload;

      default:
        return initialProductsState;
    }
  };
export default ecommerce;