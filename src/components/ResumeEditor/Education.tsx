import { UseCvDispatch } from "@/hooks/CvContext";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { memo } from "react";
import { BlockTitleWithPlusButton } from "./ui/BlockTitle";
import { CvEducation } from "@/core/CV";
import { InputWithLabel } from "../ui/inputWithLabel";
import { IterableContent } from "./ui/IterableContent";
import { EditorRowWrapper } from "./ui/EditorRowWrapper";
import { DurationInput } from "./ui/DurationInput";
import { TextareaWithLabel } from "../ui/textareaWithLabel";

export const Education = memo(function Education({
  educations,
}: {
  educations?: CvEducation[];
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
      <IterableContent
        source={educations}
        onTrashClick={(edu) =>
          cvDispatch({
            type: "removeEducationItem",
            data: edu,
          })
        }
        render={(edu, i) => {
          const inputEduTitleId = "edu_title_input_" + i;
          const inputEduMajorId = "edu_major_input_" + i;
          const inputEduDateId = "edu_date_input_" + i;
          const inputEduContentId = "edu_content_input_" + i;
          return (
            <>
              <EditorRowWrapper>
                <InputWithLabel
                  labelName={textKeyStore.school}
                  id={inputEduTitleId}
                  placeholder="School"
                  value={edu.school ?? ""}
                  onChange={(e) => {
                    edu.school = e.target.value;
                    cvDispatch({
                      type: "updateEducationItem",
                      data: { index: i, value: edu },
                    });
                  }}
                />
              </EditorRowWrapper>
              <EditorRowWrapper>
                <DurationInput
                  id={inputEduDateId}
                  from={{
                    value: edu.from ?? "",
                    onChange: (e) => {
                      edu.from = e.target.value;
                      cvDispatch({
                        type: "updateEducationItem",
                        data: { index: i, value: edu },
                      });
                    },
                  }}
                  to={{
                    value: edu.to ?? "",
                    onChange: (e) => {
                      edu.to = e.target.value;
                      cvDispatch({
                        type: "updateEducationItem",
                        data: { index: i, value: edu },
                      });
                    },
                  }}
                />
              </EditorRowWrapper>
              <EditorRowWrapper>
                <InputWithLabel
                  labelName={textKeyStore.major}
                  id={inputEduMajorId}
                  placeholder={textKeyStore.major}
                  value={edu.major ?? ""}
                  onChange={(e) => {
                    edu.major = e.target.value;
                    cvDispatch({
                      type: "updateEducationItem",
                      data: { index: i, value: edu },
                    });
                  }}
                />
              </EditorRowWrapper>
              <EditorRowWrapper>
                <TextareaWithLabel
                  labelName={textKeyStore.content}
                  rows={4}
                  id={inputEduContentId}
                  placeholder={textKeyStore.content}
                  value={edu.content ?? ""}
                  onChange={(e) => {
                    edu.content = e.target.value;
                    cvDispatch({
                      type: "updateEducationItem",
                      data: { index: i, value: edu },
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
