import React from "react";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItemQty } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleItemsCartDelete = (getCartItems) => {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItems?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart items is deleted successfully",
        });
      }
    });
  };

  const handleupdateQuantity = (getCartItems, typeofAction) => {
    dispatch(
      updateCartItemQty({
        userId: user?.id,
        productId: getCartItems?.productId,
        quantity:
          typeofAction === "plus"
            ? getCartItems?.quantity + 1
            : getCartItems?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart items is updated successfully",
        });
      }
    });
  };
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            onClick={() => handleupdateQuantity(cartItems, "minus")}
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItems?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            onClick={() => handleupdateQuantity(cartItems, "plus")}
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Plus</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleItemsCartDelete(cartItems)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartContent;
