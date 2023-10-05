import {
  UPDATE_FILTER_FIELDS,
  CLEAR_FILTER_FIELDS,
} from "../constants/filterConstants";
import {
  SET_FILTER_PRODUCTS,
  CLEAR_FILTER_PRODUCTS,
} from "../constants/filterProductConstants";

export const filterReducer = (
  state = {
    filterFields: {
      searchLocation: "",
      dateOfTravel: "",
      productTypeId: "",
      productRateTypeId: "",
      riders: 0,
    },
  },
  action
) => {
  switch (action.type) {
    case UPDATE_FILTER_FIELDS:
      return {
        ...state,
        filterFields: {
          ...state.filterFields,
          [action.payload.field]: action.payload.value,
        },
      };
    case CLEAR_FILTER_FIELDS:
      return {
        ...state,
        filterFields: {
          searchLocation: "",
          dateOfTravel: "",
          productTypeId: "",
          productRateTypeId: "",
          riders: 0,
        },
      };
    default:
      return state;
  }
};
export const filterProductReducer = (
  state = {
    filterProducts: [],
  },
  action
) => {
  switch (action.type) {
    case SET_FILTER_PRODUCTS:
      return {
        ...state,
        filterProducts: action.payload,
      };
    case CLEAR_FILTER_PRODUCTS:
      return {
        ...state,
        filterProducts: [],
      };
    default:
      return state;
  }
};
