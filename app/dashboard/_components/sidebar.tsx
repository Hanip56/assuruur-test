import MainNav from "./main-nav";
import { CloudFog } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-full">
      {/* logo */}
      <div className="h-14 flex px-6 items-center text-lg font-semibold border-b">
        <CloudFog className="w-5 h-5 mr-2" />
        <span>Assuruur Admin</span>
      </div>
      {/* main-nav */}
      <MainNav />
    </div>
  );
};

export default Sidebar;
