import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
  return (
    <SheetContent className="sm:max-w-md bg-white">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems?.map((item) => (
              <UserCartContent key={item.id} cartItems={item} />
            ))
          : null}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">$1000</span>
        </div>
      </div>
      <Button className="w-full mt-6 bg-black text-white">CheckOut</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
