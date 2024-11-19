import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@uidotdev/usehooks";
import { CvContext } from "./contexts/CvContext";
import { useContext } from "react";
import { ResumeEditor } from "./components/ResumeEditor/ResumeEditor";
import { ResumeViewer } from "./components/ResumeViewer/ResumeViewer";
import { Cv } from "./core/CV";

export default function Layout() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const currentCV = useContext(CvContext);

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
        <ResumeViewer data={currentCV ?? ({} as Cv)} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
