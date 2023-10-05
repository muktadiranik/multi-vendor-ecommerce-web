import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "../slice/userRedux";
import { cartReducer } from "../slice/cartRedux";
import { shopReducer } from "../slice/shopRedux";
import { productReducer } from "../slice/productRedux";
import { filterReducer, filterProductReducer } from "../slice/filterRedux";
import { currencyReducer } from "../slice/currencyRedux";

const store = () =>
  configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
      shop: shopReducer,
      product: productReducer,
      filter: filterReducer,
      currency: currencyReducer,
      filterProducts: filterProductReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(store);
