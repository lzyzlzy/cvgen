import { CvEvent } from "@/core/CV";
import { UseCvDispatch } from "@/hooks/CvContext";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { memo } from "react";
import { BlockTitleWithPlusButton } from "./BlockTitle";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { InputWithLabel } from "../ui/InputWithLabel";
import { TextareaWithLabel } from "../ui/TextareaWithLabel";

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
      <div>
        {projects?.map((proj, i) => {
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
              </div>
              <div className="w-full items-center">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
