import { Button } from "@/components/ui/button";
import { AlignJustify, LogOut } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 background border-b">
      <Button className="lg:hidden sm-block">
        <AlignJustify />
        <span className="sr-only">Toogle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
