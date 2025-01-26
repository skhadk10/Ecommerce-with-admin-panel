import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";

const AdminOrderDetailsView = () => {
  return (
    <DialogContent className="sm:max-w-[600px] bg-white">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-center">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-2 items-center justify-center">
            <p className="font-medium">Order Date</p>
            <Label>27/06/1997</Label>
          </div>
          <div className="flex mt-2 items-center justify-center">
            <p className="font-medium">Order Status</p>
            <Label>In Procress</Label>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
