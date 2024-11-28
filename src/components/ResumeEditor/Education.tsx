import { UseCvDispatch } from "@/hooks/CvContext";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { memo } from "react";
import { BlockTitleWithPlusButton } from "./BlockTitle";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { CvEvent } from "@/core/CV";
import { InputWithLabel } from "../ui/InputWithLabel";

export const Education = memo(function Education({
  educations,
}: {
  educations?: CvEvent[];
}) {
  const cvDispatch = UseCvDispatch();
  const localization = UseLocalization();
  const textKeyStore = localization?.textKeyStore;

  return (
    <div id="educationBlock">
      <BlockTitleWithPlusButton
        title={textKeyStore.education}
        onPlusClick={() =>
          cvDispatch({
            type: "addEducation",
          })
        }
      />
      <div>
        {educations?.map((edu, i) => {
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
                <InputWithLabel
                  labelName={textKeyStore.school}
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
                  <InputWithLabel
                    labelName={textKeyStore.from}
                    id={inputEduFromDateId}
                    placeholder={textKeyStore.from}
                    value={edu.from ?? ""}
                    onChange={(e) => {
                      edu.from = e.target.value;
                      cvDispatch({
                        type: "updateEducationItem",
                        data: { index: i, value: edu },
                      });
                    }}
                  />
                </div>
                <div className="w-auto">
                  <InputWithLabel
                    labelName={textKeyStore.to}
                    id={inputEduToDateId}
                    placeholder={textKeyStore.to}
                    value={edu.to ?? ""}
                    onChange={(e) => {
                      edu.to = e.target.value;
                      cvDispatch({
                        type: "updateEducationItem",
                        data: { index: i, value: edu },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="w-full items-center">
                <InputWithLabel
                  labelName={textKeyStore.major}
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
  );
});
