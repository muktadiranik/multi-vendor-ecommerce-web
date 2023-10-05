import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    isFatching: false,
    error: false,
  },
  reducers: {
    userStart: (state) => {
      state.isFatching = true;
    },
    userSuccess: (state, action) => {
      state.isFatching = false;
      state.userId = action.payload;
      state.error = false;
    },
    userFailure: (state, action) => {
      state.isFatching = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { userStart, userSuccess, userFailure } = userSlice.actions;
export default userSlice.reducer;
