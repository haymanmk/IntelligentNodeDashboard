import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./state-slice";

export default configureStore({
  reducer: {
    state: stateReducer,
  },
});
