import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { DialogTitle } from "@radix-ui/react-dialog";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartitems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    console.log(getCurrentProductId, getTotalStock, "getcurrentproductid");
    let getCartItems = cartitems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));

        toast({
          title: "Product is added to cart",
        });
      }
    });
  };

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="gird grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] sm:max-w-[70vw] bg-white">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              $
              {productDetails?.price < productDetails?.salePrice
                ? productDetails?.price
                : productDetails?.salePrice}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-3xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill primary" />
              <StarIcon className="w-5 h-5 fill primary" />
              <StarIcon className="w-5 h-5 fill primary" />
              <StarIcon className="w-5 h-5 fill primary" />
              <StarIcon className="w-5 h-5 fill primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button
                className="w-full  bg-black text-white text-md hover:text-black opacity-60 cursor-not-allowed"
                disabled
              >
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-full bg-black text-white text-md hover:text-black"
              >
                Add to Cart
              </Button>
            )}
          </div>{" "}
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h1 className="texl-xl font-bold mb-4">Reviews</h1>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="w-10 h-10 border">
                    AT
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Alija Tamang</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome Product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="w-10 h-10 border">
                    AT
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Alija Tamang</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome Product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="w-10 h-10 border">
                    AT
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Alija Tamang</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                    <StarIcon className="w-5 h-5 fill primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome Product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="write a review ....." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
