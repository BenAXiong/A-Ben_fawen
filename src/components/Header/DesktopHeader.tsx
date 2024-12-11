import React from "react";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import logo from "../../assets/SiteLogo_A-Ben.png";
import { DesktopHeaderProps, NavigationType } from "./types";
import MenuIcon from "./MenuIcon";
import { navigation } from "./helper";
import Toggle from "../Toggle";
import SignIn from "./SignIn";

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  setMobileMenuOpen,
  darkMode,
  setDarkMode,
}) => {
  return (
    <nav
      className="flex items-center justify-between p-6 lg:p-8"
      aria-label="Global"
    >
      {/* logo */}
      <div className="flex lg:flex-1">
        <Link to={RoutesEnum.Home}>
          {" "}
          <img className="h-10 w-auto" src={logo} alt="BBaller Boutique" />
        </Link>
      </div>
      <MenuIcon setMobileMenuOpen={setMobileMenuOpen} />
      {/* pages */}
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item: NavigationType) => (
          <a
            key={item.name}
            href={item.href}
            className="text-sm font-semibold leading-6"
          >
            {item.name}
          </a>
        ))}
      </div>
      {/* login */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <SignIn />
      </div>
    </nav>
  );
};

export default DesktopHeader;
