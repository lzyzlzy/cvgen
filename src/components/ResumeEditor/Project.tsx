import { CvEvent } from "@/core/CV";
import { UseCvDispatch } from "@/hooks/CvContext";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { memo } from "react";
import { BlockTitleWithPlusButton } from "./ui/BlockTitle";
import { InputWithLabel } from "../ui/InputWithLabel";
import { TextareaWithLabel } from "../ui/TextareaWithLabel";
import { IterableContent } from "./ui/IterableContent";
import { EditorRowWrapper } from "./ui/EditorRowWrapper";

export const Project = memo(function Project({
  projects,
}: {
  projects?: CvEvent[];
}) {
  const cvDispatch = UseCvDispatch();
  const localization = UseLocalization();
  const textKeyStore = localization?.textKeyStore;

  return (
    <div id="ProjectsBlock">
      <BlockTitleWithPlusButton
        title={textKeyStore.projects}
        onPlusClick={() =>
          cvDispatch({
            type: "addProject",
          })
        }
      />
      <IterableContent
        source={projects}
        onTrashClick={(proj) =>
          cvDispatch({
            type: "removeProject",
            data: proj,
          })
        }
        render={(proj, i) => {
          const inputProjTitleId = "proj_title_input_" + i;
          const inputProjContentId = "proj_Content_input_" + i;
          return (
            <>
              <EditorRowWrapper>
                <InputWithLabel
                  labelName={textKeyStore.name}
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
              </EditorRowWrapper>
              <EditorRowWrapper>
                <TextareaWithLabel
                  labelName={textKeyStore.content}
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
              </EditorRowWrapper>
            </>
          );
        }}
      />
    </div>
  );
});
