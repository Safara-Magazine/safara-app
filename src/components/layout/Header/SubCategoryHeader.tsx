import Logo from "@/icons/logo";
import clsx from "clsx";
import { Menu } from "lucide-react";
import React from "react";

interface Props {
  isOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubCategoryHeader = ({ setIsSidebarOpen, isOpen }: Props) => {
  const toggleVisibility = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <header
      className={clsx(
        "bg-transparent absolute z-50 px-16 py-4 flex items-center justify-between w-full",
        { hidden: isOpen }
      )}
    >
      <Logo />
      <Menu onClick={toggleVisibility} />
    </header>
  );
};

export default SubCategoryHeader;
