import Address from "@/components/shopping-view/address";
import Img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartitems } = useSelector((state) => state.shopCart);

  const totalCartAmount =
    cartitems && cartitems?.items && cartitems?.items.length > 0
      ? cartitems?.items.reduce(
          (sum, currentitem) =>
            sum +
            (currentitem?.salePrice > 0
              ? currentitem?.salePrice
              : currentitem?.price) *
              currentitem?.quantity,
          0
        )
      : 0;
  console.log(cartitems.items, "cartitems");
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={Img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid gird-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 ">
        <Address />
        <div className="flex flex-col gap-4">
          {cartitems && cartitems.items && cartitems.items.length > 0 ? (
            cartitems?.items.map((item) => (
              <UserCartContent key={item.id} cartItems={item} />
            ))
          ) : (
            <h1>No items in cart</h1>
          )}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full text-2xl">
            <Button className="w-full hover:bg-black hover:text-white">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
