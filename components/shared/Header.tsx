"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Logo from "../custom/Logo";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScroll, setIsScroll] = useState<number>(0);

  useEffect(() => {
    let lastScrollY = scrollY;
    const handleScroll = () => {
      let direction = lastScrollY < scrollY ? "down" : "up";
      lastScrollY = scrollY;
      direction === "down" && scrollY > 10 && setIsScroll(1);
      direction === "up" && scrollY > 1 && setIsScroll(2);
      direction === "up" && scrollY <= 10 && setIsScroll(0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-50 w-full bg-transparent fixed duration-300",
        isScroll === 0 && "bg-transparent translate-y-[0%]",
        isScroll === 1 && "-translate-y-[100%] shadow-md bg-white",
        isScroll === 2 && "bg-white shadow-md translate-y-[0%]"
      )}
    >
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-38">
          <Logo />
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems isScroll={isScroll} />
        </nav>

        <div className="flex w-32 justify-end gap-3">
          <MobileNav isScroll={isScroll} />
        </div>

        {/* <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-lg" size="lg">
              <Link href={"/sign-in"}>Đăng nhập</Link>
            </Button>
          </SignedOut>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
