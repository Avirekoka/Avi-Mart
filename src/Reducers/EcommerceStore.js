import { GET_DATA, SEARCH, PAGE_DATA } from "../ActionTypes/EcommerceActionTypes";

const state = {
  products: [],
  totalProducts : 0
}
const ecommerce = (initialProductsState = [], actions) => {
    switch (actions.type) {
      case GET_DATA:
      
        state.products = actions.payload;
        state.totalProducts = actions.payload.length;
        localStorage.setItem("all_products", JSON.stringify(state));

        return state;
      
      case PAGE_DATA:
        let localStorageAllProductsForPageData = JSON.parse(localStorage.getItem("all_products"));
        state.products = localStorageAllProductsForPageData.products.slice(actions.payload.lowerInd,actions.payload.higherInd);
        state.totalProducts = localStorageAllProductsForPageData.totalProducts;
        return state;
      
        case SEARCH:

          let localStorageAllProducts = JSON.parse(localStorage.getItem("all_products"));
          let low = 5 * (actions.payload.currPage  - 1);
          let high = 5 * (actions.payload.currPage);
          console.log(actions.payload)
          const getProductsBetweenRange = localStorageAllProducts.products.slice(low, high);
          const filteredProducts = getProductsBetweenRange.filter(product => {
            return product.title.toLowerCase().includes(actions.payload.txt);
          });
          
          state.products = filteredProducts
          state.totalProducts = localStorageAllProducts.totalProducts
        return state;

      default:
        return initialProductsState;
    }
  };
export default ecommerce;