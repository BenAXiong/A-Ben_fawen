import { Dialog } from "@headlessui/react";
import React from "react";
import { MobileHeaderProps, NavigationType } from "./types";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import logo from "../../assets/logo.png";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { navigation } from "./helper";
import Toggle from "../Toggle";
import SignIn from "./SignIn";

const MobileHeader: React.FC<MobileHeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  darkMode,
  setDarkMode,
}) => {
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-40" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link to={RoutesEnum.Home}>
            {" "}
            <img className="h-10 w-auto" src={logo} alt="BBaller Boutique" />
          </Link>
          <button
            type="button"
            className={`-m-2.5 rounded-md p-2.5 text-gray-700`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item: NavigationType) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <SignIn />
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default MobileHeader;
