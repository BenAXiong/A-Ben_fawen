export type DesktopHeaderProps = {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MenuIconsProps = {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface MobileHeaderProps extends DesktopHeaderProps {
  mobileMenuOpen: boolean;
}

export type NavigationType = {
  name: string;
  href: string;
  id: number;
};

export type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
