import { Cv } from "@/core/CV";

export const defaultResume: Cv = {
  name: "John Doe",
  birthday: new Date("1990-01-01"),
  phoneNumber: "123-456-7890",
  jobTitle: "Software Engineer",
  email: "john.doe@example.com",
  website: "https://johndoe.com",
  github: "https://github.com/johndoe",
  educations: [
    {
      title: "University of Technology",
      subTitle: "Bachelor of Science in Computer Science",
      content:
        "Studied various computer science subjects including algorithms, data structures, and software engineering.",
      from: new Date("2015-09-01"),
      to: new Date("2019-06-01"),
    },
    {
      title: "Institute of Advanced Studies",
      subTitle: "Master of Science in Software Engineering",
      content:
        "Focused on advanced software engineering principles, project management, and research.",
      from: new Date("2019-09-01"),
      to: new Date("2021-06-01"),
    },
  ],
  experiences: [
    {
      title: "Tech Company",
      subTitle: "Software Engineer",
      content:
        "Developed and maintained web applications using modern frameworks and technologies.",
      from: new Date("2021-07-01"),
      to: new Date("2022-12-01"),
    },
    {
      title: "Web Solutions Inc.",
      subTitle: "Frontend Developer",
      content:
        "Worked on the frontend development of various client projects, ensuring responsive and user-friendly designs.",
      from: new Date("2020-01-01"),
      to: new Date("2021-06-01"),
    },
    {
      title: "Startup Hub",
      subTitle: "Intern",
      content:
        "Assisted in developing MVPs for startups, gaining hands-on experience in agile development.",
      from: new Date("2019-06-01"),
      to: new Date("2019-12-01"),
    },
  ],
  projects: [
    {
      title: "Personal Portfolio",
      content:
        "Developed a personal portfolio website to showcase my projects.",
      url: "https://portfolio.com",
    },
    {
      title: "E-commerce Platform",
      content:
        "Built an e-commerce platform with features like product listing, shopping cart, and payment integration.",
      url: "https://ecommerce.com",
    },
    {
      title: "Blog Website",
      content:
        "Created a blog website with user authentication, content management, and commenting system.",
      url: "https://blogwebsite.com",
    },
    {
      title: "Weather App",
      content:
        "Developed a weather app that provides real-time weather updates and forecasts.",
      url: "https://weatherapp.com",
    },
  ],
  skills: ["FrontEnd: ReactJs VueJs","Backend: C# Python SQL"],
};
