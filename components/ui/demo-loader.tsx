
import { DemoBaseIcon } from "./demo-base";

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-barcode-icon lucide-barcode"><path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/></svg>`;


export default function DemoLoader() {
  return (
   
    <DemoBaseIcon
      svgString={SVG}
      size={300}
    />
  
  );
}