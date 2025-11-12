import clsx from "clsx";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SidebarNav {
  name: string;
  url: string;
}

const items: SidebarNav[] = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Services", url: "/services" },
  { name: "Categories", url: "/categories" },
  { name: "Contact Us", url: "/contact" },
];

const categoryOptions: SidebarNav[] = [
  { name: "Destination Highlights", url: "/destination-highlights" },
  { name: "Taste of Naija", url: "/taste-of-naija" },
  { name: "Lifestyle", url: "/lifestyle" },
  { name: "Fashion", url: "/fashion" },
  { name: "Interviews", url: "/interviews" },
  { name: "Events", url: "/events" },
  { name: "Culture", url: "/culture" },
  { name: "Original Content", url: "/original-content" },
  { name: "Travel Tips & Guides", url: "/travel-tips-guides" },
];

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubCategorySidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

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
        "bg-[#0000009e] fixed top-0 bottom-0 left-0 right-0 z-50 transition-transform transition-opacity duration-400 ease-in-out",
        isSidebarOpen
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "-translate-x-full opacity-0 pointer-events-none"
      )}
    >
      <X
        size={24}
        onClick={() => setIsSidebarOpen(false)}
        color="white"
        className="absolute top-4 right-4 z-50 cursor-pointer transition-transform duration-200 hover:scale-110"
      />
      <ul className="flex flex-col bg-white w-72 h-svh p-4 overflow-y-scroll">
        {items.map((item, index) => {
          if (item.name != "Categories") {
            return (
              <Link href={item.url} key={index}>
                <li
                  key={index}
                  className="block text-lg text-gray-700 hover:text-gray-900 hover:bg-neutral-200 font-medium py-3 pl-3 border-b border-gray-100 transition-colors"
                >
                  {item.name}
                </li>
              </Link>
            );
          } else {
            return (
              <li
                onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
                className="block text-lg cursor-pointer border-b border-gray-100 "
              >
                <div className="hover:bg-neutral-200 group">
                  <p className="inline-block py-3 pl-3 font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item.name}
                  </p>
                  {isCategoryExpanded ? (
                    <ChevronUp
                      className="inline-block ml-3"
                      height={18}
                      width={18}
                    />
                  ) : (
                    <ChevronDown
                      className="inline-block ml-3"
                      height={18}
                      width={18}
                    />
                  )}
                </div>
                {/* Display of the different category options */}

                {isCategoryExpanded && (
                  <ul>
                    {categoryOptions.map((item, index) => (
                      <Link href={item.url} key={index}>
                        <li
                          key={index}
                          className="block text-lg cursor-pointer mt-4 ml-4 text-gray-700 hover:text-gray-900 hover:bg-neutral-200 font-medium py-3 pl-3 border-b border-gray-100 transition-colors"
                        >
                          {item.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default SubCategorySidebar;
