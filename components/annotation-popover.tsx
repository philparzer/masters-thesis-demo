"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface AnnotationPopoverProps {
  phrase: string;
  description: string;
}

const AnnotationPopover = ({ phrase, description }: AnnotationPopoverProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  //add handler that checks if clicks anywhere else on the page and if so, set isHighlighted to false

  return (
    <Popover onOpenChange={() => setIsHighlighted(!isHighlighted)}>
      <PopoverTrigger className="group" title={"click to view description"} >
        <span className="relative">
          <span
            className={`bg-red-100 group-hover:bg-red-200 absolute top-0 left-0 w-full h-[94%] translate-y-[3%]  ${
              isHighlighted ? "!bg-red-200" : ""
            }`}
          ></span>
           <span
            className={`bg-red-200 group-hover:bg-red-600 absolute top-0 left-0 w-0.5  h-[94%] translate-y-[3%]  ${
              isHighlighted ? "!bg-red-600" : ""
            }`}
          ></span>
          <span
            className={`bg-red-200  group-hover:bg-red-600 absolute top-0 right-0 w-0.5 h-[94%] translate-y-[3%]  ${
              isHighlighted ? "!bg-red-600" : ""
            }`}
          ></span>
          <span className="relative z-10  px-0.5">{phrase}</span>
        </span>
      </PopoverTrigger>
      <PopoverContent><div>{description}</div></PopoverContent>
    </Popover>
  );
};

export default AnnotationPopover;
