import React, { useState } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentitem) =>
            sum +
            (currentitem?.salePrice > 0
              ? currentitem?.salePrice
              : currentitem?.price) *
              currentitem?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md bg-white">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems?.map((item) => (
              <UserCartContent key={item.productId} cartItems={item} />
            ))
          : null}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      {/* {totalCartAmount !== 0 ? ( */}
        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full mt-6 bg-black text-white"
        >
          CheckOut
        </Button>
      {/* ) : (
        <Button
          onClick={() => {
            navigate("/shop/listing");
            setOpenCartSheet(false);
          }}
          className="w-full mt-6 bg-black text-white"
        >
          Go to Shopping
        </Button>
      )} */}
    </SheetContent>
  );
};

export default UserCartWrapper;
