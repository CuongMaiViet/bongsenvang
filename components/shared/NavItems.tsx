"use client";

import { headerLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = ({ isScroll }: { isScroll: number }) => {
  const pathname = usePathname();

  return (
    <ul className="flex w-full flex-col items-start gap-10 md:flex-row md:flex-between">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={cn(
              "relative border-b-after flex-center text-black md:text-black p-medium-18 whitespace-nowrap",
              pathname === "/" && "md:text-white",
              isScroll !== 0 && "md:text-black",
              isActive && "p-semibold-18"
            )}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
