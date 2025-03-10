import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./admin-slice/index.js";
import adminOrderReducer from "./admin-order-slice/index.js";
import shopProductReducer from "./shop/products-slice/index.js";
import shopCarttReducer from "./shop/cart-slice/index.js";
import shopAddressReducer from "./shop/address-slice/index.js";
import shopOrderReducer from "./shop/order-slice/index.js";
import shopSearchReducer from "./shop/search-slice/index.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer,
    shopProduct: shopProductReducer,
    shopCart: shopCarttReducer,
    shopAddress: shopAddressReducer,
    shopOrder: shopOrderReducer,
    shopSearch: shopSearchReducer,
  },
});

export default store;
