import { Cv } from "@/core/CV";
import { forwardRef } from "react";
import { TwitterIcon, LinkedinIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const ResumeViewer = forwardRef(function ResumeViewer(
  {
    data,
    scale,
  }: {
    data: Cv;
    scale?: Number;
  },
  ref
) {
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      id="resume-content"
      className={cn(
        "bg-white p-6 shadow-lg rounded-lg max-w-4xl w-full"
      )}
      style={{ transform: `scale(${scale ?? 1})` }}
    >
      <header className="mb-1 text-left">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-xl">{data.jobTitle}</p>
        <p>{data.email}</p>
        <p>{data.phoneNumber}</p>
        {data.website && (
          <p>
            <a href={data.website}>
              {data.website.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
        {data.github && (
          <p>
            <a href={data.github}>{data.github.replace(/^https?:\/\//, "")}</a>
          </p>
        )}
        {data.twitter && (
          <p>
            <TwitterIcon className="inline-block mr-2" />
            <a href={data.twitter}>
              {data.twitter.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
        {data.linkedin && (
          <p>
            <LinkedinIcon className="inline-block mr-2" />
            <a href={data.linkedin}>
              {data.linkedin.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
      </header>

      <section className="mb-1">
        <h2 className="text-2xl font-semibold">Experiences</h2>
        {data.experiences && data.experiences.length > 0 ? (
          data.experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="italic">{exp.subTitle}</p>
              <p>{exp.content}</p>
              <p>
                {formatDate(exp.from)} - {formatDate(exp.to)}
              </p>
              {exp.url && <a href={exp.url}>{exp.url}</a>}
            </div>
          ))
        ) : (
          <p>No experiences available.</p>
        )}
      </section>

      <section className="mb-1">
        <h2 className="text-2xl font-semibold">Skills</h2>
        {data.skills && data.skills.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills available.</p>
        )}
      </section>

      <section className="mb-1">
        <h2 className="text-2xl font-semibold">Educations</h2>
        {data.educations && data.educations.length > 0 ? (
          data.educations.map((edu, index) => (
            <div key={index} className="mb-1">
              <p className="text-xl font-bold">{edu.title}</p>
              <p className="italic">{edu.subTitle}</p>
              <p>{edu.content}</p>
              <p>
                {formatDate(edu.from)} - {formatDate(edu.to)}
              </p>
              {edu.url && <a href={edu.url}>{edu.url}</a>}
            </div>
          ))
        ) : (
          <p>No educations available.</p>
        )}
      </section>

      {data.languages && data.languages.length > 0 && (
        <section className="mb-1">
          <h2 className="text-2xl font-semibold">Languages</h2>
          <ul className="list-disc list-inside">
            {data.languages.map((lang, index) => (
              <li key={index}>
                {lang.name} - {lang.level}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-1">
        <h2 className="text-2xl font-semibold">Projects</h2>
        {data.projects && data.projects.length > 0 ? (
          data.projects.map((project, index) => (
            <div key={index} className="mb-1">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="italic">{project.subTitle}</p>
              <p>{project.content}</p>
              {project.url && <a href={project.url}>{project.url}</a>}
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </section>
    </div>
  );
});

function formatDate(date?: Date): string {
  return date ? format(date, "y/MM") : "";
}
