import ShoppingHeader from "@/components/shopping-view/header";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ShoppingLayout = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader open={openDialog} setOpen={setOpenDialog} />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
