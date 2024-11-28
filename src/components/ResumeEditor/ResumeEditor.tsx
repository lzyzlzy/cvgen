import { UseCv } from "@/hooks/CvContext";
import { Separator } from "../ui/separator";
import { BasicInfo } from "./BasicInfo";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Project } from "./Project";

export function ResumeEditor() {
  const currentCV = UseCv();

  return (
    <div className="p-6  max-w-lg dark:bg-slate-700 dark:text-white">
      <BasicInfo basicInfo={currentCV?.basic} />
      <Separator className="my-4" />
      <Education educations={currentCV?.educations} />
      <Separator className="my-4" />
      <Experience experiences={currentCV?.experiences} />
      <Separator className="my-4" />
      <Project projects={currentCV?.projects} />
    </div>
  );
}
