import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "../config";

function MenuItems() {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flez gap-2 rounded-md px-3 py-2">
      {adminSidebarMenuItems.map((menuItems) => {
        <div
          key={menuItems.id}
          onClick={() => navigate(menuItems.path)}
          className="flex items-center"
        >
          {menuItems.Icon}
          <span> {menuItems.label}</span>
        </div>;
      })}
    </nav>
  );
}
const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin panel</h1>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
