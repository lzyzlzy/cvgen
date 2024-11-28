import { CvEvent } from "@/core/CV";
import { memo } from "react";
import { BlockTitleWithPlusButton } from "./BlockTitle";
import { Button } from "../ui/button";
import { UseCvDispatch } from "@/hooks/CvContext";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { Trash2Icon } from "lucide-react";
import { InputWithLabel } from "../ui/InputWithLabel";
import { TextareaWithLabel } from "../ui/TextareaWithLabel";

export const Experience = memo(function Experience({
  experiences,
}: {
  experiences?: CvEvent[];
}) {
  const cvDispatch = UseCvDispatch();
  const localization = UseLocalization();
  const textKeyStore = localization?.textKeyStore;

  return (
    <div id="workExperienceBlock">
      <BlockTitleWithPlusButton
        title={textKeyStore.experience}
        onPlusClick={() =>
          cvDispatch({
            type: "addExperience",
          })
        }
      />
      <div>
        {experiences?.map((exp, i) => {
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
                <InputWithLabel
                  labelName={textKeyStore.company}
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
                <InputWithLabel
                  labelName={textKeyStore.job_title}
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
                  <InputWithLabel
                    labelName={textKeyStore.from}
                    id={inputExpFromDateId}
                    placeholder={textKeyStore.from}
                    value={exp.from ?? ""}
                    onChange={(e) => {
                      exp.from = e.target.value;
                      cvDispatch({
                        type: "updateExperienceItem",
                        data: { index: i, value: exp },
                      });
                    }}
                  />
                </div>
                <div className="w-auto">
                  <InputWithLabel
                    labelName={textKeyStore.to}
                    id={inputExpToDateId}
                    placeholder={textKeyStore.to}
                    value={exp.to ?? ""}
                    onChange={(e) => {
                      exp.to = e.target.value;
                      cvDispatch({
                        type: "updateExperienceItem",
                        data: { index: i, value: exp },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="w-full items-center">
                <TextareaWithLabel
                  labelName={textKeyStore.content}
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
  );
});
