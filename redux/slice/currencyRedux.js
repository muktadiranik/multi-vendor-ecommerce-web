import {
  SET_CURRENCY,
  SET_CURRENCY_SYMBOL,
  GET_CURRENCIES,
} from "../constants/currencyConstants";

export const currencyReducer = (state = { currency: null }, action) => {
  switch (action.type) {
    case SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case SET_CURRENCY_SYMBOL:
      return {
        ...state,
        currencySymbol: action.payload,
      };
    case GET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };
    default:
      return state;
  }
};
