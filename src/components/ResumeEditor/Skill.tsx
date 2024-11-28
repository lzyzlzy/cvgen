import { UseCvDispatch } from "@/hooks/CvContext";
import { UseLocalization } from "@/hooks/LocalizationContext";
import { BlockTitleWithPlusButton } from "./ui/BlockTitle";
import { IterableContent } from "./ui/IterableContent";
import { EditorRowWrapper } from "./ui/EditorRowWrapper";
import { Input } from "../ui/input";
import { memo } from "react";

export const Skill = memo(function Skill({ skills }: { skills?: string[] }) {
  const cvDispatch = UseCvDispatch();
  const localization = UseLocalization();
  const textKeyStore = localization?.textKeyStore;

  return (
    <div id="skillBlock">
      <BlockTitleWithPlusButton
        title={textKeyStore.skills}
        onPlusClick={() =>
          cvDispatch({
            type: "addSkill",
          })
        }
      />
      <IterableContent
        source={skills}
        onTrashClick={(skill) =>
          cvDispatch({
            type: "removeSkill",
            data: skill,
          })
        }
        render={(skill, i) => {
          return (
            <>
              <EditorRowWrapper>
                <Input
                  id={"input_skill_name" + i}
                  placeholder={textKeyStore.name}
                  value={skill ?? ""}
                  onChange={(e) => {
                    skill = e.target.value;
                    cvDispatch({
                      type: "updateSkill",
                      data: { index: i, value: skill },
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
