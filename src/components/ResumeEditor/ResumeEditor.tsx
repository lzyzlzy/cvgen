import { useCallback } from "react";
import { UseCv, UseCvDispatch } from "@/lib/hooks/CvContext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Cv } from "@/core/CV";
import { BlockTitle } from "./BlockTitle";
import { DatePicker } from "../ui/date-picker";
import { Button } from "../ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { UseLocalization } from "@/lib/hooks/LocalizationContext";

export function ResumeEditor() {
  const currentCV = UseCv();
  const cvDispatch = UseCvDispatch();
  const localization = UseLocalization();
  const textKeyStore = localization?.textKeyStore;

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
          className=""
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
    <div className="p-6  max-w-lg dark:bg-slate-700 dark:text-white">
      <div id="basicInfoBlock">
        <BlockTitle title={textKeyStore.basic} />
        {renderInputTextField(textKeyStore.name, "name")}
        {renderInputTextField(textKeyStore.job_title, "jobTitle")}
        <div className="w-full items-center">
          <Label htmlFor="birth">{textKeyStore?.day_of_birth}</Label>
          <DatePicker
            id="birth"
            className="w-full"
            selected={currentCV?.birthday}
            onSelectDate={(e) => cvDispatch({ type: "setBirth", data: e })}
          />
        </div>
        {renderInputTextField(textKeyStore.email, "email", "email")}
        {renderInputTextField(textKeyStore.phone_number, "phoneNumber")}
        {renderInputTextField(textKeyStore.website, "website")}
        {renderInputTextField(textKeyStore.github, "github")}
      </div>
      <Separator className="my-4" />
      <div id="educationBlock">
        <BlockTitle title={textKeyStore.education}>
          <Button
            onClick={() =>
              cvDispatch({
                type: "addEducation",
              })
            }
            variant="ghost"
            size="icon"
            className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500 bg-white hover:border-black"
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
                className="dark:border-white border-t-2 mb-2 hover:shadow-xl"
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
                    className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500 bg-white hover:border-black"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputEduTitleId}>{textKeyStore.school}</Label>
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
                    <Label htmlFor={inputEduFromDateId}>
                      {textKeyStore.from}
                    </Label>
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
                    <Label htmlFor={inputEduToDateId}>{textKeyStore.to}</Label>
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
                  <Label htmlFor={inputEduMajorId}>{textKeyStore.major}</Label>
                  <Input
                    id={inputEduMajorId}
                    placeholder={textKeyStore.major}
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
        <BlockTitle title={textKeyStore.experience}>
          <Button
            onClick={() =>
              cvDispatch({
                type: "addExperience",
              })
            }
            variant="ghost"
            size="icon"
            className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500 bg-white hover:border-black"
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
                className="dark:border-white border-t-2 mb-2 hover:shadow-xl"
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
                    className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500 bg-white hover:border-black"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputExpTitleId}>
                    {textKeyStore.company}
                  </Label>
                  <Input
                    id={inputExpTitleId}
                    placeholder={textKeyStore.company}
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
                  <Label htmlFor={inputExpSubtitleId}>
                    {textKeyStore.job_title}
                  </Label>
                  <Input
                    id={inputExpSubtitleId}
                    placeholder={textKeyStore.job_title}
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
                    <Label htmlFor={inputExpFromDateId}>
                      {textKeyStore.from}
                    </Label>
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
                    <Label htmlFor={inputExpToDateId}>{textKeyStore.to}</Label>
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
                  <Label htmlFor={inputExpContentId}>
                    {textKeyStore.content}
                  </Label>
                  <Textarea
                    rows={4}
                    id={inputExpContentId}
                    placeholder={textKeyStore.content}
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
        <BlockTitle title={textKeyStore.projects}>
          <Button
            onClick={() =>
              cvDispatch({
                type: "addProject",
              })
            }
            variant="ghost"
            size="icon"
            className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500 bg-white hover:border-black"
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
                className="border-t-2 mb-2 dark:border-white hover:shadow-xl"
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
                    className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500 bg-white hover:border-black"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
                <div className="w-full items-center">
                  <Label htmlFor={inputProjTitleId}>{textKeyStore.name}</Label>
                  <Input
                    id={inputProjTitleId}
                    placeholder={textKeyStore.name}
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
                  <Label htmlFor={inputProjContentId}>
                    {textKeyStore.content}
                  </Label>
                  <Textarea
                    rows={4}
                    id={inputProjContentId}
                    placeholder={textKeyStore.content}
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
