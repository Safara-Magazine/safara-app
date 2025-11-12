import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect } from "react";

const items = [
  "Home",
  "About",
  "Services",
  "Contact Us",
  "Destination Highlights",
  "Taste of Naija",
  "Lifestyle",
  "Fashion",
  "Interviews",
  "Events",
  "Culture",
  "Original Content",
  "Travel Tips & Guides",
];

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubCategorySidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSidebarOpen]);
  return (
    <nav
      className={clsx(
        `bg-[#0000009e] fixed top-0 bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`,
        { hidden: !isSidebarOpen }
      )}
    >
      <X
        size={24}
        onClick={() => setIsSidebarOpen(false)}
        color="white"
        className="absolute top-4 right-4 z-50 cursor-pointer transition-transform duration-200 hover:scale-110"
      />
      <ul className="flex flex-col bg-white w-72 h-svh p-4">

        
        {items.map((item, index) => (
          <li
            key={index}
            className="block text-lg cursor-pointer overflow-auto text-gray-700 hover:text-gray-900 hover:bg-neutral-200 font-medium py-3 border-b border-gray-100 transition-colors"
          >
            {item}
          </li>
        ))}


        
      </ul>
    </nav>
  );
};

export default SubCategorySidebar;
