// The component contains the line that divides the various sections
// Can be customised by setting alignment to left; when we want the text to the left and same goes for the right

import clsx from "clsx";
import React from "react";

interface Props {
  title: string;
  alignment?: "left" | "right";
}

const DividerLine = ({ title, alignment = "left" }: Props) => {
  return (
    <div className="flex gap-8 items-end py-12 px-4 md:px-6 lg:px-8">
      <p
        className={clsx(
          "inline-block bg-linear-to-b from-[#B59157] to-[#EBB659] bg-clip-text text-transparent text-4xl",
          { "order-1": alignment == "right" }
        )}
      >
        {title.toUpperCase()}
      </p>
      <div
        className="bg-black inline-block grow h-0.5 w-0.5 bg-linear-to-b from-[#B59157] to-[#EBB659]
"
      ></div>
    </div>
  );
};

export default DividerLine;
