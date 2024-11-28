export interface Cv {
  basic: CvBasic;
  experiences: CvExperience[];
  skills: string[];
  educations: CvEducation[];
  // languages?: LanguagesSkill[];
  projects: CvProject[];
}

export interface CvProject {
  name: string;
  content: string;
  link?: string;
}

export interface CvEducation {
  school: string;
  from: string;
  to: string;
  major: string;
  content: string;
}

export interface CvExperience {
  company: string;
  jobTitle: string;
  from: string;
  to: string;
  content: string;
}

export interface CvBasic {
  name: string;
  birthday?: string;
  phoneNumber: string;
  jobTitle: string;
  email: string;
  website?: string;
  github?: string;
}

export interface LanguagesSkill {
  name: string;
  level: string;
}

export const schema = `
export interface Cv {
  basic: CvBasic;
  experiences: CvExperience[];
  skills: string[];
  educations: CvEducation[];
  // languages?: LanguagesSkill[];
  projects: CvProject[];
}

export interface CvProject {
  name: string;
  content: string;
  link?: string;
}

export interface CvEducation {
  school: string;
  from: string;
  to: string;
  major: string;
  content: string;
}

export interface CvExperience {
  company: string;
  jobTitle: string;
  from: string;
  to: string;
  content: string;
}

export interface CvBasic {
  name: string;
  birthday?: string;
  phoneNumber: string;
  jobTitle: string;
  email: string;
  website?: string;
  github?: string;
}

export interface LanguagesSkill {
  name: string;
  level: string;
}
`;
