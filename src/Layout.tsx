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
import { useContext } from "react";

export default function Layout() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const currentCV = useContext(CvContext);
  const cvDispatch = useContext(CvDispatchContext);

  const onInputValueChange =
    (actionType: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      cvDispatch({ type: actionType, data: e.target.value });

  const renderInputField = (
    label: string,
    id: keyof Cv,
    type: string = "text"
  ) => (
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
        className="min-w-80 overflow-auto"
      >
        <div className=" flex flex-col items-start p-6  overflow-auto">
          {renderInputField("Name", "name")}
          {renderInputField("JobTitle", "jobTitle")}
          <div className="w-full items-center">
            <Label htmlFor="birth">Day of Birth</Label>
            <DatePicker
              id="birth"
              className="w-full"
              selected={currentCV?.birthday}
              onSelectDate={(e) => cvDispatch({ type: "setBirth", data: e })}
            />
          </div>
          {renderInputField("Email", "email", "email")}
          {renderInputField("PhoneNumber", "phoneNumber")}
          {renderInputField("Website", "website")}
          {renderInputField("Github", "github")}
          <Separator className="my-4" />
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
}
