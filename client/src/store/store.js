import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./admin-slice/index.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
  },
});

export default store;
