"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOutsideClick } from "@/lib/use-outside-click";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useState } from "react";
import { set } from "zod";

interface AnnotationPopoverProps {
  phrase: string;
  description: string;
}

// const AnnotationPopover = ({ phrase, description }: AnnotationPopoverProps) => {
//   const [isHighlighted, setIsHighlighted] = useState(false);

//   //add handler that checks if clicks anywhere else on the page and if so, set isHighlighted to false

//   return (
//     <Popover onOpenChange={() => setIsHighlighted(!isHighlighted)}>
//       <PopoverTrigger className="group" title={"click to view description"} >
//         <span className="relative">
//           <span
//             className={`bg-red-100 group-hover:bg-red-200 absolute top-0 left-0 w-full h-[94%] translate-y-[3%]  ${
//               isHighlighted ? "!bg-red-200" : ""
//             }`}
//           ></span>
//            <span
//             className={`bg-red-200 group-hover:bg-red-600 absolute top-0 left-0 w-0.5  h-[94%] translate-y-[3%]  ${
//               isHighlighted ? "!bg-red-600" : ""
//             }`}
//           ></span>
//           <span
//             className={`bg-red-200  group-hover:bg-red-600 absolute top-0 right-0 w-0.5 h-[94%] translate-y-[3%]  ${
//               isHighlighted ? "!bg-red-600" : ""
//             }`}
//           ></span>
//           <span className="relative z-10  px-0.5">{phrase}</span>
//         </span>
//       </PopoverTrigger>
//       <PopoverContent><div>{description}</div></PopoverContent>
//     </Popover>
//   );
// };




const AnnotationPopover = ({ phrase, description }: AnnotationPopoverProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  //add handler that checks if clicks anywhere else on the page and if so, set isHighlighted to false

  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <span className="bg-green-200" ref={ref}>
    <Popover onOpenChange={() => setIsHighlighted(!isHighlighted)} open={isOpen}>
      {isOpen ? <PopoverAnchor className="inline-block relative translate-y-2"/> : null}
      <span className="group" onClick={() => {console.log("opening"); setIsOpen(true)}}>
        <span className="">
          <span className="relative">
          {/* <span
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
          ></span> */}
          <span className={`relative z-10  px-0.5 bg-red-50 ${
              isOpen ? "!bg-red-300" : ""
            }`}>{phrase}</span>
        </span>
        </span>
        </span>

      <PopoverContent><div>{description}</div></PopoverContent>
    </Popover>

    </span>
  );
};

export default AnnotationPopover;