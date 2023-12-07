"use client";

import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useOutsideClick } from "@/lib/use-outside-click";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useState } from "react";


interface AnnotationPopoverProps {
  phrase: string;
  description: string;
}


const AnnotationPopover = ({ phrase, description }: AnnotationPopoverProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  //add handler that checks if clicks anywhere else on the page and if so, set isHighlighted to false

  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <span className="cursor-pointer" ref={ref}>
    <Popover onOpenChange={() => setIsHighlighted(!isHighlighted)} open={isOpen}>
      {isOpen ? <PopoverAnchor className="inline-block relative translate-y-2"/> : null}
      <span className="group" onClick={() => {console.log("opening"); setIsOpen(true)}}>
        <span className="">
          <span className="relative">
          <span className={`relative z-10  px-0.5 bg-red-100 ${
              isOpen ? "!bg-red-300" : ""
            }`}>{phrase}</span>
        </span>
        </span>
        </span>

      <PopoverContent><div className="bg-red-50/100 w-72 border-red-200 rounded-md border-2 p-4 ">{description}</div></PopoverContent>
    </Popover>

    </span>
  );
};

export default AnnotationPopover;