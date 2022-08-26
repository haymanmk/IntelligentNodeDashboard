import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    saved: true,
    domain: "http://localhost",
    config: {},
  },
  reducers: {
    setDomainName: (state, action) => {
      state.domain = action.payload;
    },
    setConfig: (state, action) => {
      state.config = action.payload;
    },
    setSaved: (state, action) => {
      state.saved = action.payload;
    },
  },
});

export const storeAction = stateSlice.actions;

export default stateSlice.reducer;
