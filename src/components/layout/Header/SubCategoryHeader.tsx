import Logo from "@/icons/logo";
import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";
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
      <Link href="/">
        <Logo />
      </Link>
      <Menu
        color="#EAB353"
        className="cursor-pointer transition-transform duration-200 hover:scale-110 "
        onClick={toggleVisibility}
      />
    </header>
  );
};

export default SubCategoryHeader;
