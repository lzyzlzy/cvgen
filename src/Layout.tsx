import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { DatePicker } from "./components/ui/date-picker";
import { Cv } from "./core/CV";
import { CvContext, CvDispatchContext } from "./contexts/CvContext";
import { useCallback, useContext } from "react";

export default function Layout() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const currentCV = useContext(CvContext);
  const cvDispatch = useContext(CvDispatchContext);

  const onInputValueChange = useCallback(
    (actionType: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      cvDispatch({ type: actionType, data: e.target.value }),
    [cvDispatch]
  );

  const renderInputTextField = useCallback(
    (label: string, id: keyof Cv, type: string = "text") => (
      <div className="w-full items-center">
        <Label htmlFor={id}>{label}</Label>
        <Input
          type={type}
          id={id}
          placeholder={label}
          value={currentCV?.[id] as string}
          onChange={onInputValueChange(
            `set${id.charAt(0).toUpperCase() + id.slice(1)}`
          )}
        />
      </div>
    ),
    [currentCV, onInputValueChange]
  );

  return (
    <ResizablePanelGroup
      direction={isDesktop ? "horizontal" : "vertical"}
      className="border"
    >
      <ResizablePanel
        collapsible={false}
        defaultSize={16}
        minSize={16}
        style={{ overflow: "auto" }}
        className="min-w-80 overflow-auto"
      >
        <div className="items-start p-6">
          <div id="basicInfoBlock">
            <BlockTitle title="Basic"/>
            {renderInputTextField("Name", "name")}
            {renderInputTextField("Job Title", "jobTitle")}
            <div className="w-full items-center">
              <Label htmlFor="birth">Day of Birth</Label>
              <DatePicker
                id="birth"
                className="w-full"
                selected={currentCV?.birthday}
                onSelectDate={(e) => cvDispatch({ type: "setBirth", data: e })}
              />
            </div>
            {renderInputTextField("Email", "email", "email")}
            {renderInputTextField("PhoneNumber", "phoneNumber")}
            {renderInputTextField("Website", "website")}
            {renderInputTextField("Github", "github")}
          </div>
          <Separator className="my-4" />
          <div id="educationBlock">
            <BlockTitle title="Education"/>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="flex h-full w-full items-center justify-center p-6 overflow-auto">
          <span className="font-semibold">
            {JSON.stringify(currentCV, null, 4)}
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );

  function BlockTitle({ title }: { title: string }) {
    return <h2 className="text-xl font-bold underline">{title}</h2>;
  }
}
