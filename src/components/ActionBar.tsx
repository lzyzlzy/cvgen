import { PrinterIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useReactToPrint } from "react-to-print";
import { RefObject } from "react";
import { UseCv } from "@/hooks/CvContext";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { AiDrawer } from "./ai/AiDrawer";

export function ActionBar({
  resumeRef,
  scale,
  setScale,
  className,
  ...props
}: {
  resumeRef: RefObject<Element | Text>;
  scale: number;
  setScale: (arg0: number) => void;
  className?: string;
}) {
  const localization = UseLocalization();
  const textKeys = localization.textKeyStore;
  const cv = UseCv();
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    pageStyle:
      "body { transform-origin: top left; box-shadow: unset; margin: unset; transform: scale(1); -webkit-print-color-adjust: exact !important;  color-adjust: exact !important; print-color-adjust: exact !important; }",
    documentTitle: cv?.basic.name,
    onAfterPrint: () => console.log("printed"),
  });

  return (
    <header
      className={cn(
        " w-full bg-white p-4 flex justify-between items-center border-t flex-wrap",
        className
      )}
      {...props}
    >
      <div className="hidden md:visible md:flex flex-row items-center space-x-2">
        <ZoomOutIcon />
        <Slider
          defaultValue={[100]}
          min={50}
          max={100}
          step={10}
          onValueChange={([v]) => setScale(v / 100)}
          className={" w-20"}
        />
        <ZoomInIcon />
        {scale * 100}%
      </div>
      <AiDrawer />
      <Button onClick={() => handlePrint()}>
        <PrinterIcon />
        {textKeys.print}
      </Button>
    </header>
  );
}
