import { Menu } from "lucide-react";
import React from "react";

interface Props {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubCategoryHeader = ({ setIsSidebarOpen }: Props) => {
  const toggleVisibility = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <header className="bg-transparent fixed z-50 px-16">
      <Menu onClick={toggleVisibility} />
    </header>
  );
};

export default SubCategoryHeader;
