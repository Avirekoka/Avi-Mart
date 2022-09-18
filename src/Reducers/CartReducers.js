import { ADD_TO_CART, DECREAMENT_QTY, INCREAMENT_QTY, REMOVE_FROM_CART } from "../ActionTypes/CartActionType";

// const state = {
//   cartItem: [],
//   totalAmt: 0,
//   totalQty: 0
// }

export const cart = (initialCartState = [], actions) => {
    switch (actions.type) {
      case ADD_TO_CART:
        const data = [...initialCartState, actions.payload];  
        
        if(localStorage.getItem("cart_data")){

          let localstorageData = JSON.parse(localStorage.getItem("cart_data"));

          localstorageData.some(i => {
            if(i.id === actions.payload.id) i.qty += 1;
          });

          const index = localstorageData.findIndex(i => i.id === actions.payload.id);
         

          index === -1 && localstorageData.push(actions.payload);
          
          localStorage.setItem("cart_data", JSON.stringify(localstorageData));
        }else{
          localStorage.setItem("cart_data", JSON.stringify(data));
        }

        return [...initialCartState, actions.payload];

      case INCREAMENT_QTY:
        let getLocalStorageDataForIncreament = JSON.parse(localStorage.getItem("cart_data"));

        getLocalStorageDataForIncreament.some(i => {
          if(i.id === actions.payload) i.qty += 1;
        });

        localStorage.setItem("cart_data", JSON.stringify(getLocalStorageDataForIncreament));

        return getLocalStorageDataForIncreament;

      case DECREAMENT_QTY:
        let getLocalStorageDataForDecreament = JSON.parse(localStorage.getItem("cart_data"));

        getLocalStorageDataForDecreament.some(i => {
          if(i.id === actions.payload) {
            
            i.qty > 0 && i.qty--
          }
        });

        const filterdDecreamentData = getLocalStorageDataForDecreament.filter(i => i.qty !== 0);

        localStorage.setItem("cart_data", JSON.stringify(filterdDecreamentData));

        return filterdDecreamentData;

      case REMOVE_FROM_CART:

        let localstorageData = JSON.parse(localStorage.getItem("cart_data"));
        const filteredCart = localstorageData.filter(item => item.id !== actions.payload);

        localStorage.setItem("cart_data", JSON.stringify(filteredCart));
        return filteredCart;
               
      default:
        return initialCartState;
    }
  };