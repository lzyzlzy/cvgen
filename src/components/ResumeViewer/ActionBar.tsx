import { PrinterIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useReactToPrint } from "react-to-print";
import { RefObject } from "react";
import { UseCv } from "@/lib/hooks/CvContext";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

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
  const cv = UseCv();
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    pageStyle:
      "body { transform-origin: top left; box-shadow: unset; margin: unset; transform: scale(1); -webkit-print-color-adjust: exact !important;  color-adjust: exact !important; print-color-adjust: exact !important; }",
    documentTitle: cv?.name,
    onAfterPrint: () => console.log("printed"),
  });

  return (
    <header
      className={cn(
        "w-full bg-white p-4 flex justify-between items-center",
        className
      )}
      {...props}
    >
      <div className="flex flex-row items-center space-x-2">
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
      <Button onClick={() => handlePrint()}>
        <PrinterIcon />
        Print
      </Button>
    </header>
  );
}
