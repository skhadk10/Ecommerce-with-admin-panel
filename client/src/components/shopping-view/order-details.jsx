import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";

const initailsFormData = {
  status: "",
};
const ShoppingOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(initailsFormData);
  const handleUpdateStatus = (event) => {
    event.preventDefault();
  };
  return (
    <DialogContent className="sm:max-w-[600px] bg-white">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-center">
            <p className="font-medium mr-1 mb-1">Order ID:</p>
            <Label> {123456}</Label>
          </div>
          <div className="flex mt-2 items-center justify-center">
            <p className="font-medium  mr-1 mb-1">Order Date: </p>
            <Label className="">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-center">
            <p className="font-medium  mr-1 mb-1">Order Price:</p>
            <Label>{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-center ">
            <p className="font-medium  mr-1 mb-1">Payment Method:</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-center ">
            <p className="font-medium  mr-1 mb-1">Payment Status:</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-center ">
            <p className="font-medium  mr-1 mb-1">Order Status:</p>
            <Label>
          
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-500"
                    : "bg-black-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetails;
