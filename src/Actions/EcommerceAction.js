import * as api from "../Services/EcommerceServices";
import { GET_DATA } from "../ActionTypes/EcommerceActionTypes";
import { toast } from "react-toastify";

export const getEcommerceData = () => async (dispatch) => {
  try {
    const { data } = await api.getEcommerceData();
    dispatch({ type: GET_DATA, payload: data });
  } catch (error) {
    toast.error("Error while fetching products");
  }
};



