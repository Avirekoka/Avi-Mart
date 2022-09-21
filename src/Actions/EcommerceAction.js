import * as api from "../Services/EcommerceServices";
import { GET_DATA, PAGE_DATA, SEARCH } from "../ActionTypes/EcommerceActionTypes";
import { toast } from "react-toastify";

export const getEcommerceData = () => async (dispatch) => {
  try {
    const { data } = await api.getEcommerceData();
    dispatch({ type: GET_DATA, payload: data });
  } catch (error) {
    toast.error("Error while fetching products");
  }
};

export const searchResult = (searchValue) => {
  try {
    console.log(searchValue)
    return({ type: SEARCH, payload: searchValue });
  } catch (error) {
    toast.error("Error while searching products");
  }
};

export const handlePageData = (lowerInd, higherInd) => {
  try {

    return({ type: PAGE_DATA, payload: {lowerInd: lowerInd, higherInd: higherInd} });
  } catch (error) {
    toast.error("Error while searching products");
  }
};



