import { UseCv } from "@/hooks/CvContext";
import { Separator } from "../ui/separator";
import { BasicInfo } from "./BasicInfo";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Project } from "./Project";
import { EditorWrapper } from "./ui/EditorWrapper";
import { Skill } from "./Skill";

export function ResumeEditor() {
  const currentCV = UseCv();

  return (
    <EditorWrapper>
      <BasicInfo basicInfo={currentCV?.basic} />
      <Separator className="my-4" />
      <Education educations={currentCV?.educations} />
      <Separator className="my-4" />
      <Experience experiences={currentCV?.experiences} />
      <Separator className="my-4" />
      <Project projects={currentCV?.projects} />
      <Separator className="my-4" />
      <Skill skills={currentCV?.skills} />
    </EditorWrapper>
  );
}
