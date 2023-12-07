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
      {isOpen ? <PopoverAnchor className="inline relative translate-y-1"/> : null}
      <span className="group" onClick={() => {console.log("opening"); setIsOpen(true)}}>
        <span className="">
          <span className="relative">
          <span className={`relative z-10  px-0.5 bg-amber-100/60 hover:bg-yellow-200 dark:hover:bg-indigo-500 dark:bg-indigo-800  ${
              isOpen ? "!bg-yellow-200 dark:!bg-indigo-500" : ""
            }`}>{phrase}</span>
        </span>
        </span>
        </span>

      <PopoverContent align="start"><div className="bg-[#FFFEF9] w-72 border border-amber-100 dark:border-indigo-900 dark:bg-zinc-900 dark:text-white rounded-md p-4 ">{description}</div></PopoverContent>
    </Popover>

    </span>
  );
};

export default AnnotationPopover;