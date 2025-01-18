import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./admin-slice/index.js";
import shopProductReducer from "./shop/products-slice/index.js";
import shopCarttReducer from "./shop/cart-slice/index.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
    shopProduct: shopProductReducer,
    shopCart: shopCarttReducer,
  },
});

export default store;
