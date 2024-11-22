import { Cv } from "@/core/CV";
import * as typechat from "typechat";
import { createTypeScriptJsonValidator } from "typechat/ts";

export async function getCvByInput(input: string): Promise<Cv | string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const endPoint = import.meta.env.VITE_OPENAI_ENDPOINT;

  const apiModel = import.meta.env.VITE_OPENAI_MODEL;

  if (!apiKey) {
    return "can't found openai api key";
  }

  const model = typechat.createOpenAILanguageModel(
    apiKey,
    apiModel ?? "gpt-3.5-turbo",
    endPoint
  );
  const validator = createTypeScriptJsonValidator<Cv>(schema, "Cv");
  const translator = typechat.createJsonTranslator(model, validator);

  const response = await translator.translate(input);

  if (!response.success) {
    return response.message;
  }

  return response.data;
}

const schema = `
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
