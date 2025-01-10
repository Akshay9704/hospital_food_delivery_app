"use client";

import PantrySideBar from "./sidebar";
import PantryHeader from "./header";
import { useState } from "react";

interface PantryLayoutProps {
  children: React.ReactNode;
}

function PantryLayout({ children }: PantryLayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* pantry sidebar */}
      <PantrySideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* pantry header */}
        <PantryHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default PantryLayout;
