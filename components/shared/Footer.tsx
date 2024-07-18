import Link from "next/link";
import React from "react";
import Logo from "../custom/Logo";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href={"/"}>
          <Logo />
        </Link>
        <p>2023 Golden Lotus. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
