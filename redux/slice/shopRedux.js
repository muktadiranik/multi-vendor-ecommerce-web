import { GET_SHOP, CLEAR_SHOP, UPDATE_SHOP } from "../constants/shopConstants";

export const shopReducer = (state = { shop: {} }, action) => {
  switch (action.type) {
    case GET_SHOP:
      return {
        ...state,
        shop: action.payload,
      };
    case CLEAR_SHOP:
      return {
        ...state,
        shop: {},
      };
    case UPDATE_SHOP:
      return {
        ...state,
        updatedShop: action.payload,
      };
    default:
      return state;
  }
};
