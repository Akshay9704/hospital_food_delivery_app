import { Accessibility, ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// Typing the prop for MenuItems
interface MenuItemsProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuItems({ setOpen }: MenuItemsProps) {
  return (
    <nav className="mt-8 flex-col flex gap-2">
      <div
        onClick={() => setOpen(false)} // Simplified the expression
        className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Accessibility />
        <span>Patients</span>
      </div>
    </nav>
  );
}

// Typing the prop for PantrySideBar
interface PantrySideBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PantrySideBar({ open, setOpen }: PantrySideBarProps) {
  const router = useRouter();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Pantry Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => router.push("/seller/products")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Pantry Panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default PantrySideBar;
