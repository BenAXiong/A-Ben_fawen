import { Bars3Icon } from "@heroicons/react/16/solid";
import React from "react";
import { MenuIconsProps } from "./types";

const MenuIcon: React.FC<MenuIconsProps> = ({ setMobileMenuOpen }) => {
  return (
    <div className="flex lg:hidden">
      <button
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className={`h-6 w-6`} aria-hidden="true" />
      </button>
    </div>
  );
};

export default MenuIcon;
