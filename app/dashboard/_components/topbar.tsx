"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import MobileSidebar from "./mobile-sidebar";
import { ModeToggle } from "./toggle-mode";

const Topbar = () => {
  return (
    <div className="fixed z-10 top-0 right-0 w-[100%] md:w-[calc(100%-15rem)] h-14 flex items-center justify-between border-b px-4 bg-white dark:bg-black">
      <MobileSidebar />
      <div className="ml-auto flex items-center gap-4">
        {/* <ModeToggle /> */}
        <Button variant="outline" onClick={() => signOut()}>
          <LogOutIcon className="w-4 h-4 mr-2" /> <span>Log out</span>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
