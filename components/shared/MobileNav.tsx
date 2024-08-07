import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import Logo from "../custom/Logo";

const MobileNav = ({ isScroll }: { isScroll: number }) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src={"/assets/icons/menu.svg"}
            alt="menu"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Logo />
          <Separator className="border border-gray-100" />
          <NavItems isScroll={isScroll} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
