import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@uidotdev/usehooks";
import { UseCv } from "./lib/hooks/CvContext";
import { ResumeEditor } from "./components/ResumeEditor/ResumeEditor";
import { ResumeViewer } from "./components/ResumeViewer/ResumeViewer";
import { Cv } from "./core/CV";
import { ActionBar } from "./components/ActionBar";
import { useRef, useState } from "react";
import { LogoBar } from "./components/LogoBar";
import { cn } from "./lib/utils";

export default function Layout() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const currentCV = UseCv();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isDark, setDark] = useState(false);

  return (
    <ResizablePanelGroup
      direction={isDesktop ? "horizontal" : "vertical"}
      className={cn("border", isDark ? "dark" : "")}
    >
      <ResizablePanel
        collapsible={false}
        defaultSize={isDesktop ? 30 : 60}
        minSize={22}
        style={{ overflow: "auto" }}
      >
        <LogoBar isDark={isDark} setDark={setDark} />
        <ResumeEditor />
      </ResizablePanel>
      <ResizableHandle withHandle={!isDesktop} />
      <ResizablePanel className="static " style={{ overflow: "auto" }}>
        <div className="dark:bg-slate-800 dark:text-white flex flex-col items-center min-h-screen bg-gray-100 pt-2 pb-6">
          <ResumeViewer
            ref={resumeRef}
            scale={scale}
            data={currentCV ?? ({} as Cv)}
          />
        </div>
        <ActionBar
          className="dark:bg-slate-900 dark:text-white sticky bottom-0 w-full"
          resumeRef={resumeRef}
          scale={scale}
          setScale={setScale}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
