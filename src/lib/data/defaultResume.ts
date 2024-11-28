import { Cv } from "@/core/CV";

export const defaultResume: Cv = {
  basic: {
    name: "John Doe",
    birthday: "1990-01-01",
    phoneNumber: "123-456-7890",
    jobTitle: "Software Engineer",
    email: "john.doe@example.com",
    website: "https://johndoe.com",
    github: "https://github.com/johndoe",
  },
  educations: [
    {
      school: "University of Technology",
      major: "Bachelor of Science in Computer Science",
      content:
        "Studied various computer science subjects including algorithms, data structures, and software engineering.",
      from: "2015-09-01",
      to: "2019-06-01",
    },
    {
      school: "Institute of Advanced Studies",
      major: "Master of Science in Software Engineering",
      content:
        "Focused on advanced software engineering principles, project management, and research.",
      from: "2019-09-01",
      to: "2021-06-01",
    },
  ],
  experiences: [
    {
      company: "Tech Company",
      jobTitle: "Software Engineer",
      content:
        "Developed and maintained web applications using modern frameworks and technologies.",
      from: "2021-07-01",
      to: "2022-12-01",
    },
    {
      company: "Web Solutions Inc.",
      jobTitle: "Frontend Developer",
      content:
        "Worked on the frontend development of various client projects, ensuring responsive and user-friendly designs.",
      from: "2020-01-01",
      to: "2021-06-01",
    },
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js"],
  projects: [
    {
      name: "Project A",
      content:
        "Led the development of a web application that allows users to manage their tasks efficiently.",
      link: "https://a.net",
    },
    {
      name: "Project B",
      content:
        "Contributed to the development of a mobile application that helps users track their fitness goals.",
    },
  ],
};
