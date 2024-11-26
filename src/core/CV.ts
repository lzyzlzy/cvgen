export interface Cv {
  name: string;
  birthday?: string;
  phoneNumber: string;
  jobTitle: string;
  email: string;
  website?: string;
  github?: string;
  experiences: CvEvent[];
  skills: string[];
  educations: CvEvent[];
  languages?: LanguagesSkill[];
  projects: CvEvent[];
}
export interface CvEvent {
  title?: string;
  subTitle?: string;
  content: string;
  from?: string;
  to?: string;
  url?: string;
}
export interface LanguagesSkill {
  name: string;
  level: string;
}

export const schema = `
export interface Cv {
  name: string;
  birthday?: string;
  phoneNumber: string;
  jobTitle: string;
  email: string;
  website?: string;
  github?: string;
  experiences: CvEvent[];
  skills: string[];
  educations: CvEvent[];
  languages?: LanguagesSkill[];
  projects: CvEvent[];
}
export interface CvEvent {
  title?: string;
  subTitle?: string;
  content: string;
  from?: string;
  to?: string;
  url?: string;
}
export interface LanguagesSkill {
  name: string;
  level: string;
}
`;
