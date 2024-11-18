import { createContext, useReducer, ReactNode } from "react";
import { Cv } from "@/core/CV";

export const CvContext = createContext<Cv | null>(null);
export const CvDispatchContext = createContext<React.Dispatch<CvReduceAction>>(
  {} as React.Dispatch<CvReduceAction>
);

interface CvProviderProps {
  children: ReactNode;
}

export function CvProvider({ children }: CvProviderProps) {
  const [data, dispatch] = useReducer(cvReducer, {} as Cv);

  return (
    <CvContext.Provider value={data}>
      <CvDispatchContext.Provider value={dispatch}>
        {children}
      </CvDispatchContext.Provider>
    </CvContext.Provider>
  );
}

interface CvReduceAction {
  type: string;
  data: any;
}

function cvReducer(state: Cv, action: CvReduceAction): Cv {
  switch (action.type) {
    case "setName": {
      return { ...state, name: action.data };
    }
    case "setEmail": {
      return { ...state, email: action.data };
    }
    case "setJobTitle": {
      return { ...state, jobTitle: action.data };
    }
    case "setPhoneNumber": {
      return { ...state, phoneNumber: action.data };
    }
    case "setWebsite": {
      return { ...state, website: action.data };
    }
    case "setGithub": {
      return { ...state, github: action.data };
    }
    case "setBirth": {
      return { ...state, birthday: action.data };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
