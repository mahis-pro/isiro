import React from "react";
import SidebarNavigation from "./sidebar-navigation";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <SidebarNavigation />
    </aside>
  );
}