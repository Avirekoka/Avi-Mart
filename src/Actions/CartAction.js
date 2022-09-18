import {ADD_TO_CART, DECREAMENT_QTY, INCREAMENT_QTY, REMOVE_FROM_CART} from "../ActionTypes/CartActionType";
import * as api from "../Services/CartService";

export const addToCart = (itemId) => async (dispatch) => {
    try {
      const {data}  = await api.getSingleProduct(itemId);

      data.qty = 1;
      dispatch({ type: ADD_TO_CART, payload: data });

    } catch (error) {
      console.log(error)
    }
  };

export const removeFromCart = (itemId) => async (dispatch) => {
  try {
    
    dispatch({ type: REMOVE_FROM_CART, payload: itemId });

  } catch (error) {
    console.log(error)
  }
};

export const increamentQuantity = (itemId) => async (dispatch) => {
  try {
    
    dispatch({ type: INCREAMENT_QTY, payload: itemId });

  } catch (error) {
    console.log(error)
  }
};

export const decreamentQuantity = (itemId) => async (dispatch) => {
  try {
    
    dispatch({ type: DECREAMENT_QTY, payload: itemId });

  } catch (error) {
    console.log(error)
  }
};


  