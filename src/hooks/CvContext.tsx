import { createContext, useReducer, ReactNode, useContext } from "react";
import { Cv, CvEducation, CvExperience, CvProject } from "@/core/CV";
import { defaultResume } from "@/lib/data/defaultResume";
import ReduceAction from "@/core/ReduceAction";

export const CvContext = createContext<Cv | null>(null);
export const CvDispatchContext = createContext<React.Dispatch<ReduceAction>>(
  {} as React.Dispatch<ReduceAction>
);

interface CvProviderProps {
  children: ReactNode;
}

export function CvProvider({ children }: CvProviderProps) {
  const [data, dispatch] = useReducer(cvReducer, defaultResume);

  return (
    <CvContext.Provider value={data}>
      <CvDispatchContext.Provider value={dispatch}>
        {children}
      </CvDispatchContext.Provider>
    </CvContext.Provider>
  );
}

export function UseCv(): Cv | null {
  return useContext(CvContext);
}

export function UseCvDispatch() {
  return useContext(CvDispatchContext);
}

function cvReducer(state: Cv, action: ReduceAction): Cv {
  switch (action.type) {
    case "setNewCv": {
      return { ...(action.data as Cv) };
    }
    case "setName": {
      return { ...state, basic: { ...state.basic, name: action.data } };
    }
    case "setEmail": {
      return { ...state, basic: { ...state.basic, email: action.data } };
    }
    case "setJobTitle": {
      return { ...state, basic: { ...state.basic, jobTitle: action.data } };
    }
    case "setPhoneNumber": {
      return { ...state, basic: { ...state.basic, phoneNumber: action.data } };
    }
    case "setWebsite": {
      return { ...state, basic: { ...state.basic, website: action.data } };
    }
    case "setGithub": {
      return { ...state, basic: { ...state.basic, github: action.data } };
    }
    case "setBirth": {
      return { ...state, basic: { ...state.basic, birthday: action.data } };
    }
    case "addEducation": {
      return {
        ...state,
        educations: [
          ...(state?.educations ?? []),
          action.data ?? ({} as CvEducation),
        ],
      };
    }
    case "updateEducationItem": {
      if (!state.educations) {
        return { ...state };
      }
      const educations = state.educations;
      educations[action.data.index] = action.data.value;

      return {
        ...state,
        educations: [...educations],
      };
    }
    case "removeEducationItem": {
      if (!state.educations) {
        return { ...state };
      }
      state.educations = state.educations.filter((e) => e != action.data);
      return {
        ...state,
        educations: [...state.educations],
      };
    }
    case "addExperience": {
      return {
        ...state,
        experiences: [
          ...(state?.experiences ?? []),
          action.data ?? ({} as CvExperience),
        ],
      };
    }
    case "updateExperienceItem": {
      if (!state.experiences) {
        return { ...state };
      }
      const experiences = state.experiences;
      experiences[action.data.index] = action.data.value;

      return {
        ...state,
        experiences: [...experiences],
      };
    }
    case "removeExperienceItem": {
      if (!state.experiences) {
        return { ...state };
      }
      state.experiences = state.experiences.filter((e) => e != action.data);
      return {
        ...state,
        experiences: [...state.experiences],
      };
    }
    case "addProject": {
      return {
        ...state,
        projects: [
          ...(state?.projects ?? []),
          action.data ?? ({} as CvProject),
        ],
      };
    }
    case "updateProject": {
      if (!state.projects) {
        return { ...state };
      }
      const projects = state.projects;
      projects[action.data.index] = action.data.value;

      return {
        ...state,
        projects: [...projects],
      };
    }
    case "removeProject": {
      if (!state.projects) {
        return { ...state };
      }
      state.projects = state.projects.filter((e) => e != action.data);
      return {
        ...state,
        projects: [...state.projects],
      };
    }
    case "addSkill": {
      return {
        ...state,
        skills: [...(state?.skills ?? []), action.data ?? ""],
      };
    }
    case "updateSkill": {
      if (!state.skills) {
        return { ...state };
      }
      const skills = state.skills;
      skills[action.data.index] = action.data.value;

      return {
        ...state,
        skills: [...skills],
      };
    }
    case "removeSkill": {
      if (!state.skills) {
        return { ...state };
      }
      state.skills = state.skills.filter((e) => e != action.data);
      return {
        ...state,
        skills: [...state.skills],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
