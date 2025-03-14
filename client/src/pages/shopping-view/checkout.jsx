import Address from "@/components/shopping-view/address";
import Img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";

const ShoppingCheckout = () => {
  const { cartitems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleInitialPaypalPayment = () => {
    if (cartitems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        varient: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed",
        varient: "destructive",
      });
      return;
    }
    const orderData = {
      userId: user?.id,
      cartId: cartitems?._id,
      cartItems: cartitems.items.map((singlCartItem) => ({
        productId: singlCartItem?.productId,
        title: singlCartItem?.title,
        image: singlCartItem?.image,
        salePrice:
          singlCartItem?.salePrice > 0
            ? singlCartItem?.salePrice
            : singlCartItem?.price,
        quantity: singlCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    dispatch(CreateNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
        setCurrentSelectedAddress(null);
      } else {
        setIsPaymentStart(false);
      }
    });
  };
  if (approvalURL) {
    window.location.href = approvalURL;
  }

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

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={Img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid gird-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 ">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartitems && cartitems.items && cartitems.items.length > 0 ? (
            cartitems?.items.map((item) => (
              <UserCartContent key={item.productId} cartItems={item} />
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
            <Button
              onClick={handleInitialPaypalPayment}
              className="w-full hover:bg-black hover:text-white"
            >
              {isPaymentStart ? "Processing payment..." : " Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
