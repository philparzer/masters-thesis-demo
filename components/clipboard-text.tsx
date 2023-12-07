"use client"

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ClipboardTextProps {
    text: string;
    author: string;
    title: string;
    page: number;
    language: string;
}

const ClipboardText = ({text, author, title, page, language}: ClipboardTextProps) => {
    
    const [isHovering, setIsHovering] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);

    useEffect(() => {
        setHasClicked(false);
    }, [isHovering])

    const toClipboard = () => {
        navigator.clipboard.writeText(text);
        setHasClicked(true);
    }

    return (
        <div>
        <div className="relative" onPointerEnter={() => setIsHovering(true)} onPointerLeave={() => setIsHovering(false)}>
        <button className={`text-justify hover:opacity-50 transition-all italic z-10`} onClick={() => toClipboard()}>{text}</button>
        {isHovering ? 
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
            <div className="bg-white dark:bg-zinc-800 dark:border-zinc-700 shadow-sm absolute text-sm py-2 rounded-md px-4 flex gap-1.5 border items-center">{hasClicked? "copied" : "click to copy"}
            {!hasClicked ? 
            <svg xmlns="http://www.w3.org/2000/svg" height="14" className="translate-y-[1px] dark:fill-white" viewBox="0 -960 960 960" width="14"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"/></svg>
            : 
            <Check className="text-green-500 w-[16px] h-[16px] translate-y-[1px]"></Check>
            }
            </div>
        </div>
        : null }
        </div>
        <div className="text-left mt-4 text-sm">{language}, {author}, {title}, page {page}</div>
        </div>
    );
}

export default ClipboardText;