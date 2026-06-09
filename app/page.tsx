'use client'
import IconBox from "@/components/icon-box";
import DemoLoader from "@/components/ui/demo-loader";
import { ICON_LIST } from "@/icons";

export default function Page() {
  return (
   <div className='bg-[#] min-h-screen'>
      <div className="py-20 flex justify-between overflow-hidden">
        <div  className="relative z-10">
          <h2 className="text-5xl leading-14">
          Icons that feel like <br /> pixels.
          </h2>
          <div className="absolute top-25 -left-4 -z-10">
            <DemoLoader/>
          </div>
          <div className="absolute top-15 -right-20 -z-10">
            <DemoLoader/>
          </div>
          <div className="absolute top-10 -right-120 -z-10">
            <DemoLoader/>
          </div>
          <div className="absolute top-20 -right-78 -z-10">
            <DemoLoader/>
          </div>
        </div>
        <div>
          <p className="text-gray-400 mt-2 text-sm">Grained on top of <span className="border px-1 border-[#5FB0E8]">Lucide</span></p>
          <p className="text-gray-400 text-end text-sm">Open Source</p>
          <p className="text-gray-400 text-end text-sm">v 0.1.0</p>
        </div>
      </div>
      <p className="text-xs mt-12 text-end lowercase">{ICON_LIST.length} total </p>
      <div className="grid grid-cols-4 mt-4">

      
       {
        ICON_LIST.map((icon,index) => (
          <IconBox icon={icon.icon} title={icon.title} key={index}/>
        ))
       }
      </div>
   </div>
  );
}
