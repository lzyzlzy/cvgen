import { CvExperience } from "@/core/CV";
import { memo } from "react";
import { BlockTitleWithPlusButton } from "./ui/BlockTitle";
import { UseCvDispatch } from "@/hooks/CvContext";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { InputWithLabel } from "../ui/inputWithLabel";
import { TextareaWithLabel } from "../ui/textareaWithLabel";
import { IterableContent } from "./ui/IterableContent";
import { EditorRowWrapper } from "./ui/EditorRowWrapper";
import { DurationInput } from "./ui/DurationInput";

export const Experience = memo(function Experience({
  experiences,
}: {
  experiences?: CvExperience[];
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
      <IterableContent
        source={experiences}
        onTrashClick={(exp) =>
          cvDispatch({
            type: "removeExperienceItem",
            data: exp,
          })
        }
        render={(exp, i) => {
          const inputExpTitleId = "exp_title_input_" + i;
          const inputExpSubtitleId = "exp_subtitle_input_" + i;
          const inputExpContentId = "exp_Content_input_" + i;
          const inputExpDateId = "exp_date_input_" + i;
          return (
            <>
              <EditorRowWrapper>
                <InputWithLabel
                  labelName={textKeyStore.company}
                  id={inputExpTitleId}
                  placeholder={textKeyStore.company}
                  value={exp.company ?? ""}
                  onChange={(e) => {
                    exp.company = e.target.value;
                    cvDispatch({
                      type: "updateExperienceItem",
                      data: { index: i, value: exp },
                    });
                  }}
                />
              </EditorRowWrapper>
              <EditorRowWrapper>
                <InputWithLabel
                  labelName={textKeyStore.job_title}
                  id={inputExpSubtitleId}
                  placeholder={textKeyStore.job_title}
                  value={exp.jobTitle ?? ""}
                  onChange={(e) => {
                    exp.jobTitle = e.target.value;
                    cvDispatch({
                      type: "updateExperienceItem",
                      data: { index: i, value: exp },
                    });
                  }}
                />
              </EditorRowWrapper>
              <EditorRowWrapper>
                <DurationInput
                  id={inputExpDateId}
                  from={{
                    value: exp.from ?? "",
                    onChange: (e) => {
                      exp.from = e.target.value;
                      cvDispatch({
                        type: "updateExperienceItem",
                        data: { index: i, value: exp },
                      });
                    },
                  }}
                  to={{
                    value: exp.to ?? "",
                    onChange: (e) => {
                      exp.to = e.target.value;
                      cvDispatch({
                        type: "updateExperienceItem",
                        data: { index: i, value: exp },
                      });
                    },
                  }}
                />
              </EditorRowWrapper>
              <EditorRowWrapper>
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
              </EditorRowWrapper>
            </>
          );
        }}
      />
    </div>
  );
});
