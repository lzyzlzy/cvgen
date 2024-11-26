import { Cv, schema } from "@/core/CV";
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

