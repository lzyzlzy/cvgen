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
import { ReactNode, useCallback, useContext } from "react";
import { Button } from "./components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";

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
        minSize={16}
        style={{ overflow: "auto" }}
      >
        <CvEditor />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="flex h-full w-full items-center justify-center p-6 overflow-auto">
          <code className="font-semibold">
            {JSON.stringify(currentCV, null, "  ")}
          </code>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function BlockTitle({
  title,
  children,
  ...props
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-xl font-bold underline" {...props}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

function CvEditor() {
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
          key={id}
          placeholder={label}
          value={(currentCV?.[id] as string) ?? ""}
          onChange={onInputValueChange(
            `set${id.charAt(0).toUpperCase() + id.slice(1)}`
          )}
        />
      </div>
    ),
    [currentCV, onInputValueChange]
  );

  return (
    <div className="p-6  max-w-lg">
      <div id="basicInfoBlock">
        <BlockTitle title="Basic" />
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
        {renderInputTextField("Phone Number", "phoneNumber")}
        {renderInputTextField("Website", "website")}
        {renderInputTextField("Github", "github")}
      </div>
      <Separator className="my-4" />
      <div id="educationBlock">
        <BlockTitle title="Education">
          <Button
            onClick={() =>
              cvDispatch({
                type: "addEducation",
              })
            }
            variant="ghost"
            size="icon"
            className="bg-white hover:border-black"
          >
            <PlusIcon />
          </Button>
        </BlockTitle>
        <div>
          {currentCV?.educations?.map((edu, i) => {
            const inputEduTitleId = "edu_title_input_" + i;
            const inputEduMajorId = "edu_major_input_" + i;
            const inputEduFromDateId = "edu_from_input_" + i;
            const inputEduToDateId = "edu_to_input_" + i;
            return (
              <div
                className="border-t-2 mb-2 hover:shadow-xl"
                key={"edu_item_" + i}
              >
                <div className="flex flex-row justify-between items-center">
                  <p className="text-md font-bold">{i + 1}.</p>
                  <Button
                    onClick={() =>
                      cvDispatch({
                        type: "removeEducationItem",
                        data: edu,
                      })
                    }
                    variant="ghost"
                    size="icon"
                    className="bg-white hover:border-black"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputEduTitleId}>School</Label>
                  <Input
                    id={inputEduTitleId}
                    placeholder="School"
                    value={edu.title ?? ""}
                    onChange={(e) => {
                      edu.title = e.target.value;
                      cvDispatch({
                        type: "updateEducationItem",
                        data: { index: i, value: edu },
                      });
                    }}
                  />
                </div>
                <div className="w-full items-center grid grid-cols-2 justify-items-stretch gap-2">
                  <div className="w-auto">
                    <Label htmlFor={inputEduFromDateId}>From</Label>
                    <DatePicker
                      className="w-full"
                      id={inputEduFromDateId}
                      selected={edu.from}
                      onSelectDate={(e) => {
                        edu.from = e;
                        cvDispatch({
                          type: "updateEducationItem",
                          data: e,
                        });
                      }}
                    />
                  </div>
                  <div className="w-auto">
                    <Label htmlFor={inputEduToDateId}>To</Label>
                    <DatePicker
                      className="w-full"
                      id={inputEduToDateId}
                      selected={edu.to}
                      onSelectDate={(e) => {
                        edu.to = e;
                        cvDispatch({
                          type: "updateEducationItem",
                          data: e,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputEduMajorId}>Major</Label>
                  <Input
                    id={inputEduMajorId}
                    placeholder="Major"
                    value={edu.content ?? ""}
                    onChange={(e) => {
                      edu.content = e.target.value;
                      cvDispatch({
                        type: "updateEducationItem",
                        data: { index: i, value: edu },
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Separator className="my-4" />
      <div id="workExperienceBlock">
        <BlockTitle title="Experiences">
          <Button
            onClick={() =>
              cvDispatch({
                type: "addExperience",
              })
            }
            variant="ghost"
            size="icon"
            className="bg-white hover:border-black"
          >
            <PlusIcon />
          </Button>
        </BlockTitle>
        <div>
          {currentCV?.experiences?.map((exp, i) => {
            const inputExpTitleId = "exp_title_input_" + i;
            const inputExpSubtitleId = "exp_subtitle_input_" + i;
            const inputExpContentId = "exp_Content_input_" + i;
            const inputExpFromDateId = "exp_from_input_" + i;
            const inputExpToDateId = "exp_to_input_" + i;
            return (
              <div
                className="border-t-2 mb-2 hover:shadow-xl"
                key={"exp_item_" + i}
              >
                <div className="flex flex-row justify-between items-center">
                  <p className="text-md font-bold">{i + 1}.</p>
                  <Button
                    onClick={() =>
                      cvDispatch({
                        type: "removeExperienceItem",
                        data: exp,
                      })
                    }
                    variant="ghost"
                    size="icon"
                    className="bg-white hover:border-black"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputExpTitleId}>Company</Label>
                  <Input
                    id={inputExpTitleId}
                    placeholder="Company"
                    value={exp.title ?? ""}
                    onChange={(e) => {
                      exp.title = e.target.value;
                      cvDispatch({
                        type: "updateExperienceItem",
                        data: { index: i, value: exp },
                      });
                    }}
                  />
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputExpSubtitleId}>Job Title</Label>
                  <Input
                    id={inputExpSubtitleId}
                    placeholder="Job Title"
                    value={exp.subTitle ?? ""}
                    onChange={(e) => {
                      exp.subTitle = e.target.value;
                      cvDispatch({
                        type: "updateExperienceItem",
                        data: { index: i, value: exp },
                      });
                    }}
                  />
                </div>
                <div className="w-full items-center grid grid-cols-2 justify-items-stretch gap-2">
                  <div className="w-auto">
                    <Label htmlFor={inputExpFromDateId}>From</Label>
                    <DatePicker
                      className="w-full"
                      id={inputExpFromDateId}
                      selected={exp.from}
                      onSelectDate={(e) => {
                        exp.from = e;
                        cvDispatch({
                          type: "updateExperienceItem",
                          data: e,
                        });
                      }}
                    />
                  </div>
                  <div className="w-auto">
                    <Label htmlFor={inputExpToDateId}>To</Label>
                    <DatePicker
                      className="w-full"
                      id={inputExpToDateId}
                      selected={exp.to}
                      onSelectDate={(e) => {
                        exp.to = e;
                        cvDispatch({
                          type: "updateExperienceItem",
                          data: e,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputExpContentId}>Content</Label>
                  <Input
                    id={inputExpContentId}
                    placeholder="Content"
                    value={exp.content ?? ""}
                    onChange={(e) => {
                      exp.content = e.target.value;
                      cvDispatch({
                        type: "updateExperienceItem",
                        data: { index: i, value: exp },
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Separator className="my-4" />
      <div id="ProjectsBlock">
        <BlockTitle title="Projects">
          <Button
            onClick={() =>
              cvDispatch({
                type: "addProject",
              })
            }
            variant="ghost"
            size="icon"
            className="bg-white hover:border-black"
          >
            <PlusIcon />
          </Button>
        </BlockTitle>
        <div>
          {currentCV?.projects?.map((proj, i) => {
            const inputProjTitleId = "proj_title_input_" + i;
            const inputProjContentId = "proj_Content_input_" + i;
            return (
              <div
                className="border-t-2 mb-2 hover:shadow-xl"
                key={"proj_item_" + i}
              >
                <div className="flex flex-row justify-between items-center">
                  <p className="text-md font-bold">{i + 1}.</p>
                  <Button
                    onClick={() =>
                      cvDispatch({
                        type: "removeProject",
                        data: proj,
                      })
                    }
                    variant="ghost"
                    size="icon"
                    className="bg-white hover:border-black"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputProjTitleId}>Name</Label>
                  <Input
                    id={inputProjTitleId}
                    placeholder="Name"
                    value={proj.title ?? ""}
                    onChange={(e) => {
                      proj.title = e.target.value;
                      cvDispatch({
                        type: "updateProject",
                        data: { index: i, value: proj },
                      });
                    }}
                  />
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputProjContentId}>Content</Label>
                  <Input
                    id={inputProjContentId}
                    placeholder="Content"
                    value={proj.content ?? ""}
                    onChange={(e) => {
                      proj.content = e.target.value;
                      cvDispatch({
                        type: "updateProject",
                        data: { index: i, value: proj },
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
