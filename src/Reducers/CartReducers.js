import { ADD_TO_CART, DECREAMENT_QTY, INCREAMENT_QTY, REMOVE_FROM_CART } from "../ActionTypes/CartActionType";

const state = {
  cartItem: [],
  totalAmt: 0,
  totalQty: 0
}

export const cart = (initialCartState = [], actions) => {
    switch (actions.type) {
      case ADD_TO_CART:

        state.cartItem.push({...actions.payload});

        state.totalAmt +=actions.payload.price;

        state.totalQty = state.cartItem.length;
        
        if(localStorage.getItem("cart_data")){

          let localstorageData = JSON.parse(localStorage.getItem("cart_data"));

          localstorageData.totalQty += 1;
          localstorageData.totalAmt += actions.payload.price;
          
          localstorageData.cartItem.some(i => {
            if(i.id === actions.payload.id) i.qty += 1;
          });

          const index = localstorageData.cartItem.findIndex(i => i.id === actions.payload.id);
         
          index === -1 && localstorageData.cartItem.push(actions.payload);
          
          localStorage.setItem("cart_data", JSON.stringify(localstorageData));
        }else{
          localStorage.setItem("cart_data", JSON.stringify(state));
        }

        return [...initialCartState, actions.payload];

      case INCREAMENT_QTY:
        let getLocalStorageDataForIncreament = JSON.parse(localStorage.getItem("cart_data"));

        getLocalStorageDataForIncreament.cartItem.some(i => {
          if(i.id === actions.payload) {
            i.qty += 1;
          }
        });

        getLocalStorageDataForIncreament.totalQty = getLocalStorageDataForIncreament.cartItem.reduce((sum,{qty}) => sum + qty, 0);
        getLocalStorageDataForIncreament.totalAmt += getLocalStorageDataForIncreament.cartItem.find(item => item.id === actions.payload).price;

        localStorage.setItem("cart_data", JSON.stringify(getLocalStorageDataForIncreament));

        return getLocalStorageDataForIncreament;

      case DECREAMENT_QTY:
        let getLocalStorageDataForDecreament = JSON.parse(localStorage.getItem("cart_data"));

        getLocalStorageDataForDecreament.cartItem.some(i => {
          if(i.id === actions.payload) {
            
            i.qty > 0 && i.qty--
          }
        });

        const filterdDecreamentData = getLocalStorageDataForDecreament.cartItem.filter(i => i.qty !== 0);

        
        getLocalStorageDataForDecreament.totalQty -= 1;
        getLocalStorageDataForDecreament.totalAmt -= getLocalStorageDataForDecreament.cartItem.find(item => item.id === actions.payload).price;
        getLocalStorageDataForDecreament.cartItem = filterdDecreamentData;

        localStorage.setItem("cart_data", JSON.stringify(getLocalStorageDataForDecreament));

        return getLocalStorageDataForDecreament;

      case REMOVE_FROM_CART:

        let localstorageData = JSON.parse(localStorage.getItem("cart_data"));
        const filteredCart = localstorageData.cartItem.filter(item => item.id !== actions.payload);

        
        localstorageData.totalQty -= localstorageData.cartItem.find(item => item.id === actions.payload).qty;
        localstorageData.totalAmt -= localstorageData.cartItem.find(item => item.id === actions.payload).price * localstorageData.cartItem.find(item => item.id === actions.payload).qty;
        localstorageData.cartItem = filteredCart;

        localStorage.setItem("cart_data", JSON.stringify(localstorageData));
        return filteredCart;
               
      default:
        return initialCartState;
    }
  };