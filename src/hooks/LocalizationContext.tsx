import { Localization } from "@/core/Localization";
import ReduceAction from "@/core/ReduceAction";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { cnLocalization, enLocalization, frLocalization, jpLocalization, esLocalization, ruLocalization } from "../lib/data/enLocalization";

const defaultLocalization = enLocalization;

export const LocalizationContext = createContext<Localization>(defaultLocalization);
export const LocalizationDispatchContext = createContext<React.Dispatch<ReduceAction>>({} as React.Dispatch<ReduceAction>);

interface LocalizationProviderProps {
  children: ReactNode;
}

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const [data, dispatch] = useReducer(localizationReducer, defaultLocalization);
  return (
    <LocalizationContext.Provider value={data}>
      <LocalizationDispatchContext.Provider value={dispatch}>
        {children}
      </LocalizationDispatchContext.Provider>
    </LocalizationContext.Provider>
  );
}

export function UseLocalization(): Localization {
  return useContext(LocalizationContext);
}

export function UseLocalizationDispatch() {
  return useContext(LocalizationDispatchContext);
}

export const SupportedLangs = [
  ["en", "en"],
  ["zh-cn", "中"],
  ["fr", "fr"],
  ["jp", "日"],
  ["es", "es"],
  ["ru", "ru"],
];

const localizationStore = new Map([
  ["en", enLocalization],
  ["zh-cn", cnLocalization],
  ["jp", jpLocalization],
  ["fr", frLocalization],
  ["es", esLocalization],
  ["ru", ruLocalization],
]);

function localizationReducer(state: Localization, action: ReduceAction): Localization {
  switch (action.type) {
    case "changeLang": {
      const key = action.data as string;
      const newLocalization = localizationStore.get(key);
      return { ...(newLocalization ?? state) };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
