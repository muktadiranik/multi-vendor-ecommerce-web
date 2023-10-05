import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cart: {} }, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case RESET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
