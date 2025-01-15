import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <div className="mt-5 mb-5">
            <Button className="w-full bg-black text-white text-md hover:text-black">Add to Cart</Button>
          </div>
        </div>
        <Separator />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
