import { Cv } from "@/core/CV";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { UseLocalization } from "@/hooks/LocalizationContext";

export const ResumeViewer = forwardRef(function ResumeViewer(
  {
    data,
    scale,
    className,
  }: {
    className?: string;
    data: Cv;
    scale?: Number;
  },
  ref
) {
  const localization = UseLocalization();
  const textKeyStore = localization?.textKeyStore;

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      id="resume-content"
      className={cn(
        "dark:bg-slate-700 dark:shadow-sky-300 dark:text-white bg-white p-6 shadow-lg rounded-lg max-w-4xl w-full",
        className
      )}
      style={{ transform: `scale(${scale ?? 1})` }}
    >
      <header className="mb-1 text-left">
        <h1 className="text-3xl font-bold">{data.basic.name}</h1>
        <p className="text-xl">{data.basic.jobTitle}</p>
        <p>{data.basic.email}</p>
        <p>{data.basic.phoneNumber}</p>
        {data.basic.website && (
          <p>
            <a href={data.basic.website}>
              {data.basic.website.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
        {data.basic.github && (
          <p>
            <a href={data.basic.github}>
              {data.basic.github.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
      </header>

      <section className="mb-1">
        <h2 className="text-2xl font-semibold">{textKeyStore.experience}</h2>
        {data.experiences && data.experiences.length > 0 ? (
          data.experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="italic">{exp.subTitle}</p>
              <p>{exp.content}</p>
              <p>
                {exp.from} - {exp.to}
              </p>
              {exp.url && <a href={exp.url}>{exp.url}</a>}
            </div>
          ))
        ) : (
          <></>
        )}
      </section>

      <section className="mb-1">
        <h2 className="text-2xl font-semibold">{textKeyStore.skills}</h2>
        {data.skills && data.skills.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </section>

      <section className="mb-1">
        <h2 className="text-2xl font-semibold">{textKeyStore.education}</h2>
        {data.educations && data.educations.length > 0 ? (
          data.educations.map((edu, index) => (
            <div key={index} className="mb-1">
              <p className="text-xl font-bold">{edu.title}</p>
              <p className="italic">{edu.subTitle}</p>
              <p>{edu.content}</p>
              <p>
                {edu.from} - {edu.to}
              </p>
              {edu.url && <a href={edu.url}>{edu.url}</a>}
            </div>
          ))
        ) : (
          <></>
        )}
      </section>
      <section className="mb-1">
        <h2 className="text-2xl font-semibold">{textKeyStore.projects}</h2>
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
          <></>
        )}
      </section>
    </div>
  );
});
