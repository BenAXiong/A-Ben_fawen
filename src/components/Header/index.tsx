import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { HeaderProps } from "./types";

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return (
    <header>
      <DesktopHeader
        setMobileMenuOpen={setMobileMenuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </header>
  );
};

export default Header;
