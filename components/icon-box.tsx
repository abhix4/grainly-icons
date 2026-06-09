'use client'
import type { ElementType } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface IconBoxProps {
    icon: ElementType;
    title: string;
}

export default function IconBox({ icon: Icon, title }: IconBoxProps){
    const {copy, copiedText, error} = useCopyToClipboard()
    return (
        <div>
            <div className="group ring ring-gray-100 hover:ring-[#5FB0E8] relative flex items-center justify-center flex-col py-4">
                <Icon />
                <p className="lowercase text-gray-400 text-sm">{title}</p>


                 <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="absolute  top-3 right-3 rounded-sm bg-gray-100 hover:bg-gray-200 p-1 cursor-pointer opacity-0 group-hover:opacity-100" onClick={() => copy(`pnpm dlx shadcn@latest add "https://lucide-animated.com/r/air-vent.json"`)}>
                          {
                            copiedText ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg> :   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" lucide lucide-terminal-icon lucide-terminal"><path d="M12 19h8"/><path d="m4 17 6-6-6-6"/></svg>
                          }
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#5FB0E8]">
                        <p>Copy <code className="bg-[#5FB0E8]/50">shadcn/cli</code> command</p>
                    </TooltipContent>
                </Tooltip>
               
                 
            </div>

          
        </div>
    );
}