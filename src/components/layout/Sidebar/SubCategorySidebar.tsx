import clsx from "clsx";
import { X } from "lucide-react";

const items = [
  "HOME",
  "ABOUT",
  "SERVICES",
  "CONTACT US",
  "DESTINATION HIGHLIGHTS",
  "TASTE OF NAIJA",
  "LIFESTYLE",
  "FASHION",
  "INTERVIEWS",
  "EVENTS",
  "CULTURE",
  "ORIGINAL CONTENT",
  "TRAVEL TIPS & GUIDES",
];

interface Props {
  isOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubCategorySidebar = ({ isOpen, setIsSidebarOpen }: Props) => {
  return (
    <nav
      className={clsx(
        "bg-[#0000009e] fixed top-0 bottom-0 left-0 right-0 z-50",
        { hidden: !isOpen }
      )}
    >
      <X
        size={32}
        onClick={() => setIsSidebarOpen(false)}
        color="white"
        className="absolute top-4 right-4 z-50"
      />
      <ul className="flex flex-col bg-white max-w-[20%] h-svh p-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="border-b border-[#f0f0f0] py-2.5 cursor-pointer font-medium text-xs uppercase hover:bg-neutral-100"
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubCategorySidebar;
