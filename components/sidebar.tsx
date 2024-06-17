import Image from "next/image";
import SidebarRoutes from "./sidebar-route";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-md">
      <div className="p-6 flex">
        <Image
          src="/e-type.png"
          alt="e-type.png"
          width={100}
          height={50}
        />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}

export default Sidebar;