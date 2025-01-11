import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./admin-slice/index.js";
import shopProductReducer from "./shop/index.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
    shopProduct: shopProductReducer,
  },
});

export default store;
