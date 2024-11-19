export interface Cv {
  name: string;
  birthday?: Date;
  phoneNumber: string;
  jobTitle: string;
  email: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
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
  from?: Date | undefined;
  to?: Date | undefined;
  url?: string;
}
export interface LanguagesSkill {
  name: string;
  level: string;
}
