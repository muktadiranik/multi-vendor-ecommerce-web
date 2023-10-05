import { ADD_PRODUCT } from "../constants/shopConstants";
import {
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const productReducer = (
  state = { product: {}, updateProduct: {} },
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product: {},
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProduct: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updateProductSuccess: action.payload,
      };
    default:
      return state;
  }
};
