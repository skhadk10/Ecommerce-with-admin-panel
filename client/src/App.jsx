import { Route, Routes } from "react-router-dom";
import Authlayout from "./component/auth/layout.jsx"; // Adjust path if needed
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminDashboard from "./pages/admin-view/dashboard.jsx";
import AdminProducts from "./pages/admin-view/product.jsx";
import AdminOrders from "./pages/admin-view/order.jsx";
import AdminFeatures from "./pages/admin-view/features.jsx";
import AdminLayout from "./component/admin-view/layout.jsx";
import ShoppingLayout from "./component/shopping-view/layout.jsx";
import NotFound from "./pages/not-found/index.jsx";
import ShoppingHome from "./pages/shopping-view/home.jsx";
import ShoppingListing from "./pages/shopping-view/listing.jsx";
import ShoppingCheckout from "./pages/shopping-view/checkout.jsx";
import ShoppingAccount from "./pages/shopping-view/account.jsx";
import CheckAuth from "./component/common/check-auth.jsx";
import UnauthPage from "./pages/unauth-page/index.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/index.js";

import { Skeleton } from "@/components/ui/skeleton"


function App() {
  const { user, isAuthenticated ,isLoading} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if(isLoading) return <Skeleton className="w-[600px] h-[600px] rounded-full" />


  console.log(isLoading,user);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Authlayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
