import * as api from "../Services/EcommerceServices";
import { GET_DATA, SEARCH } from "../ActionTypes/EcommerceActionTypes";
import { toast } from "react-toastify";

export const getEcommerceData = () => async (dispatch) => {
  try {
    const { data } = await api.getEcommerceData();
    dispatch({ type: GET_DATA, payload: data });
  } catch (error) {
    toast.error("Error while fetching products");
  }
};

export const searchResult = (searchValue) => async (dispatch) => {
  try {
    
    dispatch({ type: SEARCH, payload: searchValue });
  } catch (error) {
    toast.error("Error while searching products");
  }
};

