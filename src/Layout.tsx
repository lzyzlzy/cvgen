import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@uidotdev/usehooks";
import { UseCv } from "./contexts/CvContext";
import { ResumeEditor } from "./components/ResumeEditor/ResumeEditor";
import { ResumeViewer } from "./components/ResumeViewer/ResumeViewer";
import { Cv } from "./core/CV";
import { TopBar } from "./components/ResumeViewer/TopBar";
import { useRef, useState } from "react";

export default function Layout() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const currentCV = UseCv();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  return (
    <ResizablePanelGroup
      direction={isDesktop ? "horizontal" : "vertical"}
      className="border"
    >
      <ResizablePanel
        collapsible={false}
        defaultSize={22}
        minSize={22}
        style={{ overflow: "auto" }}
      >
        <ResumeEditor />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel style={{ overflow: "auto" }}>
        <div className="flex flex-col items-center min-h-screen bg-gray-100 ">
          <TopBar resumeRef={resumeRef} scale={scale} setScale={setScale} />
          <ResumeViewer
            ref={resumeRef}
            scale={scale}
            data={currentCV ?? ({} as Cv)}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
