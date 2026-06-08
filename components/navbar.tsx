import Github from "./github";

export default function Navbar(){
    return(
        <nav className="flex justify-between items-center py-4 border-b border-b-gray-200 relative  my-1">
            <h1 className="text-xl font-medium tracking-tight">Grainly icons</h1>
            <Github/>
            <div className="h-[1.5px] bg-[#5FB0E8] w-32  top-15  absolute left-0"></div>
        </nav>
    )
}   